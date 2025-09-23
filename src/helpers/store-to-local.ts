import { message } from 'antd';
import type { ResumeConfig } from '@/components/types';
import { customAssign } from '@/helpers/customAssign';
import _ from 'lodash-es';
import { RESUME_INFO } from '@/data/resume';
import { fetchResume } from './fetch-resume';
import { intl } from '@/i18n';

// IndexedDB 配置与工具函数
const DB_NAME = 'resume-db';
const STORE_NAME = 'drafts';
const DB_VERSION = 1;

const hasIDB = () => typeof indexedDB !== 'undefined';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (e) {
      reject(e);
    }
  });
}

async function idbGetDraft(key: string): Promise<any | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbPutDraft(key: string, data: ResumeConfig): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ key, data, updatedAt: Date.now() });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// 绑定本地备份文件相关（使用 File System Access API 的句柄存入 IndexedDB）
const FS_HANDLE_KEY = 'fs-backup-handle';

async function idbPutHandle(key: string, handle: any): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put({ key, handle, updatedAt: Date.now() });
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

async function idbGetHandle(key: string): Promise<any | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbDelete(key: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function bindBackupFileHandle(handle: any): Promise<void> {
  if (!hasIDB()) return;
  await idbPutHandle(FS_HANDLE_KEY, handle);
}

export async function clearBackupFileHandle(): Promise<void> {
  if (!hasIDB()) return;
  await idbDelete(FS_HANDLE_KEY);
}

export async function getBackupFileHandle(): Promise<any | undefined> {
  if (!hasIDB()) return;
  const rec = await idbGetHandle(FS_HANDLE_KEY);
  return rec?.handle;
}

async function writeBackupFile(config: ResumeConfig): Promise<void> {
  try {
    const handle = await getBackupFileHandle();
    if (!handle) return;
    const writable = await handle.createWritable();
    await writable.write(
      new Blob([JSON.stringify(config)], { type: 'application/json' })
    );
    await writable.close();
  } catch (e) {
    // 忽略写入失败，保留 LocalStorage/IndexedDB 兜底
  }
}

export const LOCAL_KEY = user => `${user ?? ''}resume-config`;

export async function getConfig(
  lang: string,
  branch: string,
  user: string
): Promise<ResumeConfig> {
  // 1) 先从 IndexedDB 读取
  if (hasIDB()) {
    try {
      const rec = await idbGetDraft(LOCAL_KEY(user));
      if (rec && rec.data) {
        return rec.data as ResumeConfig;
      }
    } catch (e) {
      // 忽略 IDB 读取错误，继续走后续逻辑
    }
  }

  // 2) 再从 LocalStorage 读取
  if (typeof localStorage !== 'undefined') {
    const config = localStorage.getItem(LOCAL_KEY(user));
    let result;
    try {
      result = JSON.parse(config || undefined);
    } catch (e) {}
    if (result) {
      return Promise.resolve(result);
    }
  }

  // 3) 最后从远程/模板读取
  return fetchResume(lang, branch, user).catch(() => {
    message.warn(intl.formatMessage({ id: '从模板中获取' }), 1);
    return _.omit(
      customAssign({}, RESUME_INFO, _.get(RESUME_INFO, ['locales', lang])),
      ['locales']
    );
  });
}

export const saveToLocalStorage = _.throttle(
  (user: string, config: ResumeConfig) => {
    // LocalStorage 兜底
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_KEY(user), JSON.stringify(config));
    }
    // 同步镜像到 IndexedDB（不阻塞 UI）
    if (hasIDB()) {
      idbPutDraft(LOCAL_KEY(user), config).catch(() => {
        // 忽略写入失败，LocalStorage 仍是兜底
      });
    }
    // 同步写入到已授权的本地文件（半自动备份）
    // 不阻塞 UI，失败则忽略
    writeBackupFile(config).catch(() => {});
    message.success(intl.formatMessage({ id: '已缓存在本地' }), 0.65);
  },
  5000
);

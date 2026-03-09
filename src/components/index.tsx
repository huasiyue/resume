import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Button, Affix, Upload, Spin, message, Modal } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import _ from 'lodash-es';
import qs from 'query-string';
import jsonUrl from 'json-url';
import { FormattedMessage, useIntl } from 'react-intl';
import { getLanguage } from '@/i18n';
import { useModeSwitcher } from '@/hooks/useModeSwitcher';
import { getDefaultTitleNameMap } from '@/data/constant';
import { getSearchObj } from '@/helpers/location';
import { customAssign } from '@/helpers/customAssign';
import { copyToClipboard } from '@/helpers/copy-to-board';
import { getDevice } from '@/helpers/detect-device';
import { exportDataToLocal } from '@/helpers/export-to-local';
import { getConfig, saveToLocalStorage } from '@/helpers/store-to-local';
import { Drawer } from './Drawer';
import { Resume } from './Resume';
import type { ResumeConfig, ThemeConfig } from './types';

import './index.less';

const codec = jsonUrl('lzma');
const DEFAULT_THEME: ThemeConfig = {
  color: '#2f5785',
  tagColor: '#8bc34a',
};

export const Page: React.FC = () => {
  const lang = getLanguage();
  const intl = useIntl();
  const user = getSearchObj().user || 'visiky';

  const [, mode, changeMode] = useModeSwitcher({});

  const originalConfig = useRef<ResumeConfig>();
  const query = getSearchObj();
  const [config, setConfig] = useState<ResumeConfig>();
  const [loading, updateLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const initialThemeRef = useRef<ThemeConfig>(DEFAULT_THEME);

  // 备份文件相关状态
  const [backupFileHandle, setBackupFileHandle] = useState<any>(null);
  const [isBackupEnabled, setIsBackupEnabled] = useState<boolean>(false);

  useEffect(() => {
    const {
      pathname,
      hash: currentHash,
      search: currentSearch,
    } = window.location;
    const hash = currentHash === '#/' ? '' : currentHash;
    const searchObj = qs.parse(currentSearch);
    if (!searchObj.template) {
      const search = qs.stringify({
        template: config?.template || 'template1',
        ...qs.parse(currentSearch),
      });
      window.location.href = `${pathname}?${search}${hash}`;
    }
  }, [config]);

  // 检查是否有备份文件绑定
  useEffect(() => {
    const hasBackup = localStorage.getItem('hasBackupFile') === 'true';
    setIsBackupEnabled(hasBackup);
  }, []);

  const updateTemplate = (value: string) => {
    const {
      pathname,
      hash: currentHash,
      search: currentSearch,
    } = window.location;
    const hash = currentHash === '#/' ? '' : currentHash;
    const search = qs.stringify({
      ...qs.parse(currentSearch),
      template: value,
    });

    window.location.href = `${pathname}?${search}${hash}`;
  };

  const changeConfig = (v: Partial<ResumeConfig>) => {
    setConfig(
      _.assign({}, { titleNameMap: getDefaultTitleNameMap({ intl }) }, v)
    );
  };

  useEffect(() => {
    const user = (query.user || '') as string;
    const branch = (query.branch || 'master') as string;
    const mode = query.mode;

    function store(data: any) {
      originalConfig.current = data;
      changeConfig(
        _.omit(customAssign({}, data, _.get(data, ['locales', lang])), [
          'locales',
        ])
      );
      updateLoading(false);
    }

    if (query.data) {
      codec.decompress(query.data).then(data => {
        store(JSON.parse(data));
      });
    } else {
      getConfig(lang, branch, user).then(data => {
        store(data);
      });
    }
  }, [lang, query.user, query.branch, query.data]);

  // 自动备份到文件
  const autoBackupToFile = async () => {
    if (!backupFileHandle) return;

    try {
      const writable = await backupFileHandle.createWritable();
      await writable.write(getConfigJson());
      await writable.close();
      console.log('自动备份成功');
    } catch (error) {
      console.error('自动备份失败:', error);
      message.error('自动备份失败，请检查文件权限');
    }
  };

  // 绑定备份文件句柄
  const bindBackupFileHandle = async (handle: any) => {
    setBackupFileHandle(handle);
    setIsBackupEnabled(true);
    localStorage.setItem('hasBackupFile', 'true');

    // 立即进行一次备份
    try {
      const writable = await handle.createWritable();
      await writable.write(getConfigJson());
      await writable.close();
    } catch (error) {
      console.error('初始备份失败:', error);
    }
  };

  // 清除备份文件句柄
  const clearBackupFileHandle = async () => {
    setBackupFileHandle(null);
    setIsBackupEnabled(false);
    localStorage.removeItem('hasBackupFile');
  };

  const onConfigChange = useCallback(
    (v: Partial<ResumeConfig>) => {
      const newC = _.assign({}, config, v);
      changeConfig(newC);
      saveToLocalStorage(query.user as string, newC);

      // 如果启用了自动备份，则进行备份
      if (backupFileHandle && isBackupEnabled) {
        autoBackupToFile();
      }
    },
    [config, lang, backupFileHandle, isBackupEnabled]
  );

  const onThemeChange = useCallback(
    (v: Partial<ThemeConfig>) => {
      const newTheme = _.assign({}, theme, v);
      setTheme(newTheme);

      // 主题变更时也进行备份
      if (backupFileHandle && isBackupEnabled) {
        setTimeout(() => {
          autoBackupToFile();
        }, 100); // 延迟一点确保状态更新
      }
    },
    [theme, backupFileHandle, isBackupEnabled]
  );

  useEffect(() => {
    if (getDevice() === 'mobile') {
      message.info(
        intl.formatMessage({ id: '移动端只提供查看功能，在线制作请前往 PC 端' })
      );
    }
  }, []);

  const [box, setBox] = useState({ width: 0, height: 0, left: 0 });

  useEffect(() => {
    const targetNode = document.querySelector('.resume-content');
    if (!targetNode) return;
    let frame = 0;

    const updateBox = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setBox(targetNode.getBoundingClientRect());
      });
    };

    updateBox();

    let resizeObserver: ResizeObserver | undefined;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateBox);
      resizeObserver.observe(targetNode);
    }

    window.addEventListener('resize', updateBox);
    window.addEventListener('scroll', updateBox, true);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateBox);
      window.removeEventListener('scroll', updateBox, true);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const importConfig = (file: RcFile) => {
    if (window.FileReader) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          if (reader.result) {
            const newConfig: any = JSON.parse(reader.result as string);
            onThemeChange(newConfig.theme);
            onConfigChange(_.omit(newConfig, 'theme'));
          }
          message.success(intl.formatMessage({ id: '上传配置已应用' }));
        } catch (err) {
          message.error(intl.formatMessage({ id: '上传文件有误，请重新上传' }));
        }
      };
      reader.readAsText(file);
    } else {
      message.error(
        intl.formatMessage({
          id: '您当前浏览器不支持 FileReader，建议使用谷歌浏览器',
        })
      );
    }
    return false;
  };

  function getConfigJson() {
    let fullConfig = config;
    if (lang !== 'zh-CN') {
      fullConfig = customAssign({}, originalConfig?.current, {
        locales: { [lang]: config },
      });
    }
    return JSON.stringify({ ...fullConfig, theme }, null, 2);
  }

  const copyConfig = () => {
    copyToClipboard(getConfigJson());
  };

  const exportConfig = () => {
    exportDataToLocal(getConfigJson(), 'resume-backup.json');
  };

  const handleSharing = () => {
    const fullConfig = getConfigJson();
    codec.compress(fullConfig).then(data => {
      const url = new URL(window.location.href);
      url.searchParams.set('data', data);

      copyToClipboard(url.toString());
      message.success(intl.formatMessage({ id: '已复制分享链接' }));
    });
  };

  const resetConfig = () => {
    if (!originalConfig.current) return;
    Modal.confirm({
      title: intl.formatMessage({ id: '确认恢复到初始配置？' }),
      okText: intl.formatMessage({ id: '确定' }),
      onOk: () => {
        const base = originalConfig.current as ResumeConfig;
        changeConfig(
          _.omit(customAssign({}, base, _.get(base, ['locales', lang])), [
            'locales',
          ])
        );
        setTheme(initialThemeRef.current);
        message.success(intl.formatMessage({ id: '已恢复到初始配置' }));
      },
    });
  };

  // 加载本地备份文件
  const loadBackupFile = async () => {
    // @ts-ignore
    if (!window.showOpenFilePicker) {
      message.error('当前浏览器不支持文件选择，建议使用 Chrome/Edge');
      return;
    }

    try {
      // @ts-ignore
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'JSON files',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });

      const file = await fileHandle.getFile();
      const content = await file.text();

      try {
        const newConfig: any = JSON.parse(content);
        onThemeChange(newConfig.theme);
        onConfigChange(_.omit(newConfig, 'theme'));
        message.success('备份文件加载成功');
      } catch (err) {
        message.error('备份文件格式有误，请重新选择');
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') return; // 用户取消
      message.error('加载备份文件失败');
    }
  };

  // 启用自动备份功能
  const enableAutoBackup = async () => {
    // @ts-ignore
    if (!window.showSaveFilePicker) {
      message.error('当前浏览器不支持自动备份，建议使用 Chrome/Edge');
      return;
    }

    try {
      // @ts-ignore
      const handle = await window.showSaveFilePicker({
        suggestedName: 'resume-backup.json',
        types: [
          {
            description: 'JSON',
            accept: { 'application/json': ['.json'] },
          },
        ],
      });
      await bindBackupFileHandle(handle);
      message.success('自动备份已启用，配置将实时保存到本地文件');
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      message.error('启用自动备份失败');
    }
  };

  const disableAutoBackup = async () => {
    try {
      await clearBackupFileHandle();
      message.success('自动备份已关闭');
    } catch {
      message.error('关闭自动备份失败');
    }
  };

  return (
    <React.Fragment>
      <Spin spinning={loading}>
        <div className="page">
          {config && (
            <Resume
              value={config}
              theme={theme}
              template={query.template || 'template1'}
            />
          )}
          {mode === 'edit' && (
            <React.Fragment>
              <Affix offsetTop={0}>
                <Button.Group className="btn-group">
                  <Drawer
                    value={config}
                    onValueChange={onConfigChange}
                    theme={theme}
                    onThemeChange={onThemeChange}
                    // @ts-ignore
                    template={query.template || 'template1'}
                    onTemplateChange={updateTemplate}
                  />
                  <Button
                    type="primary"
                    onClick={copyConfig}
                    style={{
                      backgroundColor: '#52c41a',
                      borderColor: '#52c41a',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    <FormattedMessage id="复制配置" />
                  </Button>
                  <Button
                    type="primary"
                    onClick={exportConfig}
                    style={{
                      backgroundColor: '#1890ff',
                      borderColor: '#1890ff',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    <FormattedMessage id="保存简历" />
                  </Button>
                  <Button
                    onClick={handleSharing}
                    style={{
                      backgroundColor: '#36cfc9',
                      borderColor: '#36cfc9',
                      color: 'white',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    <FormattedMessage id="分享链接" />
                  </Button>
                  <Upload
                    accept=".json"
                    showUploadList={false}
                    beforeUpload={importConfig}
                  >
                    <Button
                      className="btn-upload"
                      style={{
                        backgroundColor: '#722ed1',
                        borderColor: '#722ed1',
                        color: 'white',
                        fontSize: '13px',
                        padding: '4px 12px'
                      }}
                    >
                      <FormattedMessage id="导入配置" />
                    </Button>
                  </Upload>
                  <Button
                    onClick={loadBackupFile}
                    style={{
                      backgroundColor: '#13c2c2',
                      borderColor: '#13c2c2',
                      color: 'white',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    加载备份文件
                  </Button>
                  <Button
                    onClick={resetConfig}
                    style={{
                      backgroundColor: '#595959',
                      borderColor: '#595959',
                      color: 'white',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    <FormattedMessage id="恢复初始配置" />
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => window.print()}
                    style={{
                      backgroundColor: '#fa541c',
                      borderColor: '#fa541c',
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    <FormattedMessage id="打印简历" />
                  </Button>
                  <Button
                    onClick={enableAutoBackup}
                    type={isBackupEnabled ? "default" : "primary"}
                    disabled={isBackupEnabled}
                    style={{
                      fontSize: '13px',
                      padding: '4px 12px'
                    }}
                  >
                    {isBackupEnabled ? '自动备份已启用' : '启用自动备份'}
                  </Button>
                  {isBackupEnabled && (
                    <Button
                      onClick={disableAutoBackup}
                      danger
                      style={{
                        fontSize: '13px',
                        padding: '4px 12px'
                      }}
                    >
                      关闭自动备份
                    </Button>
                  )}
                </Button.Group>
              </Affix>
              <div
                className="box-size-info"
                style={{
                  top: `${box.height + 4}px`,
                  left: `${box.width + box.left}px`,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ marginRight: '8px' }}>
                  ({box.width}, {box.height})
                </span>
                {isBackupEnabled && (
                  <span style={{
                    fontSize: '11px',
                    color: '#52c41a',
                    backgroundColor: '#f6ffed',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid #b7eb8f'
                  }}>
                    ✓ 自动备份已启用
                  </span>
                )}
              </div>
            </React.Fragment>
          )}
        </div>
      </Spin>
    </React.Fragment>
  );
};

export default Page;

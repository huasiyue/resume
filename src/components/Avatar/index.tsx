import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import './index.less';

export const Avatar = ({
                         avatarSrc,
                         className,
                         shape = 'circle',
                         size = 'default',
                       }) => {
  // 使用base64编码的默认头像以确保打印时可见
  const defaultAvatarSrc = '/kjh.png'; // 放在public目录下

  // 图片加载失败处理，必须返回boolean值
  const onError = () => {
    // 返回true表示阻止默认的fallback行为
    // 返回false会使用Avatar的默认回退图标
    return false;
  };

  return (
    <div className={`avatar ${!avatarSrc ? 'avatar-hidden' : ''}`}>
      <AntdAvatar
        className={className}
        src={avatarSrc || defaultAvatarSrc}
        onError={onError}
        shape={shape as any}
        size={size as any}
      />
    </div>
  );
};

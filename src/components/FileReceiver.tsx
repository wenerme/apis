import React, { useEffect, useState } from 'react';
import { usePasteFileEffect } from '../hooks/usePasteFileEffect';
import { message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons/lib';

export const FileReceiver: React.FC<{
  onFileChange?: (file: File) => void;
  accept?: string;
  extensions?: string[];
}> = ({ onFileChange, accept, extensions = [] }) => {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (!file) {
      return;
    }
    onFileChange?.(file);
  }, [file]);
  usePasteFileEffect({
    onFile({ file, filename }) {
      setFile(file);
    },
  });

  return (
    <Upload.Dragger
      showUploadList={false}
      supportServerRender={true}
      accept={accept}
      beforeUpload={(file) => {
        if (extensions.length) {
          if (file?.name && !extensions.find((v) => file.name.endsWith(`.${v}`))) {
            message.error(`只支持 ${extensions.join(', ')} 文件`);
            return false;
          }
        }
        return true;
      }}
      customRequest={async (opts) => {
        if (opts.file instanceof File) {
          setFile(opts.file);
        } else {
          console.error(`invalid file`, opts.file);
          message.error('无效的文件');
        }
      }}
    >
      <div>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          点击<b>选择</b>文件、<b>拖拽</b>文件到该区域、<b>粘贴</b>文件
        </p>
        <p className="ant-upload-hint">支持{extensions.join(',')}文件</p>
      </div>
    </Upload.Dragger>
  );
};

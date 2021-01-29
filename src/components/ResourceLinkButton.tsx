import React, { useMemo, useState } from 'react';
import { copy } from '@wener/utils';
import { Button, Dropdown, Menu, message } from 'antd';

export const ResourceLinkButton: React.FC<{
  formats?: string[];
  nameProvider?: (o: { format: string }) => string;
  linkProvider: (o: { format: string }) => string;
}> = (props) => {
  const { formats = [], nameProvider, linkProvider } = props;

  const [format, setFormat] = useState(formats[0]);
  const doCopy = () => {
    copy(linkProvider({ format }));
    message.success('复制成功');
  };
  const doDownload = () => {
    const link = linkProvider({ format });
    const a = document.createElement('a');
    a.download = nameProvider?.({ format }) ?? link.split(/[\\/]/).pop();
    a.href = link;
    a.click();
  };

  const menu = useMemo(
    () =>
      formats.length > 1 && (
        <Menu>
          {formats.map((v) => (
            <Menu.Item key={v} onClick={() => setFormat(v)}>
              {v.toUpperCase()}
            </Menu.Item>
          ))}
        </Menu>
      ),
    formats,
  );
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        {menu && (
          <Dropdown.Button type="primary" onClick={doDownload} overlay={menu}>
            下载 {format.toUpperCase()} 图片
          </Dropdown.Button>
        )}
        {!menu && (
          <Button type="primary" onClick={doDownload}>
            下载 {format.toUpperCase()} 图片
          </Button>
        )}
      </div>
      <Button onClick={doCopy}>复制链接</Button>
    </div>
  );
};

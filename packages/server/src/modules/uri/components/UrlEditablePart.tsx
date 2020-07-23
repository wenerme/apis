import { Descriptions } from 'antd';
import ContentEditable from 'react-contenteditable';
import produce from 'immer';
import sanitizeHtml from 'sanitize-html';
import React from 'react';

export interface ParsedUrl {
  href: string;
  origin?: string;
  protocol: string;
  username?: string;
  password?: string;
  host?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  searchParams?: URLSearchParams;
  hash?: string;
}

const fields = [
  { label: '来源', field: 'origin', editable: false },
  {
    label: '协议',
    field: 'protocol',
    from: (v) => v?.replace(/:*$/, ''),
    to: (v) => (v || 'http:').replace(/:*$/, '') + ':',
  },
  { label: '账号', field: 'username' },
  { label: '密码', field: 'password' },
  { label: '主机', field: 'hostname' },
  { label: '端口', field: 'port' },
  { label: '路径', field: 'pathname' },
  { label: '搜索', field: 'search' },
  { label: '哈希', field: 'hash' },
];

export const UrEditablePart: React.FC<{ value: ParsedUrl; onChanged }> = ({ value: parsed, onChanged: setParsed }) => {
  return (
    <>
      <Descriptions>
        {fields.map(({ label, field, from, to, editable = true }) => (
          <Descriptions.Item label={label} key={label}>
            <div>
              <ContentEditable
                className="editable"
                disabled={!editable}
                html={(from?.(parsed?.[field]) ?? parsed?.[field]) || ''}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.currentTarget.blur();
                  }
                }}
                onChange={(v) => {
                  let t = sanitizeHtml(v.target.value, { allowedTags: [] });
                  setParsed(
                    produce((s) => {
                      t = to?.(t) ?? t;
                      t = t.replace(/[\r\n]/g, '');
                      // console.log(`Change`, v.target.value, t);
                      s[field] = t;
                    }),
                  );
                }}
              />
            </div>
          </Descriptions.Item>
        ))}
      </Descriptions>
      <style jsx global>{`
        .editable:not([disabled]) {
          border-bottom: 1px cornflowerblue solid;
          padding: 4px 8px;
        }
        .editable:not([disabled]):focus {
          border-bottom: 2px cornflowerblue solid;
          outline: none;
          padding-bottom: 3px;
        }
      `}</style>
    </>
  );
};

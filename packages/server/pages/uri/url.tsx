import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Descriptions, Input, PageHeader } from 'antd';
import url from 'url';
import ContentEditable from 'react-contenteditable';
import produce from 'immer';
import sanitizeHtml from 'sanitize-html';
import { useRouter } from 'next/router';
import { firstOf } from '@wener/utils/src/arrays/firstOf';
import pick from 'lodash/pick';
import { LinkOutlined } from '@ant-design/icons';

const UriPageContent: React.FC = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(
    firstOf(router.query['url']) ?? 'https://admin:pass@wener.me:8443/notes/java/java/?name=wener#hero'
  );
  const [value, setValue] = useState(current);
  const [parsed, setParsed] = useState<URL>(null);

  useEffect(() => {
    let o: URL;
    try {
      o = new URL(current);
      o = pick(o, [
        'href',
        'origin',
        'protocol',
        'username',
        'password',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
        'searchParams',
        'hash',
      ]) as URL;
    } catch (e) {
      console.warn(`invalid url ${current}`);
      o = url.parse(current, true) as any;
    }
    console.log(`do parse ${current}`, o);

    setParsed(o);
    // sync url param
    if (firstOf(router.query['url']) !== current) {
      router.push({ pathname: location.pathname, query: { url: current } });
    }
  }, [current]);

  useEffect(() => {
    if (!parsed) {
      return;
    }
    let v;
    if (parsed.origin) {
      const { origin, searchParams, ...o } = parsed;
      const u = Object.assign(new URL(current), o);
      v = u.toString();
    } else {
      console.info(`format parsed`, parsed);
      v = url.format(parsed);
    }
    setValue(v);
  }, [parsed]);
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

  const onBlur = () => null;
  return (
    <div>
      <Input.Search value={value} onChange={(v) => setValue(v.target.value)} enterButton="解析" onSearch={setCurrent} />

      <div style={{ marginTop: 16 }}>
        <h2>URI 信息</h2>
        <Descriptions>
          {fields.map(({ label, field, from, to, editable = true }) => (
            <Descriptions.Item label={label} key={label}>
              <div>
                <ContentEditable
                  className="editable"
                  disabled={!editable}
                  html={(from?.(parsed?.[field]) ?? parsed?.[field]) || ''}
                  onBlur={onBlur}
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
                      })
                    );
                  }}
                />
              </div>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
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
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>URI 解析格式化</title>
        </Head>
        <PageHeader
          title={
            <div>
              <LinkOutlined style={{ marginRight: 8 }} />
              URI 解析格式化
            </div>
          }
          backIcon={false}
        />

        <UriPageContent />
      </PageContent>
    </PageLayout>
  );
};

export default Page;

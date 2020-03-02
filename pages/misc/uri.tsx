import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import React, {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {Descriptions, Icon, Input, PageHeader} from 'antd';
import url from 'url'
import ContentEditable from 'react-contenteditable';
import produce from 'immer';
import sanitizeHtml from 'sanitize-html';

const UriPageContent: React.FC = () => {
  const [uri, setUri] = useState('https://admin:pass@wener.me:8443/notes/java/java/?name=wener#hero');
  const [value, setValue] = useState(uri);
  const [parsed, setParsed] = useState<URL>(null);
  const rawUriRef = useRef<URL>();

  useEffect(() => {
    let o: URL;
    try {
      o = new URL(uri);
      // o = _.pick(new URL(uri), ['href', 'origin', 'protocol', 'username', 'password', 'host', 'hostname', 'port', 'pathname', 'search', 'searchParams', 'hash']) as URL;
    } catch (e) {
      console.warn(`invalid url ${uri}`);
      o = url.parse(uri, true) as any
    }
    setParsed(o);
    rawUriRef.current = o
  }, [uri]);

  const fields = [
    {label: '来源', field: 'origin', editable: false},
    {
      label: '协议',
      field: 'protocol',
      from: v => v?.replace(/:*$/, ''),
      to: v => (v || 'http:').replace(/:*$/, '') + ':'
    },
    {label: '账号', field: 'username'},
    {label: '密码', field: 'password'},
    {label: '主机', field: 'host'},
    {label: '端口', field: 'port'},
    {label: '路径', field: 'pathname'},
    {label: '搜索', field: 'search'},
    {label: '哈希', field: 'hash'},
  ];

  const onBlur = () => {
    if (parsed instanceof URL) {
      setValue(parsed.toString())
    } else {
      console.info(`format parsed`, parsed);
      setValue(url.format(parsed))
    }
  };
  return (
    <div>
      <Input.Search
        value={value}
        onChange={v => setValue(v.target.value)}
        enterButton="解析"
        onSearch={setUri}
      />

      <div style={{marginTop: 16}}>
        <h2>URI 信息</h2>
        <Descriptions>
          {fields.map(({label, field, from, to, editable = true}) => (
            <Descriptions.Item label={label} key={label}>

              <div>
                <ContentEditable
                  className="editable"
                  disabled={!editable}
                  html={(from?.(parsed?.[field]) ?? parsed?.[field]) || ''}
                  onBlur={onBlur}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      e.stopPropagation();
                      e.currentTarget.blur()
                    }
                  }}
                  onChange={v => {
                    setParsed(produce(s => {
                      let t = sanitizeHtml(v.target.value, {allowedTags: []});
                      t = to?.(t) ?? t;
                      t = t.replace(/[\r\n]/g, '');
                      // console.log(`Change`, v.target.value, t);
                      s[field] = t;
                    }))
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
  )
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
              <Icon type="link" style={{marginRight: 8}} />
              URI 解析格式化
            </div>
          }
          backIcon={false}
        />

        <UriPageContent />

      </PageContent>
    </PageLayout>
  )
};

export default Page

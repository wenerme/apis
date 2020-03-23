import React, { useState } from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { PageHeader, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import dynamic from 'next/dynamic';
import components from 'prismjs/components';
import { usePrismTheme } from 'hooks/prism';

const SimpleCodeEditor = dynamic(
  () => import('components/editor/SimpleCodeEditor').then(({ SimpleCodeEditor }) => SimpleCodeEditor),
  {
    loading: () => <div>Loading...</div>,
  }
);
const DemoPageContent: React.FC = () => {
  const [lang, setLang] = useState('tsx');
  const [theme, setTheme] = useState('prism');
  const [code, setCode] = useState(`// Demo code
const DemoSimpleCodeEditor: React.FC = () => {
  const [code,setCode] = useState('');
  return (
    <Editor
      value={this.state.code}
      onValueChange={code => this.setState({ code })}
      highlight={code => highlight(code, languages.tsx)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
};
`);

  usePrismTheme(theme);

  return (
    <div>
      <div>
        <Select style={{ width: 200 }} showSearch value={theme} onChange={(v) => setTheme(v)}>
          {Object.entries(components.themes)
            .filter(([id]) => id !== 'meta')
            .map(([id, v]: [string, any]) => (
              <Select.Option key={id} value={id}>
                {typeof v === 'string' ? v : v.title}
              </Select.Option>
            ))}
        </Select>

        <Select style={{ width: 200 }} showSearch value={lang} onChange={(v) => setLang(v)}>
          {Object.entries(components.languages)
            .filter(([id]) => id !== 'meta')
            .map(([id, v]: [string, any]) => (
              <Select.Option key={id} value={id}>
                {v.title}
              </Select.Option>
            ))}
        </Select>
      </div>
      <SimpleCodeEditor value={code} onChange={setCode} language={lang}></SimpleCodeEditor>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>React Simple Code Editor</title>
          <meta name="description" content="演示页面" />
          <meta name="keywords" content="demo, react nextjs, zeit now" />
        </Head>
        <PageHeader
          title={
            <div>
              <EditOutlined style={{ marginRight: 8 }} />
              React Simple Code Editor
            </div>
          }
          backIcon={false}
        />

        <DemoPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;

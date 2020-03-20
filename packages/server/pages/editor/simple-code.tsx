import React, {useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {PageHeader} from 'antd';
import {EditOutlined} from '@ant-design/icons/lib';
import dynamic from 'next/dynamic';
// css in component will get invalid style
import 'prismjs/themes/prism.css'

const SimpleCodeEditor = dynamic(() => import('components/editor/SimpleCodeEditor').then(({SimpleCodeEditor}) => SimpleCodeEditor), {
  loading: () => <div>Loading...</div>
});
const DemoPageContent: React.FC = () => {
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
  return (
    <SimpleCodeEditor
      value={code}
      onChange={setCode}
    >

    </SimpleCodeEditor>
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
              <EditOutlined style={{marginRight: 8}} />
              React Simple Code Editor
            </div>
          }
          backIcon={false}
        />

        <DemoPageContent />

      </PageContent>
    </PageLayout>
  )
};
export default Page

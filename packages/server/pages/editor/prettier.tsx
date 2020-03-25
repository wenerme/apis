import React, { useEffect, useState } from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { Button, message, PageHeader, Select } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { SimpleCodeEditor } from 'components/editor/SimpleCodeEditor';
import { usePrismTheme } from 'hooks/prism';
import components from 'prismjs/components';
import { loadScripts } from 'utils/loaders';
import { PrismHighlight } from 'components/PrismHighlight';

// https://prettier.io/docs/en/options.html#parser
// https://unpkg.com/browse/prettier@2.0.2/
const languages = [
  { lang: 'typescript', parsers: ['typescript', 'babel-ts'] },
  { lang: 'javascript', parsers: ['babel', 'flow', 'glimmer'], useParserName: true },
  { lang: 'flow', parsers: ['flow', 'babel-flow'] },

  { lang: 'graphql', parsers: ['graphql'] },
  { lang: 'yaml', parsers: ['yaml'] },
  { lang: 'markdown', parsers: ['markdown'] },
  { lang: 'mdx', parsers: ['markdown'], highlight: 'markdown' },

  { lang: 'css', parsers: ['postcss'] },
  { lang: 'less', parsers: ['postcss'] },
  { lang: 'scss', parsers: ['postcss'] },

  { lang: 'json', parsers: ['babel'] },
  { lang: 'json5', parsers: ['babel'] },
  { lang: 'json-stringify', parsers: ['babel'], highlight: 'json' },

  { lang: 'lwc', parsers: ['html'], highlight: 'html' },
  { lang: 'vue', parsers: ['html'], highlight: 'html' },
  { lang: 'angular', parsers: ['angular'], highlight: 'html' },
];

const parserMapping = {
  'babel-ts': 'babel',
  'babel-flow': 'babel',
};

const languageByLang = languages.reduce((o, v) => {
  o[v.lang] = v;
  return o;
}, {});

const PrettierPageContent: React.FC = () => {
  const [code, setCode] = useState(`
# Wener's APIs

* 源码地址 [wenerme/apis](https://github.com/wenerme/apis)
* 项目地址 [apis.wener.me](https://apis.wener.me/)

## 开发
* 使用 Node 12 LTS 版本

\`\`\`bash
# 如果使用 nvm
nvm install 12
nvm use 12
\`\`\`
`);

  const [theme, setTheme] = useState('prism-solarizedlight');

  const [language, setLanguage] = useState('markdown');
  const [parser, setParser] = useState('markdown');

  const [loading, setLoading] = useState(false);
  usePrismTheme(theme);

  const [formatted, setFormatted] = useState('');
  const doFormat = async () => {
    console.log(`Format ${language} using ${parser}`);
    try {
      setLoading(true);
      await loadScripts('https://unpkg.com/prettier/standalone.js');
      await loadScripts(`https://unpkg.com/prettier/parser-${parserMapping[parser] ?? parser}.js`);

      const format = window['prettier'].format(code, {
        parser: languageByLang[language].useParserName ? parser : language,
        plugins: window['prettierPlugins'],
      });
      setFormatted(format);
    } catch (e) {
      console.error(`Prettier failed`, e.error, e);
      message.error('Prettier failed: ' + (e.error || e.message || e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    doFormat();
  }, []);

  return (
    <div>
      <div>
        <Button type="primary" loading={loading} onClick={doFormat}>Prettier</Button>

        <label style={{ marginLeft: 8 }}>Language</label>
        <Select style={{ width: 200 }} showSearch value={language} onChange={(v) => {
          setLanguage(v);
          setParser(languageByLang[v].parsers[0]);
        }}>
          {languages
            .map(({ lang }) => (
              <Select.Option key={lang} value={lang}>
                {lang}
              </Select.Option>
            ))}
        </Select>

        {
          languageByLang[language].parsers.length > 1 && (
            <React.Fragment>
              <label style={{ marginLeft: 8 }}>Parser</label>
              <Select style={{ width: 200 }} showSearch value={parser} onChange={v => setParser(v)}>
                {languageByLang[language].parsers
                  .map((lang) => (
                    <Select.Option key={lang} value={lang}>
                      {lang}
                    </Select.Option>
                  ))}
              </Select>
            </React.Fragment>
          )
        }


        <label style={{ marginLeft: 8 }}>Theme</label>
        <Select style={{ width: 200 }} showSearch value={theme} onChange={(v) => setTheme(v)}>
          {Object.entries(components.themes)
            .filter(([id]) => id !== 'meta')
            .map(([id, v]: [string, any]) => (
              <Select.Option key={id} value={id}>
                {typeof v === 'string' ? v : v.title}
              </Select.Option>
            ))}
        </Select>

      </div>
      <div className="container">

        <div>
          <SimpleCodeEditor value={code} onChange={setCode} language={languageByLang[language].highlight ?? language} />
        </div>
        <div>
          <PrismHighlight code={formatted} language={languageByLang[language].highlight ?? language} />
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
          margin: 8px;
        }
        @media (max-width: 767.98px) {
          .container {
            flex-flow: column;
          }
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
          <title>Prettier Code / 代码格式化</title>
          <meta name="description" content="Prettier online format" />
          <meta name="keywords" content="prettier demo, react nextjs, zeit now, code format" />
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Prettier Code / 代码格式化
            </div>
          }
          backIcon={false}
        />

        <PrettierPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;
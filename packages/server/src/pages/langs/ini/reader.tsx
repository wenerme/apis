import React, { useState } from 'react';
import { Button, Card, Col, message, PageHeader, Row } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { SimpleCodeEditor } from 'src/components/editor/SimpleCodeEditor';
import { usePrismTheme } from 'src/hooks/prism';
import { INI } from 'src/modules/langs/ini/INI';

const IniPageContent: React.FC = () => {
  const [theme, setTheme] = useState('prism-solarizedlight');
  usePrismTheme(theme);

  const [ini, setIni] = React.useState(
    () => `
# Demo Init content

name=wener

[site]
url=https://apis.wener.me

[db]
  host=localhost
  port=5432
`,
  );
  const [json, setJson] = React.useState(() => JSON.stringify(INI.parse(ini), null, 2));
  const [generated, setGenerated] = React.useState(() => INI.stringify(INI.parse(ini)));

  return (
    <Row gutter={16} style={{}}>
      <Col span={12}>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Card title={'INI'}>
              <SimpleCodeEditor
                value={ini}
                onChange={v => {
                  try {
                    setIni(v);
                    const o = INI.parse(v);
                    setJson(JSON.stringify(o, null, 2));
                    setGenerated(INI.stringify(o));
                  } catch (e) {
                    message.error(`ERROR: ${e}`);
                  }
                }}
                language={'ini'}
              />
            </Card>
          </Col>
          <Col span={24}>
            <Card title={'Generated'}>
              <SimpleCodeEditor value={generated} onChange={setGenerated} language={'ini'} />
            </Card>
          </Col>
        </Row>
      </Col>

      <Col span={12}>
        <Card
          title="JSON"
          extra={
            <Button
              type="primary"
              ghost
              onClick={() => {
                try {
                  setGenerated(INI.stringify(JSON.parse(json)));
                } catch (e) {
                  message.error(`ERROR: ${e}`);
                }
              }}
            >
              Generated
            </Button>
          }
        >
          <SimpleCodeEditor value={json} onChange={setJson} language={'json'} />
        </Card>
      </Col>
    </Row>
  );
};

const Page = () => {
  return (
    <PageLayout
      title="ini 文件解析处理"
      description="Ini file parser reader generator"
      keywords="ini file, parser, generator, json, convert"
    >
      <PageContent>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{ marginRight: 8 }} />
              Ini 解析
            </div>
          }
          backIcon={false}
        />

        <IniPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;

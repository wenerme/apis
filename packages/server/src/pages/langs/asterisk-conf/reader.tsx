import React, { useState } from 'react';
import { Button, Card, Col, message, PageHeader, Row } from 'antd';
import { QrcodeOutlined } from '@ant-design/icons/lib';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { SimpleCodeEditor } from 'src/components/editor/SimpleCodeEditor';
import { usePrismTheme } from 'src/hooks/prism';
import { AsteriskConf } from 'src/modules/langs/asterisk-conf/AsteriskConf';

const Lang = AsteriskConf;

const DemoPageContent: React.FC = () => {
  const [theme, setTheme] = useState('prism-solarizedlight');
  usePrismTheme(theme);

  const [value, setValue] = React.useState(
    () => `
[general]
a => 1
b = 2

[base](!)
line=abc

[user](!,base)
pass=admin

[101](user)
name=wener

[101](+)
no=101
`,
  );
  const [json, setJson] = React.useState(() => JSON.stringify(Lang.parse(value), null, 2));
  const [generated, setGenerated] = React.useState(() => Lang.stringify(Lang.parse(value)));

  return (
    <Row gutter={16} style={{}}>
      <Col span={12}>
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Card title={'Asterisk Conf'}>
              <SimpleCodeEditor
                value={value}
                onChange={v => {
                  try {
                    setValue(v);
                    const o = Lang.parse(v);
                    setJson(JSON.stringify(o, null, 2));
                    setGenerated(Lang.stringify(o));
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
                  setGenerated(Lang.stringify(JSON.parse(json)));
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

        <DemoPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;

import React, { useState } from 'react';
import { Alert, Button, Card, Col, PageHeader, Row } from 'antd';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { createSubscriptionContainer, SubscriptioHookOptions } from '@wener/ui';
import { j2xParser as Json2XmlParser, parse, validate } from 'fast-xml-parser';
import { SimpleCodeEditor } from 'src/components/editor/SimpleCodeEditor';
import { usePrismTheme } from 'src/hooks/prism';

function useXmlPlaygroundContainer({
  updateState,
  getState,
  subscribe,
}: SubscriptioHookOptions<ReturnType<typeof createInitialState>>) {
  const onXmlChange = (v) => {
    updateState((s) => {
      s.xml = v;
      const valid = validate(v);
      s.xmlError = valid?.['err']?.['msg'];
      if (s.xmlError) {
        console.log(`Invalid`, valid);
        return;
      }
      s.json = JSON.stringify(parse(v, s.parseOptions), null, 2);
      s.jsonError = '';
    });
  };
  const onJsonChange = (v) => {
    updateState((s) => (s.json = v));
  };
  const onParseOptionChange = (v) => {
    updateState((s) => Object.assign(s.parseOptions, v));
  };
  const convertJsonToXml = () => {
    updateState((s) => {
      try {
        const o = JSON.parse(s.json);
        const parser = new Json2XmlParser({ ...s.parseOptions, format: true });
        s.xml = parser.parse(o);
      } catch (e) {
        s.jsonError = e + '';
        return;
      }
    });
  };

  {
    let last = getState().parseOptions;
    subscribe((s) => {
      if (last !== s.parseOptions) {
        last = s.parseOptions;
        onXmlChange(s.xml);
      }
    });
  }
  return { onXmlChange, onJsonChange, onParseOptionChange, convertJsonToXml };
}
function createInitialState() {
  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<project version="4">
  <component name="VcsDirectoryMappings">
    <mapping directory="" vcs="Git" />
    <properties>
      <a>b</a>
      <c>b</c>
    </properties>
    Text Here
  </component>
</project>
`.trim();
  const parseOptions = {
    attributeNamePrefix: '',
    attrNodeName: '#attr',
    textNodeName: '#text',
    ignoreAttributes: false,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: '__cdata',
    cdataPositionChar: '\\c',
    parseTrueNumberOnly: false,
    arrayMode: false,

    // tagValueProcessor: (a) => decode(a, { useNamedReferences: true }),
    // attrValueProcessor: (a) => decode(a),
  };
  return {
    xml,
    xmlError: '',
    json: JSON.stringify(parse(xml, parseOptions), null, 2),
    jsonError: '',
    parseOptions,
  };
}
const XmlPlayground = createSubscriptionContainer(useXmlPlaygroundContainer);

const ParseOption = () => {
  const {
    textNodeName,
    attrNodeName,
    ignoreAttributes,
    parseNodeValue,
    parseAttributeValue,
    attributeNamePrefix,
  } = XmlPlayground.useSelector(
    ({
      parseOptions: {
        textNodeName,
        attrNodeName,
        ignoreAttributes,
        parseNodeValue,
        parseAttributeValue,
        attributeNamePrefix,
      },
    }) => ({
      textNodeName,
      attrNodeName,
      ignoreAttributes,
      parseNodeValue,
      parseAttributeValue,
      attributeNamePrefix,
    }),
  );
  const { onParseOptionChange } = XmlPlayground.useContainer();

  const createHandler = (k) => {
    const [name, value] = Object.entries(k)[0];
    if (typeof value === 'boolean') {
      return {
        checked: value,
        onChange: (v) => onParseOptionChange({ [name]: v.target.checked }),
      } as any;
    }
    return {
      value,
      onChange: (v) => onParseOptionChange({ [name]: v.target.value }),
    } as any;
  };
  return (
    <div>
      <div>
        <label>
          <input type="checkbox" {...createHandler({ parseAttributeValue })} />
          解析属性值
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" {...createHandler({ parseNodeValue })} />
          解析节点值
        </label>
      </div>
      <div>
        <label>
          <input type="checkbox" {...createHandler({ ignoreAttributes })} />
          忽略属性
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={Boolean(textNodeName)}
            onChange={(v) => onParseOptionChange({ textNodeName: v.target.checked ? '#text' : false })}
          />
          保留文本节点为 #text
        </label>
      </div>
      <div>
        <label>
          属性名字前缀
          <input type="text" {...createHandler({ attributeNamePrefix })} />
        </label>
      </div>
    </div>
  );
};

const DemoPageContent: React.FC = () => {
  const [theme, setTheme] = useState('prism-solarizedlight');
  usePrismTheme(theme);

  const { xml, json, xmlError, jsonError } = XmlPlayground.useSelector(({ xml, json, xmlError, jsonError }) => ({
    xml,
    json,
    xmlError,
    jsonError,
  }));
  const { onXmlChange, onJsonChange, convertJsonToXml } = XmlPlayground.useContainer();
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={'XML'}>
            <SimpleCodeEditor value={xml} onChange={onXmlChange} language="xml" />
            {xmlError && <Alert type={'error'} message={xmlError} />}
          </Card>

          <ParseOption />
        </Col>
        <Col span={12}>
          <Card title={'JSON'} extra={<Button onClick={convertJsonToXml}>To XML</Button>}>
            <SimpleCodeEditor value={json} onChange={onJsonChange} language="json" />
            {jsonError && <Alert type={'error'} message={jsonError} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout title="Demo Page" description="演示页面" keywords="demo, react nextjs, zeit now">
      <PageContent>
        <PageHeader title={<div>XML Playground</div>} backIcon={false} />

        <XmlPlayground.Provider initialState={createInitialState()}>
          <DemoPageContent />
        </XmlPlayground.Provider>
      </PageContent>
    </PageLayout>
  );
};
export default Page;

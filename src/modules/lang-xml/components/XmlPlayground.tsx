import React, { useState } from 'react';
import { Alert, Button, Card, Col, Row } from 'antd';
import { createSubscriptionContainer, SubscriptioHookOptions } from 'src/ui';
import { default as XmlParser } from 'fast-xml-parser';
import { SimpleCodeEditor } from 'src/components/editor/SimpleCodeEditor';
import { usePrismTheme } from 'src/hooks/prism';

// const { j2xParser: Json2XmlParser, parse, validate } = require('fast-xml-parser');

function useXmlPlaygroundContainer({
  updateState,
  getState,
  subscribe,
}: SubscriptioHookOptions<ReturnType<typeof createInitialState>>) {
  const onXmlChange = (v) => {
    updateState((s) => {
      s.xml = v;
      const valid = XmlParser.validate(v);
      s.xmlError = valid?.['err']?.['msg'];
      if (s.xmlError) {
        console.log(`Invalid`, valid);
        return;
      }
      s.json = JSON.stringify(XmlParser.parse(v, s.parseOptions), null, 2);
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
        const parser = new XmlParser.j2xParser({ ...s.parseOptions, format: true });
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
    json: JSON.stringify(XmlParser.parse(xml, parseOptions), null, 2),
    jsonError: '',
    parseOptions,
  };
}

const XmlPlaygroundContext = createSubscriptionContainer(useXmlPlaygroundContainer);

const ParseOption = () => {
  const {
    textNodeName,
    attrNodeName,
    ignoreAttributes,
    parseNodeValue,
    parseAttributeValue,
    attributeNamePrefix,
  } = XmlPlaygroundContext.useSelector(
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
  const { onParseOptionChange } = XmlPlaygroundContext.useContainer();

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

const XmlPlaygroundContent: React.FC = () => {
  const [theme, setTheme] = useState('prism-solarizedlight');
  usePrismTheme(theme);

  const { xml, json, xmlError, jsonError } = XmlPlaygroundContext.useSelector(({ xml, json, xmlError, jsonError }) => ({
    xml,
    json,
    xmlError,
    jsonError,
  }));
  const { onXmlChange, onJsonChange, convertJsonToXml } = XmlPlaygroundContext.useContainer();
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

export const XmlPlayground: React.FC = () => {
  return (
    <XmlPlaygroundContext.Provider initialState={createInitialState()}>
      <XmlPlaygroundContent />
    </XmlPlaygroundContext.Provider>
  );
};

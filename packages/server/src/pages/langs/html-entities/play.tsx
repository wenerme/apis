import React from 'react';
import { Alert, Card, Checkbox, Col, Input, PageHeader, Row } from 'antd';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { decode, encode } from 'he';
import { createSubscriptionContainer, SubscriptioHookOptions } from '@wener/ui';

function useContainer({
  updateState,
  getState,
  subscribe,
}: SubscriptioHookOptions<ReturnType<typeof createInitialState>>) {
  const onEncodedChange = (v) => {
    updateState((s) => {
      s.encoded = v;
      s.decoded = decode(v, s.decodeOptions);
    });
  };
  const onDecodedChange = (v) => {
    updateState((s) => {
      s.decoded = v;
      s.encoded = encode(v, s.encodeOptions);
    });
  };
  const onEncodeOptionChange = (v) => {
    updateState((s) => {
      Object.assign(s.encodeOptions, v);
    });
  };

  {
    let last = getState().encodeOptions;
    subscribe((s) => {
      if (last !== s.encodeOptions) {
        last = s.encodeOptions;
        updateState((s) => (s.encoded = encode(s.decoded, last)));
      }
    });
  }
  return {
    onEncodedChange,
    onDecodedChange,
    onEncodeOptionChange,
  };
}
const HtmlEntityContainer = createSubscriptionContainer(useContainer);
function createInitialState() {
  const decoded = 'Foo © bar 𝌆 baz ☃ qux : 1 > 2';
  const encodeOptions = {
    useNamedReferences: true,
    decimal: false,
    encodeEverything: false,
    strict: false,
    allowUnsafeSymbols: false,
  };
  return {
    decoded,
    encoded: encode(decoded, encodeOptions),
    encodeOptions,
    decodeOptions: {
      isAttributeValue: false,
      strict: false,
    },
  };
}
const DemoPageContent: React.FC = () => {
  const { onEncodedChange, onDecodedChange } = HtmlEntityContainer.useContainer();
  const { encoded, decoded } = HtmlEntityContainer.useSelector(({ encoded, decoded }) => ({ encoded, decoded }));
  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title={'HTML Entities'}>
            <Input.TextArea
              rows={10}
              value={decoded}
              onChange={(v) => {
                onDecodedChange(v.target.value);
              }}
            />
            <EncodeOption />
          </Card>
        </Col>
        <Col span={12}>
          <Card title={'Encoded'}>
            <Input.TextArea rows={10} value={encoded} onChange={(v) => onEncodedChange(v.target.value)} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const EncodeOption: React.FC = () => {
  const { onEncodeOptionChange } = HtmlEntityContainer.useContainer();
  const { useNamedReferences, allowUnsafeSymbols, encodeEverything } = HtmlEntityContainer.useSelector(
    ({ encodeOptions: { useNamedReferences, allowUnsafeSymbols, encodeEverything } }) => ({
      useNamedReferences,
      allowUnsafeSymbols,
      encodeEverything,
    }),
  );
  return (
    <div>
      <div>
        <label>
          <Checkbox
            checked={encodeEverything}
            onChange={(v) => onEncodeOptionChange({ encodeEverything: v.target.checked })}
          />
          编码所有字符 - 即便是安全的非 ASCII 字符
        </label>
      </div>
      <div>
        <label>
          <Checkbox
            checked={allowUnsafeSymbols}
            onChange={(v) => onEncodeOptionChange({ allowUnsafeSymbols: v.target.checked })}
          />
          允许不安全字符
        </label>
      </div>
      <div>
        <label>
          <Checkbox
            checked={useNamedReferences}
            onChange={(v) => onEncodeOptionChange({ useNamedReferences: v.target.checked })}
          />
          允许使用命名的字符引用
        </label>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout title="HTML Entities" description="HTML Entities Playground" keywords="html, convert">
      <PageContent>
        <PageHeader title={<div>HTML Entities</div>} backIcon={false} />
        <HtmlEntityContainer.Provider initialState={createInitialState()}>
          <DemoPageContent />
        </HtmlEntityContainer.Provider>

        <div style={{ marginTop: 18 }}>
          <Alert
            type="info"
            showIcon
            message={
              <div>
                实现基于
                <a href="https://www.npmjs.com/package/he" rel="noopener">
                  he
                </a>
                <br />
              </div>
            }
          />
        </div>
      </PageContent>
    </PageLayout>
  );
};
export default Page;

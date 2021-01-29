import React from 'react';
import { Alert, Button, Card, Col, Divider, Input, List, message, Row } from 'antd';
import { useImmer } from 'use-immer';
import {
  AlgorithmSelectorList,
  SelectorChangeEvent,
  SelectorOption,
} from './AlgorithmSelectorList';
import { CopyOutlined } from '@ant-design/icons';
import { copy } from '@wener/utils';

export const HashContent: React.FC<{ selector; input?; onHashing?; loading?; result? }> = ({
  input,
  selector,
  onHashing,
  loading,
  result,
}) => {
  return (
    <Row gutter={12}>
      <Col span={8}>
        <div style={{ display: 'grid', gap: 12 }}>
          <Card
            title={'内容'}
            extra={
              <span>
                <Button loading={loading} onClick={onHashing} type={'primary'}>
                  计算
                </Button>
              </span>
            }
          >
            {input}
          </Card>
          <Card title="设置">
            <Divider>算法</Divider>
            {selector}
            <Divider>说明</Divider>
            <Alert
              type={'info'}
              message={
                <span>
                  crypto 使用 <a href="https://github.com/brix/crypto-js">brix/crypto-js</a>
                </span>
              }
            />
          </Card>
        </div>
      </Col>
      <Col span={16}>
        <Card title={'结果'}>{result}</Card>
      </Col>
    </Row>
  );
};

const hashAlgorithms = [
  { value: 'md5', label: 'MD5', enabled: true },
  { value: 'ripemd160', label: 'RIPEMD-160' },
  { value: 'sha1', label: 'SHA1' },
  {
    value: 'sha2',
    label: 'SHA2',
    options: [
      { value: 'sha256', label: 'SHA256' },
      { value: 'sha512', label: 'SHA512' },
      { value: 'sha224', label: 'SHA224' },
      { value: 'sha384', label: 'SHA384' },
    ],
  },
  {
    value: 'sha3',
    label: 'SHA3',
    description: 'Keccak[c=2d] - winner of the SHA-3 competition by NIST',
    options: [
      { value: 'sha256', label: 'SHA256' },
      { value: 'sha512', label: 'SHA512' },
      { value: 'sha224', label: 'SHA224' },
      { value: 'sha384', label: 'SHA384' },
    ],
  },
];

interface HashResult {
  id;
  label;
  loading?: boolean;
  hex?: string;
}

export const HashPlayground: React.FC = () => {
  const [state, update] = useImmer({
    algorithms: hashAlgorithms as SelectorOption[],
    running: false,
    content: 'Hello World !',
    results: [] as HashResult[],
  });
  const doAlgorithmChange = (opts: SelectorChangeEvent[]) => {
    update((s) => {
      if (s.running) {
        return;
      }
      for (const { value, option, enabled } of opts) {
        let a = s.algorithms.find((v) => v.value === value);
        if (option) {
          a = a.options.find((v) => v.value === option);
        }
        a.enabled = enabled;
      }
    });
  };

  const doHashing = async () => {
    update((s) => {
      s.running = true;

      const calcs = [];
      for (const a of s.algorithms) {
        if (a.options) {
          for (const v of a.options) {
            if (v.enabled) {
              calcs.push({ id: a.value + v.value, label: a.label + '/' + v.label, loading: true });
            }
          }
        } else if (a.enabled) {
          calcs.push({ id: a.value, label: a.label, loading: true });
        }
      }
      s.results = calcs;
    });

    const { default: CryptoJS } = await System.import('https://cdn.jsdelivr.net/npm/crypto-js@4.0.0/crypto-js.min.js');
    console.log(CryptoJS);
    const o = hash({ CryptoJS });

    update((s) => {
      const opts = { content: s.content };
      for (const c of s.results) {
        c.hex = String(o[c.id](opts));
        c.loading = false;
      }
      s.running = false;
    });
  };
  return (
    <HashContent
      loading={state.running}
      onHashing={doHashing}
      input={
        <Input.TextArea
          disabled={state.running}
          value={state.content}
          onChange={(v) => {
            const c = v.target.value;
            update((s) => {
              s.content = c;
            });
          }}
        />
      }
      result={<HashResultList value={state.results} />}
      selector={<AlgorithmSelectorList algorithms={state.algorithms} onChange={doAlgorithmChange} />}
    />
  );
};

const HashResultList: React.FC<{ value: HashResult[] }> = ({ value }) => {
  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={value}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={<span style={{ fontWeight: 'bold' }}>{item.label}</span>}
              description={
                <div>
                  <Input
                    value={item.hex}
                    onClick={(e) => e.target?.['select']()}
                    onFocus={(e) => e.target?.['select']()}
                    prefix={'HEX'}
                    suffix={
                      <CopyOutlined
                        onClick={() => {
                          copy(item.hex);
                          message.success('复制成功');
                        }}
                      />
                    }
                  />
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

function hash(o: { CryptoJS }) {
  const { CryptoJS } = o;
  return {
    ripemd160({ content }) {
      return CryptoJS.RIPEMD160(content);
    },
    md5({ content }) {
      return CryptoJS.MD5(content);
    },
    sha1({ content }) {
      return CryptoJS.SHA1(content);
    },
    sha2sha256({ content }) {
      return CryptoJS.SHA256(content);
    },
    sha2sha512({ content }) {
      return CryptoJS.SHA512(content);
    },
    sha2sha224({ content }) {
      return CryptoJS.SHA224(content);
    },
    sha2sha384({ content }) {
      return CryptoJS.SHA384(content);
    },

    sha3sha256({ content }) {
      return CryptoJS.SHA3(content, { outputLength: 256 });
    },
    sha3sha512({ content }) {
      return CryptoJS.SHA3(content, { outputLength: 512 });
    },
    sha3sha224({ content }) {
      return CryptoJS.SHA3(content, { outputLength: 224 });
    },
    sha3sha384({ content }) {
      return CryptoJS.SHA3(content, { outputLength: 384 });
    },
  };
}

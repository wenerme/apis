import React, {useEffect, useRef, useState} from 'react';
import Head from 'next/head';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Alert, Input, PageHeader} from 'antd';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {useRouter} from 'next/router';
import {HashingAlgorithms} from 'modules/hash/types';
import Link from 'next/link';
import {API} from 'apis/api';
import {Buffer} from 'buffer/'
import {LockOutlined} from '@ant-design/icons';

const HashPageContent: React.FC<{ algorithm, content, initialData }> = ({algorithm, content, initialData}) => {
  const [input, setInput] = useState(content);
  const router = useRouter();
  const lastInitial = useRef<{ content, algorithm }>();
  useEffect(() => {
    if (lastInitial.current) {
      if (lastInitial.current.content !== content || lastInitial.current.algorithm !== algorithm) {
        if (content) {
          router.push(`/hash/md/[algorithm]/[content]`, `/hash/md/${algorithm}/${content}.html`)
        } else {
          router.push(`/hash/md/[algorithm]`, `/hash/md/${algorithm}.html`)
        }
      }
    }
    lastInitial.current = {content, algorithm};
  }, [algorithm, content]);

  const [value, setValue] = useState({content, algorithm});
  useEffect(() => {
    if (value.content) {
      const {content, algorithm} = value;
      router.push(`/hash/md/[algorithm]/[content]`, `/hash/md/${algorithm}/${content}.html`)
    }
  }, [value]);

  return (
    <div>
      {initialData?.message && <Alert message={`请求失败 ${initialData.message}`} type="error" showIcon />}
      <div style={{marginTop: 18}}>
        <Input.Search
          value={input}
          enterButton="计算"
          onChange={v => setInput(v.target.value)}
          onSearch={v => {
            if (Boolean(v)) {
              setValue({algorithm, content: v});
            }
          }}
          placeholder="哈希内容"
        />
      </div>

      <div style={{marginTop: 18}}>
        <h3>{content ? `"${content}" 的 ${algorithm} ` : ''}结果</h3>
        <Input.Search
          addonBefore="Base64"
          placeholder="哈希结果"
          value={initialData?.digest}
          enterButton="复制"
          onSearch={v => {
            navigator.clipboard.writeText(v)
          }}
        />
        <Input.Search
          style={{marginTop: 9}}
          addonBefore="Hex"
          placeholder="哈希结果"
          value={initialData?.digest ? new Buffer(initialData.digest, 'base64').toString('hex') : ''}
          enterButton="复制"
          onSearch={v => {
            navigator.clipboard.writeText(v)
          }}
        />
      </div>

      <div style={{marginTop: 18}}>
        <h4>哈希算法</h4>
        <div>
          {HashingAlgorithms.map(v => (
            <Link
              key={v}
              href={content ? '/hash/md/[algorithm]/[content]' : '/hash/md/[algorithm]'}
              as={content ? `/hash/md/${v}/${content}.html` : `/hash/md/${v}.html`}
            >
              <a
                href={content ? `/hash/md/${v}/${content}.html` : `/hash/md/${v}.html`}
                className="ant-btn ant-btn-link"
              >
                {v}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div style={{marginTop: 18}}>
        <h4>接口请求</h4>
        <div style={{opacity: content ? 1 : 0}}>
          <a
            href={`${API.origin}/api/hash/md/${algorithm}/base64/json/${content}`}
            target="_blank"
          >
            {`${API.origin}/api/hash/md/${algorithm}/base64/json/${content}`}
          </a>
        </div>
        <div>
          <pre>
            {JSON.stringify(initialData, null, '  ')}
          </pre>
        </div>
      </div>

    </div>
  )
};
export const HashPage: React.FC<{ algorithm, content, initialData }> = ({algorithm, content, initialData}) => {
  return (
    <>
      <Head>
        <title>{algorithm}哈希计算</title>
      </Head>

      <PageLayout>
        <PageContent>
          <PageHeader
            title={
              <div>
                <LockOutlined style={{marginRight: 8}} />
                {algorithm}哈希计算
              </div>
            }
            backIcon={false}
          />
          <HashPageContent content={content} algorithm={algorithm} initialData={initialData} />
        </PageContent>
      </PageLayout>
    </>
  )
};

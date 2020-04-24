import React, { useState } from 'react';
import Head from 'next/head';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { Alert, Input, PageHeader } from 'antd';
import { PhoneAttributionDetail } from './PhoneAttributionDetail';
import { useFetchEffect } from '@wener/ui';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API } from 'src/apis/api';
import { createRandom } from '@wener/utils/src/maths/random';
import { PhoneOutlined } from '@ant-design/icons';

function suggestNumbers(seed) {
  const pre = [
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    141,
    145,
    146,
    147,
    149,
    150,
    151,
    152,
    153,
    155,
    156,
    157,
    158,
    159,
    165,
    166,
    167,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    191,
    198,
    199,
  ];
  // 当前页面结果不变
  const random = createRandom({ seed });

  // const random = () => Math.random();
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    result.push(`${pre[Math.floor(random() * pre.length)]}${(Math.floor(random() * 999999999) + '').padStart(9, '0')}`);
  }
  return result;
}

const SuggestSearch: React.FC<{ seed }> = ({ seed }) => {
  const numbers = React.useMemo(() => suggestNumbers(seed), [seed]);
  return (
    <div>
      <h4>查询</h4>
      <div>
        {numbers.map((v) => (
          <Link key={v} href="/phone/attribution/[num]" as={`/phone/attribution/${v}.html`}>
            <a href={`/phone/attribution/${v}.html`} className="ant-btn ant-btn-link">
              {v}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

const PhoneAttributionPageContent: React.FC<{ initialData }> = ({ initialData }) => {
  const { number } = initialData;
  const [phoneNumber, setPhoneNumber] = useState(number);
  const [currentNumber, setCurrentNumber] = useState(number);
  const router = useRouter();
  const { loading, data, error } = useFetchEffect(async () => {
    if (!currentNumber || currentNumber === number) {
      return initialData;
    }
    console.log(`Route number`, currentNumber);
    return router.push('/phone/attribution/[num]', `/phone/attribution/${currentNumber}.html`);
    // return fetchPhoneAttribution({number: currentNumber})
  }, [currentNumber]);
  // console.log(`Route`, router, data, initialData);

  return (
    <div>
      <div style={{ marginTop: 18 }}>
        <Input.Search
          placeholder="电话号码"
          loading={loading}
          value={phoneNumber}
          onChange={(v) => setPhoneNumber(v.target.value)}
          onSearch={setCurrentNumber}
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <PhoneAttributionDetail data={initialData} />
      </div>

      <div style={{ marginTop: 18 }}>
        {/* 单个页面不会变 - 刷新才会变 */}
        <SuggestSearch seed={currentNumber} />
      </div>

      <div style={{ marginTop: 18 }}>
        <h4>接口请求</h4>
        <div>
          <a
            href={`${API.origin}/api/phone/attribution/${number || '135000000000'}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${API.origin}/api/phone/attribution/${number || '135000000000'}`}
          </a>
        </div>
        <div>
          <pre>{JSON.stringify(initialData, null, '  ')}</pre>
        </div>
      </div>
    </div>
  );
};

export const PhoneAttributionPage: React.FC<{ initialData }> = ({ initialData = {} }) => {
  const { number } = initialData;

  return (
    <React.Fragment>
      <Head>
        <title>手机号{number ?? ''}归属地查询</title>
      </Head>
      <PageLayout>
        <PageContent>
          <PageHeader
            title={
              <div>
                <PhoneOutlined style={{ marginRight: 8 }} />
                手机号{number ?? ''}归属地查询
              </div>
            }
            backIcon={false}
          />

          <PhoneAttributionPageContent initialData={initialData} />

          <div style={{ marginTop: 18 }}>
            <Alert
              type="info"
              showIcon
              message={
                <div>
                  数据来源于{' '}
                  <a href="https://github.com/xluohome/phonedata" target="_blank" rel="noopener noreferrer">
                    xluohome/phonedata
                  </a>
                  。
                </div>
              }
            />
          </div>
        </PageContent>
      </PageLayout>
    </React.Fragment>
  );
};

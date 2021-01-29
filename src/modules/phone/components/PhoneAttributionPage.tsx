import React, { useState } from 'react';
import Head from 'next/head';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { Input, PageHeader } from 'antd';
import { PhoneAttributionDetail } from './PhoneAttributionDetail';
import { useFetchEffect } from 'src/ui';
import { useRouter } from 'next/router';
import { API } from 'src/apis/api';
import { PhoneOutlined } from '@ant-design/icons';
import { SuggestSearch } from 'src/modules/phone/components/SuggestSearch';

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
        </PageContent>
      </PageLayout>
    </React.Fragment>
  );
};

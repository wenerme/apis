import React, {useState} from 'react';
import Head from 'next/head';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Icon, Input, PageHeader} from 'antd';
import {PhoneAttributionDetail} from 'modules/phone/components/PhoneAttributionDetail';
import {useFetchEffect} from 'hooks/useFetchEffect';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {API} from 'apis/api';
import {createRandom} from 'utils/random';

function suggestNumbers(seed) {
  const pre = [
    130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 141, 145, 146, 147, 149, 150, 151, 152, 153, 155, 156, 157, 158, 159, 165, 166, 167, 170, 171, 172, 173, 174, 175, 176, 177, 178, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 191, 198, 199,
  ];
  // 当前页面结果不变
  const random = createRandom({seed});

  // const random = () => Math.random();
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push(`${pre[Math.floor(random() * pre.length)]}${(Math.floor(random() * 999999999) + '').padStart(9, '0')}`);
  }
  return result;
}

const SuggestSearch: React.FC<{ seed }> = ({seed}) => {
  const numbers = React.useMemo(() => suggestNumbers(seed), [seed]);
  return (
    <div>
      <h4>查询</h4>
      <div>
        {numbers.map(v => (
          <Link key={v} href="/phone/attribution/[num]" as={`/phone/attribution/${v}.html`}>
            <a href={`/phone/attribution/${v}.html`} className="ant-btn ant-btn-link">{v}</a>
          </Link>
        ))}
      </div>
    </div>
  )
};

const PhoneAttributionPageContent: React.FC<{ initialData }> = ({initialData}) => {
  const {number} = initialData;
  const [phoneNumber, setPhoneNumber] = useState(number);
  const [currentNumber, setCurrentNumber] = useState(number);
  const {loading, data, error} = useFetchEffect(async () => {
    if (!currentNumber || currentNumber === number) {
      return initialData;
    }
    console.log(`Route number`, currentNumber);
    return router.push('/phone/attribution/[num]', `/phone/attribution/${currentNumber}.html`);
    // return fetchPhoneAttribution({number: currentNumber})
  }, [currentNumber]);
  const router = useRouter();
  // console.log(`Route`, router, data, initialData);

  return (
    <div>

      <div style={{marginTop: 18}}>
        <Input.Search
          placeholder="电话号码"
          loading={loading}
          value={phoneNumber}
          onChange={v => setPhoneNumber(v.target.value)}
          onSearch={setCurrentNumber}
        />
      </div>

      <div style={{marginTop: 18}}>
        <PhoneAttributionDetail data={initialData} />
      </div>

      <div style={{marginTop: 18}}>
        {/* 单个页面不会变 - 刷新才会变 */}
        <SuggestSearch seed={currentNumber} />
      </div>

      <div style={{marginTop: 18}}>
        <h4>接口请求</h4>
        <div>
          <a href={`${API.url}/api/phone/attribution/${number || '135000000000'}`} target="_blank">
            {`${API.url}/api/phone/attribution/${number || '135000000000'}`}
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

export const PhoneAttributionPage: React.FC<{ initialData }> = ({initialData = {}}) => {
  const {number} = initialData;

  return (
    <>
      <Head>
        <title>手机号{number ?? ''}归属地查询</title>
      </Head>
      <PageLayout>
        <PageContent>
          <PageHeader
            title={
              <div>
                <Icon type="phone" style={{marginRight: 8}} />
                手机号{number ?? ''}归属地查询
              </div>
            }
            backIcon={false}
          />

          <PhoneAttributionPageContent initialData={initialData} />
        </PageContent>
      </PageLayout>
    </>
  )
};

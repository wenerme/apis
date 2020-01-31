import React, {useState} from 'react';
import Head from 'next/head';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Icon, Input, PageHeader} from 'antd';
import {PhoneAttributionDetail} from 'components/layout/phone/PhoneAttributionDetail';
import {useFetchEffect} from 'hooks/useFetchEffect';
import unfetch from 'isomorphic-unfetch';

export const PhoneAttributionPage: React.FC<{ initialData }> = ({initialData = {}}) => {
  const {number} = initialData;
  const [phoneNumber, setPhoneNumber] = useState(number);
  const [currentNumber, setCurrentNumber] = useState(number);
  const {loading, data, error} = useFetchEffect(async () => {
    if (currentNumber === number) {
      return initialData;
    }
    return unfetch(`https://wener-apis.now.sh/api/phone/attribution/${currentNumber}`).then(v => v.json());
  }, [currentNumber]);
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
          <div>
            <div style={{marginTop: 18}}>
              <Input.Search
                placeholder="电话号码"
                loading={loading}
                value={phoneNumber}
                onChange={v => setPhoneNumber(v.target.value)}
                onSearch={v => setCurrentNumber(v)}
              />
            </div>
            <div style={{marginTop: 18}}>
              <PhoneAttributionDetail data={data || initialData} />
            </div>
            <div>

            </div>
          </div>
        </PageContent>
      </PageLayout>
    </>
  )
};

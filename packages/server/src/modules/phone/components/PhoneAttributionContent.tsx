import { Alert, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { PhoneAttributionDetail } from 'src/modules/phone/components/PhoneAttributionDetail';
import { consumeClientService, PhoneAttributionResponse, PhoneAttributionService } from 'src/modules/client';
import { useQuery } from 'react-query';

export const PhoneAttributionContent: React.FC<{ initialData?: PhoneAttributionResponse; number? }> = ({
  initialData,
  number: initialNumber,
}) => {
  const svc = consumeClientService(PhoneAttributionService);
  const [number, setNumber] = useState(initialData?.number || initialNumber || '13000000000');
  const { isLoading, data, refetch } = useQuery(
    ['phoneAttribution', number],
    (_, number) => svc.getAttribution({ number }),
    {
      enabled: false,
      initialData,
    },
  );
  useEffect(() => {
    if (!initialData && number) {
      refetch();
    }
  }, []);
  return (
    <div>
      <div style={{ marginTop: 18 }}>
        <Input.Search
          placeholder="电话号码"
          loading={isLoading}
          value={number}
          onChange={(v) => setNumber(v.target.value)}
          onSearch={() => refetch()}
        />
      </div>

      <div style={{ marginTop: 18 }}>
        <Spin spinning={isLoading}>
          <PhoneAttributionDetail data={data} />
        </Spin>
      </div>

      <div style={{ marginTop: 18 }}>
        <h4>接口返回结果</h4>
        <div>
          <pre>{JSON.stringify(data, null, '  ')}</pre>
        </div>
      </div>

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
    </div>
  );
};

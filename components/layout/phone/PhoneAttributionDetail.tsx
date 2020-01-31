import React from 'react';
import {Descriptions} from 'antd';

export const PhoneAttributionDetail: React.FC<{ data }> = ({data = {}}) => {
  const {prefix, number, vendor, province, city, zip, areaCode} = data;
  return (
    <div>
      <Descriptions title="归属地信息" bordered>
        <Descriptions.Item label="号码" span={2}>{number}</Descriptions.Item>
        <Descriptions.Item label="有效前缀">{prefix}</Descriptions.Item>
        <Descriptions.Item label="所属省">{province}</Descriptions.Item>
        <Descriptions.Item label="所属市">{city}</Descriptions.Item>
        <Descriptions.Item label="运营商">{vendor}</Descriptions.Item>
        <Descriptions.Item label="邮编">{zip}</Descriptions.Item>
        <Descriptions.Item label="区号">{areaCode}</Descriptions.Item>
      </Descriptions>
    </div>
  )
};

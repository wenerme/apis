import React, {useEffect, useState} from 'react';
import {Select, Spin} from 'antd';
import {getKongService} from 'modules/kong/apis/client';
import produce from 'immer';

export const EntitySelect: React.FC<{ entityName, value?, onChange? }> = ({entityName, ...props}) => {
  const [state, setState] = useState({
    data: [],
    value: [],
    loading: false,
  });
  const {loading, data} = state;

  useEffect(() => {
    setState(produce(s => {
      s.loading = true
    }));
    getKongService()[`list${entityName}`]()
      .then(v => {
        setState(produce(s => {
          s.data = v.data
          s.loading = false
        }))
      })
      .finally(() => {
        setState(produce(s => {
          s.loading = false
        }));
      })
  }, []);

  // TODO search, find by id only, paging
  return (
    <Select
      notFoundContent={loading ? <Spin size="small" /> : null}
      {...props}
    >
      {data.map(v => (
        <Select.Option value={v.id} key={v.id}>{v.name ? `${v.name} - ${v.id}` : `${v.id}`}</Select.Option>
      ))}
    </Select>
  )
};

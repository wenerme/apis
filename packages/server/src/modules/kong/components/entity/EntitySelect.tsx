import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import { getKongService } from '../../apis/client';
import produce from 'immer';

export const EntitySelect: React.FC<{ entityName; value?; onChange? }> = ({
  entityName,
  value,
  onChange,
  ...props
}) => {
  const [state, setState] = useState({
    data: [],
    total: [],
    value: [],
    loading: false,
  });
  const { loading, data } = state;

  useEffect(() => {
    setState(
      produce((s) => {
        s.loading = true;
      }),
    );
    getKongService()
      ?.[`list${entityName}`]()
      .then((v) => {
        setState(
          produce((s) => {
            s.data = s.total = v.data;
            s.loading = false;
          }),
        );
      })
      .finally(() => {
        setState(
          produce((s) => {
            s.loading = false;
          }),
        );
      });
  }, []);
  const onSearch = (v) => {
    if (!v) {
      setState(
        produce((s) => {
          s.data = s.total;
        }),
      );
    } else {
      setState(
        produce((s) => {
          s.data = s.total.filter((vv) => vv.id.includes(v) || vv.name?.includes(v));
        }),
      );
    }
  };

  // TODO search, find by id only, paging
  return (
    <Select
      allowClear
      filterOption={false}
      showSearch
      notFoundContent={loading ? <Spin size="small" /> : null}
      value={value?.id ?? null}
      onChange={(v) => {
        onChange(v ? { id: v } : null);
      }}
      onSearch={onSearch}
      {...props}
    >
      {data.map((v) => (
        <Select.Option value={v.id} key={v.id}>
          {v.name ? `${v.name} - ${v.id}` : `${v.id}`}
        </Select.Option>
      ))}
    </Select>
  );
};

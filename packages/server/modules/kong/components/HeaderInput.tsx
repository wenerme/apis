import React, { CSSProperties } from 'react';
import { Input } from 'antd';

export const HeaderInput: React.FC<{
  value?;
  onChange?;
  style?: CSSProperties;
}> = ({ value = [], style, onChange }) => {
  const [name = '', values = []] = value;
  return (
    <div style={style}>
      <Input
        type="text"
        value={name}
        onChange={(v) => onChange([v.target.value, values])}
        style={{ width: '40%' }}
        placeholder="Authorization"
      />
      <Input
        type="text"
        value={values}
        onChange={(v) => onChange([name, v.target.value])}
        style={{ width: '60%' }}
        placeholder="Basic ABCD"
      />
    </div>
  );
};

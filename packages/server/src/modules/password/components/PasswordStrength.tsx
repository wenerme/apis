import React from 'react';
import { PasswordSiteNote } from 'src/modules/password/components/PasswordSiteNote';
import { Input, Spin } from 'antd';
import { ZxcvbnDescription } from 'src/modules/password';

export const PasswordStrength: React.FC<{ loading?; value?; data?; onChange? }> = ({
  loading,
  value,
  data,
  onChange,
}) => {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <Input.Search
        disabled={loading}
        loading={loading}
        placeholder="检测密码"
        value={value}
        onChange={(v) => onChange?.(v.target.value)}
      />
      <Spin spinning={loading} delay={120}>
        <h4>检测结果</h4>
        {data && <ZxcvbnDescription password={value} result={data} />}
      </Spin>

      <div>
        <h4>结果内容</h4>
        <div>
          <pre>{JSON.stringify(data, null, '  ')}</pre>
        </div>
      </div>

      <PasswordSiteNote />
    </div>
  );
};

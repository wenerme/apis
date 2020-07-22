import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'antd';
import zxcvbn from 'zxcvbn';
import { buildZxcvbnLink } from 'src/servers/routers/api/password/buildZxcvbnLink';
import { ZxcvbnDescription } from './ZxcvbnDescription';
import { SuggestPassword } from 'src/modules/password/components/SuggestPassword';
import { PasswordSiteNote } from 'src/modules/password/components/PasswordSiteNote';

export const PasswordStrengthPageContent: React.FC<{ initialValue? }> = ({ initialValue = '12345678' }) => {
  const lastInitial = useRef();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    if (lastInitial.current) {
      if (lastInitial.current !== initialValue) {
        setValue(initialValue);
      }
    }
    lastInitial.current = initialValue;
  }, [initialValue]);

  const result = zxcvbn(value);
  return (
    <div>
      <div style={{ marginTop: 18 }}>
        <Input placeholder="检测密码" value={value || initialValue} onChange={(v) => setValue(v.target.value)} />

        <div style={{ marginTop: 18 }}>
          <h4>检测结果</h4>
          <ZxcvbnDescription password={value} result={result} />
        </div>

        <SuggestPassword seed={initialValue} />

        <div style={{ marginTop: 18 }}>
          <h4>接口请求</h4>
          <div>
            <a href={buildZxcvbnLink({ password: value })} target="_blank" rel="noopener noreferrer">
              {buildZxcvbnLink({ password: value })}
            </a>
          </div>
          <div>
            <pre>{JSON.stringify(result, null, '  ')}</pre>
          </div>
        </div>
      </div>
      <PasswordSiteNote />
    </div>
  );
};

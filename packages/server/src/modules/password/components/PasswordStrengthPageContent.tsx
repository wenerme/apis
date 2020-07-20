import React, { useEffect, useRef, useState } from 'react';
import { Alert, Input } from 'antd';
import Link from 'next/link';
import { createRandom } from '@wener/utils';
import { createPasswordGenerator } from '../libs/generates';
import zxcvbn from 'zxcvbn';
import { buildZxcvbnLink } from 'src/servers/routers/api/password/buildZxcvbnLink';
import { ZxcvbnDescription } from './ZxcvbnDescription';

function suggest(seed) {
  const random = createRandom({ seed });
  const generator = createPasswordGenerator({
    random,
    upper: false,
    symbol: false,
  });

  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    result.push(generator());
  }
  return result;
}

const SuggestPassword: React.FC<{ seed }> = ({ seed }) => {
  const suggests = React.useMemo(() => suggest(seed), [seed]);
  return (
    <div style={{ marginTop: 18 }}>
      <h4>检测</h4>
      <div>
        {suggests.map((v) => (
          <Link key={v} href="/password/strength/[password]" as={`/password/strength/${v}.html`}>
            <a href={`/password/strength/${v}.html`} className="ant-btn ant-btn-link">
              {v}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

const SiteNote = () => (
  <div style={{ marginTop: 18 }}>
    <Alert
      type="info"
      showIcon
      message={
        <div>
          <a href="https://en.wikipedia.org/wiki/Password_strength" target="_blank" rel="noopener noreferrer">
            密码强度
          </a>
          算法使用
          <a
            href="https://blogs.dropbox.com/tech/2012/04/zxcvbn-realistic-password-strength-estimation/"
            target="_blank"
            rel="noopener noreferrer"
          >
            zxcvbn
          </a>{' '}
          。
        </div>
      }
    />
  </div>
);

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
      <SiteNote />
    </div>
  );
};

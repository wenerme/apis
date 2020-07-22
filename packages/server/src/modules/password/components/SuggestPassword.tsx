import React from 'react';
import Link from 'next/link';
import { createRandom } from '@wener/utils';
import { createPasswordGenerator } from '../libs/generates';

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

export const SuggestPassword: React.FC<{ seed }> = ({ seed }) => {
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

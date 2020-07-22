import React from 'react';
import Link from 'next/link';
import { createRandom } from '@wener/utils';

function suggestNumbers(seed) {
  const pre = [
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    141,
    145,
    146,
    147,
    149,
    150,
    151,
    152,
    153,
    155,
    156,
    157,
    158,
    159,
    165,
    166,
    167,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    191,
    198,
    199,
  ];
  // 当前页面结果不变
  const random = createRandom({ seed });

  // const random = () => Math.random();
  const result: string[] = [];
  for (let i = 0; i < 20; i++) {
    result.push(`${pre[Math.floor(random() * pre.length)]}${(Math.floor(random() * 999999999) + '').padStart(9, '0')}`);
  }
  return result;
}

export const SuggestSearch: React.FC<{ seed }> = ({ seed }) => {
  const numbers = React.useMemo(() => suggestNumbers(seed), [seed]);
  return (
    <div>
      <h4>查询</h4>
      <div>
        {numbers.map((v) => (
          <Link key={v} href="/phone/attribution/[num]" as={`/phone/attribution/${v}.html`}>
            <a href={`/phone/attribution/${v}.html`} className="ant-btn ant-btn-link">
              {v}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

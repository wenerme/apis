import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { Alert, Descriptions, Input, PageHeader } from 'antd';
import Link from 'next/link';
import { createRandom } from 'utils/random';
import { createPasswordGenerator } from 'modules/password/libs/generates';
import { API } from 'apis/api';
import zxcvbn from 'zxcvbn';
import { KeyOutlined } from '@ant-design/icons';

const ZxcvbnDescription: React.FC<{ password; result? }> = ({ password, result }) => {
  const { score, guesses, guesses_log10, feedback, crack_times_display: times } = result;
  /*
  "sequence": [
    {
      "pattern": "dictionary",
      "i": 0,
      "j": 4,
      "token": "wener",
      "matched_word": "renew",
      "rank": 5472,
      "dictionary_name": "us_tv_and_film",
      "reversed": true,
      "l33t": false,
      "base_guesses": 5472,
      "uppercase_variations": 1,
      "l33t_variations": 1,
      "guesses": 10944,
      "guesses_log10": 4.039176084376041
    }
  ],
  "calc_time": 1,
   */
  const scoreColors = ['#D50000', '#F44336', '#FF5722', '#FFC107', '#43A047'];
  const crackTimes = [
    {
      label: '100 个每小时',
      speedTip: '被限流的在线破解速度',
      value: times.online_throttling_100_per_hour,
    },
    {
      label: '10 个每秒',
      speedTip: '未被限流的在线破解速度',
      value: times.online_no_throttling_10_per_second,
    },
    {
      label: '10,000 个每秒',
      speedTip: '离线破解, 较慢的算法, 多核',
      value: times.offline_slow_hashing_1e4_per_second,
    },
    {
      label: '10亿 个每秒',
      speedTip: '离线破解, 较快的算法, 多核',
      value: times.offline_fast_hashing_1e10_per_second,
    },
  ];
  return (
    <div>
      <Descriptions bordered>
        <Descriptions.Item label={'密码'}>{password}</Descriptions.Item>
        <Descriptions.Item label={'强度分数'}>
          <span style={{ color: scoreColors[score] }}>{score}</span>/4
        </Descriptions.Item>
        <Descriptions.Item label={'猜测次数'}>
          <div>{guesses}</div>
          <div>
            {guesses_log10.toFixed(6)} <small>LOG10</small>
          </div>
        </Descriptions.Item>
        <Descriptions.Item label={'建议'} span={3}>
          {feedback.warning && <div style={{ color: scoreColors[2] }}>{feedback.warning}</div>}
          <ul>
            {feedback.suggestions.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </Descriptions.Item>
        <Descriptions.Item label={'破解时间'} span={3}>
          {crackTimes.map(({ label, speedTip, value }) => (
            <div key={label}>
              <span style={{ fontWeight: 'bold' }}>{label}:</span>
              <span style={{ fontSize: '1.2rem', padding: '0 8px' }}>{value}</span> ({speedTip})
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

function suggest(seed) {
  const random = createRandom({ seed });
  const generator = createPasswordGenerator({
    random,
    upper: false,
    symbol: false,
  });

  const result = [];
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

const PasswordStrengthPageContent: React.FC<{ initialValue? }> = ({ initialValue = '12345678' }) => {
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
          <a href={`${API.origin}/api/password/zxcvbn/${value}`} target="_blank" rel="noopener noreferrer">
            {`${API.origin}/api/password/zxcvbn/${value}`}
          </a>
        </div>
        <div>
          <pre>{JSON.stringify(result, null, '  ')}</pre>
        </div>
      </div>
    </div>
  );
};

export const PasswordStrengthPage: React.FC<{ initialValue? }> = ({ initialValue }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Zxcvbn 密码强度检测</title>
      </Head>
      <PageLayout>
        <PageContent>
          <PageHeader
            title={
              <div>
                <KeyOutlined style={{ marginRight: 8 }} />
                Zxcvbn 密码强度检测
              </div>
            }
            backIcon={false}
          />

          <PasswordStrengthPageContent initialValue={initialValue} />

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
        </PageContent>
      </PageLayout>
    </React.Fragment>
  );
};

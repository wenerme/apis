import { Descriptions } from 'antd';
import React from 'react';

export const ZxcvbnDescription: React.FC<{ password; result? }> = ({ password, result }) => {
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

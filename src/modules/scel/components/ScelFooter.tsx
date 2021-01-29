import { ScelDictRecommend } from './ScelDictRecommend';
import React from 'react';
import { Alert } from 'antd';

export const ScelFooter: React.FC = () => {
  return (
    <div>
      <div style={{ marginTop: 18 }}>
        <ScelDictRecommend />
      </div>

      <div style={{ marginTop: 18 }}>
        <Alert
          type="info"
          showIcon
          message={
            <div>
              数据来源于{' '}
              <a href="https://pinyin.sogou.com/dict/" target="_blank" rel="noopener noreferrer">
                搜狗官方词库
              </a>
              ，仅用于分析学习。
            </div>
          }
        />
      </div>
    </div>
  );
};

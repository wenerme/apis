import { Alert } from 'antd';
import React from 'react';

export const PasswordSiteNote = () => (
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

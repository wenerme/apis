import { ErrorListProps } from '@rjsf/core';
import React from 'react';
import { Alert } from 'antd';

export const ErrorList: React.FC<ErrorListProps> = ({
  // errorSchema,
  errors,
  // formContext,
  // schema,
  // uiSchema,
}) => (
  <div>
    {/*<ul>
      {errors.map((error, index) => (
        <li key={index} style={{ margin: '3px' }}>
          {error.stack}
        </li>
      ))}
    </ul>*/}
    {errors.map((error, index) => (
      <Alert key={index} message={error.stack} type="error" showIcon />
    ))}
  </div>
);

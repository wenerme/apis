import { ErrorListProps } from '@rjsf/core';
import React from 'react';

export const ErrorList: React.FC<ErrorListProps> = ({
  // errorSchema,
  errors,
  // formContext,
  // schema,
  // uiSchema,
}) => (
  <div>
    <ul>
      {errors.map((error, index) => (
        <li key={index} style={{ margin: '3px' }}>
          {error.stack}
        </li>
      ))}
    </ul>
  </div>
);

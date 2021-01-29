import { FormFieldProps } from './builder';
import React from 'react';
import { Trans } from 'react-i18next';

export function withLabelTrans(item: FormFieldProps) {
  if (typeof item.label === 'string') {
    item.label = <Trans>{item.label}</Trans>;
  }
  return item;
}

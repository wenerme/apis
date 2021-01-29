import { FormFieldProps } from 'src/libs/antds/form/builder';
import React from 'react';
import { TagsField } from '../../entity/KongEntityTable';
import { withProps } from 'src/ui';
import { EntityForm } from '../../entity/EntityForm';

const HashTypes = ['none', 'consumer', 'ip', 'header', 'cookie'];

const fields: FormFieldProps[] = [
  { key: 'name', label: '主机名', required: true },
  { key: 'host_header', label: 'Host Header' },
  {
    key: 'algorithm',
    label: '算法',
    required: true,
    defaultValue: 'round-robin',
    widget: 'select',
    options: ['consistent-hashing', 'least-connections', 'round-robin'],
  },
  {
    key: 'hash_on',
    label: 'Hash',
    required: true,
    defaultValue: 'none',
    widget: 'select',
    options: HashTypes,
  },
  {
    key: 'hash_fallback',
    label: 'Hash Fallback',
    required: true,
    defaultValue: 'none',
    widget: 'select',
    options: HashTypes,
  },

  { key: 'hash_on_header', label: 'Hash Header' },
  { key: 'hash_on_cookie_path', label: 'Hash Cookie Path' },
  { key: 'hash_fallback_header', label: 'Hash Fallback Header' },

  {
    key: 'slots',
    label: 'Hash 槽',
    widget: 'slider',
    widgetProps: { min: 10, max: 65536 },
    defaultValue: 10000,
  },

  // TODO Health checks

  TagsField,
];
export const UpstreamForm = withProps(EntityForm, { fields });

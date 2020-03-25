import React from 'react';
import { TagsField } from '../../entity/KongEntityTable';
import { withProps } from '../../../../../libs/reacts/libs/withProps';
import { EntityForm } from '../../entity/EntityForm';

export const ConsumerForm = withProps(EntityForm, {
  fields: [{ key: 'username', label: '用户名' }, { key: 'custom_id', label: '自定义' }, TagsField],
});

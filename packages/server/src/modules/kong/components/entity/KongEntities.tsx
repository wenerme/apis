import { OperationColumn, TagsField } from './KongEntityTable';
import { renderTags, renderTimeStamp } from '../renders';
import { normalizeColumns } from '../../../../libs/antds/table/normal';
import { mapValues } from 'lodash';

export const KongEntities: Record<string, { attributes; fields?; columns? } & any> = {
  ConsumerBasicAuth: {
    label: 'Basic Auth Credential',
    attributes: [
      { key: 'username', label: '用户名' },
      { key: 'password', label: '密码', widget: 'password', view: false },
    ],
  },
  ConsumerHmacAuth: {
    label: 'Hmac Auth Credential',
    attributes: [
      { key: 'username', label: '用户名' },
      { key: 'secret', label: '密码', widget: 'password' },
    ],
  },
  ConsumerOAuth2: {
    label: 'OAuth2 Credential',
    attributes: [
      { key: 'name', label: '名字' },
      { key: 'client_id', label: 'Client ID' },
      { key: 'client_secret', label: 'Client Secret' },
      {
        key: 'redirect_uris',
        label: 'Redirect Uris',
        widget: 'select',
        widgetProps: { mode: 'tags' },
      },
    ],
  },
  ConsumerKeyAuth: {
    label: 'Key Auth Credential',
    attributes: [
      { key: 'key', label: 'Key' },
      { key: 'ttl', label: 'TTL', widget: 'number' },
    ],
  },
  ConsumerAcl: {
    label: 'ACL Group',
    attributes: [{ key: 'group', label: '分组' }],
  },
  ConsumerJwt: {
    label: 'JWT Credential',
    attributes: [
      { key: 'key', label: 'Key' },
      { key: 'secret', label: 'Secret' },
      { key: 'algorithm', label: 'Algorithm' },
      { key: 'rsa_public_key', label: 'RSA Public Key', widget: 'textarea' },
    ],
  },

  UpstreamTarget: {
    label: 'Upstream Target',
    attributes: [
      { key: 'target', label: 'Target', width: 300 },
      {
        key: 'weight',
        label: '权重',
        widget: 'number',
        widgetProps: { defaultValue: 2 },
      },
    ],
  },
};

Object.entries(KongEntities).forEach(([k, v]) => (v.name = k));
mapValues(KongEntities, buildEntity);

export function buildEntity(entity) {
  const { attributes } = entity;

  // form
  entity.fields = attributes.map(({ key, label, widget, widgetProps }) => {
    return { key, label, widget, widgetProps };
  });
  if (!entity.fields.find((v) => v.key === 'tags')) {
    entity.fields.push(TagsField);
  }

  // table
  entity.columns = attributes
    .filter(({ view }) => (typeof view === 'boolean' ? view : true))
    .map(({ key, label, render, dataIndex, title, width }) => {
      return {
        key,
        render,
        dataIndex: dataIndex || key.split('.'),
        title: title || label,
        width: width || 100,
      };
    });
  if (!entity.columns.find((v) => v.key === 'id')) {
    entity.columns.unshift({ dataIndex: 'id', title: 'ID', width: 300 });
  }

  entity.columns = entity.columns.concat(
    { dataIndex: 'tags', title: '标签', width: 120, render: renderTags },
    {
      dataIndex: 'created_at',
      title: '创建时间',
      width: 160,
      render: renderTimeStamp,
    },
    OperationColumn
  );
  entity.columns = normalizeColumns(entity.columns);

  return entity;
}

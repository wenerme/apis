import React, { useReducer, useState } from 'react';
import { useAsyncEffect } from 'src/ui';
import { getKongService } from '../../../apis/client';
import { Button, Table, Tag } from 'antd';
import { normalizeColumns } from 'src/libs/antds/table/normal';
import { ReloadOutlined } from '@ant-design/icons/lib';
import { Trans, useTranslation } from 'react-i18next';
import { groupBy, mapValues } from 'lodash';

export const KongTagList: React.FC = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);
  const [count, doReload] = useReducer((s) => s + 1, 0);
  useAsyncEffect(async () => {
    setLoading(true);
    try {
      const { data } = await getKongService().listAllTags();
      // TODO Pagination

      const mergeTags = (entity) => {
        if (Array.isArray(entity)) {
          return entity.reduce((o, v) => {
            if (!o) {
              o = v;
              o.tags = [];
            }
            o.tags.push(v.tag);
            return o;
          }, null);
        }

        entity.tags = [entity.tag];
        return entity;
      };
      const values = Object.values(mapValues(groupBy(data, 'entity_id'), mergeTags));
      setTags(values);
    } finally {
      setLoading(false);
    }
  }, [count]);

  const { t } = useTranslation();

  return (
    <div>
      <Table
        className="no-wrap"
        rowKey={'id'}
        columns={normalizeColumns([
          { key: 'entity_name', title: t('名字') },
          { key: 'entity_id', title: 'ID' },
          {
            key: 'tags',
            title: t('标签'),
            render: (tags) => (
              <div style={{ whiteSpace: 'normal' }}>
                {(tags || []).map((v, i) => (
                  <Tag onClick={() => setCurrentTag(v)} key={i}>
                    {v}
                  </Tag>
                ))}
              </div>
            ),
          },
        ])}
        dataSource={tags.filter((v) => !currentTag || v.tags.includes(currentTag))}
        loading={loading}
        title={() => {
          return (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2>
                <Trans>标签</Trans>
              </h2>
              <div>
                {currentTag && (
                  <Tag closable onClose={() => setCurrentTag(null)}>
                    {currentTag}
                  </Tag>
                )}
                <Button.Group>
                  <Button onClick={() => doReload()} icon={<ReloadOutlined />}>
                    {t('刷新')}
                  </Button>
                </Button.Group>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

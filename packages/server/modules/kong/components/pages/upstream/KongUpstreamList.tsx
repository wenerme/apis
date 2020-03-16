import React, {useMemo} from 'react'
import {normalizeColumns} from 'libs/antds/table/normal';
import {createEntityColumns, KongEntityTable} from 'modules/kong/components/entity/KongEntityTable';
import {KongUpstreamEntity} from 'modules/kong/apis/types';
import {UpstreamForm} from 'modules/kong/components/pages/upstream/UpstreamForm';
import {UpstreamViewer} from 'modules/kong/components/pages/upstream/UpstreamViewer';

export const KongUpstreamList: React.FC = () => {
  const columns = useMemo(() => normalizeColumns<KongUpstreamEntity>(createEntityColumns([
    {key: 'algorithm', title: '算法', width: 120},
    {key: 'hash_on', title: 'Hash', width: 120},
    {key: 'hash_fallback', title: 'Hash Fallback', width: 120},
    {key: 'hash_on_cookie_path', title: 'Hash Cookie 路径', width: 180},
  ])), []);
  return (
    <KongEntityTable
      label='上游'
      name='Upstream'
      columns={columns}
      editor={UpstreamForm}
      viewer={UpstreamViewer}
    />
  )
};


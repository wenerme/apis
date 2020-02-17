import React, {useEffect, useState} from 'react';
import {createScelDataService} from 'libs/sougou/dict/ScelDataService';
import Link from 'next/link';

export const ScelDictRecommend: React.FC = () => {
  const service = createScelDataService();
  let recommends = service.getRandomRecommends();
  if (!Array.isArray(recommends)) {
    recommends = [];
  }
  const [state, setState] = useState(recommends);
  useEffect(() => {
    if (!state.length) {
      Promise
        .resolve(service.getRandomRecommends())
        .then(v => setState(v))
    }
  }, []);
  return (
    <div>
      <h3>推荐词库</h3>
      <div>
        <div>
          {recommends.map(({id, name, version}) => (
            <Link key={id} href="/scel/dict/[dictId]/v/[dictVersion]" as={`/scel/dict/${id}/v/${version}`}>
              <a href={`/scel/dict/${id}/v/${version}.html`} className="ant-btn ant-btn-link">{name}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
};

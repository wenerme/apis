import { PageLayout } from '../../components/layout/PageLayout/PageLayout';
import { PageContent } from '../../components/layout/PageLayout/PageContent';
import { Descriptions, Input, PageHeader } from 'antd';
import React, { useEffect, useState } from 'react';
import { createScelDataService, ScelIndexRecord } from '../../libs/sougou/dict/ScelDataService';
import { NextPage } from 'next';
import { AutoSizer, List } from 'react-virtualized';
import moment from 'moment';
import Link from 'next/link';
// fixme
// import 'react-virtualized/styles.css';
import { ScelFooter } from '../../modules/scel/components/ScelFooter';
import { BookOutlined } from '@ant-design/icons';
import { getGlobalThis } from '@wener/utils/src/isomorphics/getGlobalThis';

const ScelIndexList: React.FC<{ index: ScelIndexRecord[] }> = ({ index }) => {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          height={height}
          width={width}
          rowCount={index.length}
          rowHeight={32}
          rowRenderer={({ index: i, key, style }) => {
            return (
              <div key={key} style={style}>
                <ScelIndexItem item={index[i]} />
              </div>
            );
          }}
        />
      )}
    </AutoSizer>
  );
};

const ScelIndex: React.FC<{ index: ScelIndexRecord[] }> = ({ index }) => {
  const [list, setList] = useState(index);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!search) {
      setList(index);
      return;
    }

    setList(index.filter((v) => v.name.includes(search) || v.createdBy.includes(search) || v.type.includes(search)));
  }, [search]);

  return (
    <div style={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
      <h2>词库索引</h2>
      <div style={{ margin: '8px 0' }}>
        <Input.Search placeholder="搜索 标题、类型、创建人" allowClear onSearch={setSearch} />
        <Descriptions>
          <Descriptions.Item label="总数">{index.length}</Descriptions.Item>
          <Descriptions.Item label="结果数">{list.length}</Descriptions.Item>
        </Descriptions>
      </div>
      <div style={{ minHeight: 320, flex: 1 }}>
        <ScelIndexList index={list} />
      </div>
    </div>
  );
};

const ScelIndexItem: React.FC<{ item: ScelIndexRecord }> = ({
                                                              item: { id, name, count, size, type, version, updatedAt, createdBy }
                                                            }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <span style={{ marginRight: 24, minWidth: 120, display: 'inline-block' }}>{name}</span>
        {type && <small style={{ marginRight: 12 }}>{type}</small>}
        <small style={{ marginRight: 12 }}>{count} 词条</small>
        <small style={{ marginRight: 12 }}>{(size / 1000).toFixed(2)}k</small>
        {createdBy && <small style={{ marginRight: 12 }}>作者: {createdBy}</small>}

        <span>
          <Link href="/scel/dict/[dictId]/v/[dictVersion]" as={`/scel/dict/${id}/v/${version}`}>
            <a href={`/scel/dict/${id}/v/${version}.html`}>查看详情</a>
          </Link>
        </span>
      </div>

      <div style={{ minWidth: 200 }}>
        {updatedAt && (
          <span style={{ marginRight: 12 }} title={moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
            更新 {moment(updatedAt).fromNow()}
          </span>
        )}
        <small style={{ marginRight: 12 }}>版本 v{version}</small>
      </div>
    </div>
  );
};

const Page: NextPage<{ index?: ScelIndexRecord[]; raw? }> = ({ index, raw }) => {
  const service = createScelDataService();
  index = index ?? service.parseScelIndex(raw);
  getGlobalThis()['ScelIndex'] = index;
  return (
    <PageLayout title="搜狗词库列表" description="搜狗词库 SCEL 解析索引查询" keywords="搜狗,词库,SCEl,解析,接口,API,查询">
      <PageContent style={{ display: 'flex', flexFlow: 'column' }}>
        <PageHeader
          title={
            <div>
              <BookOutlined style={{ marginRight: 8 }} />
              词库列表
            </div>
          }
          backIcon={false}
        />

        <ScelIndex index={index} />

        <ScelFooter />
      </PageContent>
    </PageLayout>
  );
};

//getStaticProps
Page.getInitialProps = async () => {
  const service = createScelDataService();
  // reduce page props data size
  return { raw: await service.getRawIndex() };
};

// export async function getStaticProps() {
//   const service = createScelDataService();
//   // reduce page props data size
//   return {props: {raw: await service.getRawIndex()}}
// }

export default Page;

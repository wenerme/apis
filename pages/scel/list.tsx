import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Icon, PageHeader} from 'antd';
import React from 'react';
import Head from 'next/head';
import {createScelDataService, ScelIndexRecord} from 'libs/sougou/dict/ScelDataService';
import {NextPage} from 'next';
import {AutoSizer, List} from 'react-virtualized';
import {getGlobalThis} from 'utils/utils';
import moment from 'moment';
import Link from 'next/link';
import 'react-virtualized/styles.css';
import {ScelFooter} from 'modules/scel/components/ScelFooter';

const ScelIndexList: React.FC<{ index: ScelIndexRecord[] }> = ({index}) => {
  return (
    <AutoSizer>
      {({width, height}) => (
        <List
          height={height}
          width={width}
          rowCount={index.length}
          rowHeight={32}
          rowRenderer={({index: i, key, style}) => {
            return (
              <div key={key} style={style}>
                <ScelIndexItem item={index[i]} />
              </div>
            )
          }}
        />
      )}
    </AutoSizer>
  )
};
const ScelIndexItem: React.FC<{ item: ScelIndexRecord }> = ({item: {id, name, count, size, type, version, updatedAt}}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <span style={{marginRight: 12}}>{name}</span>
        <small style={{marginRight: 12}}>{type}</small>
        <small style={{marginRight: 12}}>{count} 词条</small>
        <small style={{marginRight: 12}}>{(size / 1000).toFixed(2)}k</small>

        <span>
          <Link href="/scel/dict/[dictId]/v/[dictVersion]" as={`/scel/dict/${id}/v/${version}`}>
            <a href={`/scel/dict/${id}/v/${version}.html`}>查看详情</a>
          </Link>
        </span>
      </div>

      <div style={{minWidth: 200}}>
        {
          updatedAt && (
            <span
              style={{marginRight: 12}}
              title={moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
            >更新 {moment(updatedAt).fromNow()}</span>
          )
        }
        <small style={{marginRight: 12}}>版本 v{version}</small>

      </div>

    </div>
  )
};

const Page: NextPage<{ index?: ScelIndexRecord[], raw? }> = ({index, raw}) => {
  const service = createScelDataService();
  index = index ?? service.parseScelIndex(raw);
  getGlobalThis()['ScelIndex'] = index;
  return (
    <PageLayout>
      <PageContent style={{display: 'flex', flexFlow: 'column'}}>
        <Head>
          <title>词库列表</title>
        </Head>
        <PageHeader
          title={
            <div>
              <Icon type="book" style={{marginRight: 8}} />
              词库列表
            </div>
          }
          backIcon={false}
        />

        <div style={{flex: 1, display: 'flex', flexFlow: 'column'}}>
          <h2>词库索引</h2>
          <div style={{minHeight: 320, flex: 1}}>
            <ScelIndexList index={index} />
          </div>
        </div>

        <ScelFooter />
      </PageContent>
    </PageLayout>
  )
};

//getStaticProps
// Page.getInitialProps = async () => {
//   const service = createScelDataService();
//   // reduce page props data size
//   return {raw: await service.getRawIndex()}
// };

export async function getStaticProps() {
  const service = createScelDataService();
  // reduce page props data size
  return {props: {raw: await service.getRawIndex()}}
}

export const unstable_getStaticProps = getStaticProps;

export default Page

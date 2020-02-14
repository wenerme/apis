import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Alert, Icon, PageHeader} from 'antd';
import React from 'react';
import Head from 'next/head';
import {createScelDataService, ScelIndexRecord} from 'libs/sougou/dict/ScelDataService';
import {NextPage} from 'next';
import {AutoSizer, List} from 'react-virtualized';
import {getGlobalThis} from 'utils/utils';
import moment from 'moment';
import Link from 'next/link';
import 'react-virtualized/styles.css';

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
const ScelIndexItem: React.FC<{ item: ScelIndexRecord }> = ({item: {id, name, count, type, version, updatedAt}}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        <span style={{marginRight: 12}}>{name}</span>
        <small style={{marginRight: 12}}>{type}</small>
        <small style={{marginRight: 12}}>{count} 词条</small>

        <span>
          <Link href="/scel/dict/[dictId]/v/[dictVersion]" as={`/scel/dict/${id}/v/${version}`}>查看详情</Link>
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
}

const Page: NextPage<{ index: ScelIndexRecord[] }> = ({index}) => {
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
          <h3>词库索引</h3>
          <div style={{minHeight: 320, flex: 1}}>
            <ScelIndexList index={index} />
          </div>
        </div>

        <div style={{marginTop: 18}}>
          <Alert
            type="info"
            showIcon
            message={(
              <div>
                数据来源于 <a href="https://pinyin.sogou.com/dict/" target="_blank">搜狗官方词库</a>，仅用于分析学习。
              </div>
            )}
          />
        </div>
      </PageContent>
    </PageLayout>
  )
}

Page.getInitialProps = async () => {
  const service = createScelDataService();
  return {index: await service.getIndex()}
};

export default Page

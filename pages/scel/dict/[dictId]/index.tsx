import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Alert, Button, Descriptions, Icon, PageHeader} from 'antd';
import React, {useState} from 'react';
import Head from 'next/head';
import {NextPage} from 'next';
import {createScelDataService, ScelMetadata} from 'libs/sougou/dict/ScelDataService';
import moment from 'moment';
import {ScelContentList} from 'modules/scel/components/ScelContentList';
import unfetch from 'isomorphic-unfetch';
import {Buffer} from 'buffer/'
import {enrichContent, parseScelContent, parseScelHeader} from 'libs/formats/scel/parser';

const ScelMetaDescription: React.FC<{ metadata: ScelMetadata }> = ({metadata}) => {
  const {name, type, description, example, count, size, version, updatedAt} = metadata

  return (
    <Descriptions size="small" column={5}>
      <Descriptions.Item span={4} label="词库">{name}</Descriptions.Item>
      <Descriptions.Item span={1} label="类型">{type}</Descriptions.Item>
      <Descriptions.Item span={5} label="说明">{description}</Descriptions.Item>
      <Descriptions.Item span={5} label="例子">{example}</Descriptions.Item>
      <Descriptions.Item span={2} label="更新日期">
        {updatedAt ? (
          <div>
            {moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
          </div>) : 'N/A'
        }
      </Descriptions.Item>
      <Descriptions.Item label="版本">{version}</Descriptions.Item>
      <Descriptions.Item label="条目">{count}</Descriptions.Item>
      <Descriptions.Item label="文件大小">{(size / 1024).toFixed(2)}k</Descriptions.Item>
    </Descriptions>
  )
};

const Page: NextPage<{ dictId, dictVersion?, metadata: ScelMetadata }> = ({dictId, dictVersion, metadata}) => {
  const {name, updatedAt, type, version, size} = metadata;
  const [loading, setLoading] = useState(false)
  const [scel, setScel] = useState({content: null, header: null});
  const service = createScelDataService();

  const loadScel = async () => {
    setLoading(true)
    try {
      const url = service.getScelUrl({id: dictId, version: dictVersion})
      const buffer = Buffer.from(await unfetch(url).then(v => v.arrayBuffer()) as any)

      const content = parseScelContent(buffer);
      const header = parseScelHeader(buffer);
      enrichContent(content);

      setScel({content, header})
    } finally {
      setLoading(false)
    }
  };

  return (
    <PageLayout>
      <PageContent style={{display: 'flex', flexFlow: 'column'}}>
        <Head>
          <title>搜狗词库 {type} {name} ID {dictVersion} 版本{dictVersion}</title>
        </Head>
        <PageHeader
          title={
            <div>
              <Icon type="book" style={{marginRight: 8}} />
              {name}
            </div>
          }
          subTitle={
            <div>
              <span style={{marginLeft: 12}}>{dictVersion ? `v${dictVersion}` : ''}</span>
              {updatedAt && (
                <span
                  style={{marginLeft: 12}}
                  title={moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                >更新于 {moment(updatedAt).fromNow()}</span>
              )}
            </div>
          }
          extra={
            <div>
              <Button
                target="_blank"
                download={`${name}-v${version}.scel`}
                href={service.getScelUrl({id: dictId, version: dictVersion})}
                type="primary"
                icon="download"
              >
                下载 {name}.scel <small style={{marginLeft: 8}}>{(size / 1000).toFixed(2)}k</small>
              </Button>
            </div>
          }
          backIcon={false}
        />

        <div>
          <h3>基础信息</h3>
          <ScelMetaDescription metadata={metadata} />
        </div>

        <div style={{flex: 1, display: 'flex', flexFlow: 'column'}}>
          <h3>词库内容</h3>
          <div style={{minHeight: 320, flex: 1}}>
            {scel.content && <ScelContentList content={scel.content} />}
            {!scel.content && <Button loading={loading} onClick={loadScel}>加载词库</Button>}
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
};

Page.getInitialProps = async ({query: {dictId, dictVersion}}) => {
  if (dictVersion) {
    dictVersion = (dictVersion + '').replace('.html', '');
  }

  const service = createScelDataService();
  const metadata = await service.getMetadata({id: dictId, version: dictVersion});
  return {dictId, dictVersion, metadata}
}

export default Page

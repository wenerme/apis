import React, { useEffect, useRef, useState } from 'react';
import { createScelDataService, ScelMetadata } from 'libs/sougou/dict/ScelDataService';
import { Button, Descriptions, PageHeader } from 'antd';
import moment from 'moment';
import unfetch from 'isomorphic-unfetch';
import { enrichContent, parseScelContent, parseScelHeader } from 'libs/formats/scel/parser';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { ScelContentList } from 'modules/scel/components/ScelContentList';
import { Buffer } from 'buffer/';
import { ScelFooter } from 'modules/scel/components/ScelFooter';
import { fetchProgress } from 'utils/fetch-progress';
import { BookOutlined, DownloadOutlined } from '@ant-design/icons';

const ScelMetaDescription: React.FC<{ metadata: ScelMetadata }> = ({ metadata }) => {
  const { name, type, description, example, count, size, version, updatedAt } = metadata;

  return (
    <Descriptions size="small" column={5}>
      <Descriptions.Item span={4} label="词库">
        {name}
      </Descriptions.Item>
      <Descriptions.Item span={1} label="类型">
        {type}
      </Descriptions.Item>
      <Descriptions.Item span={5} label="说明">
        {description}
      </Descriptions.Item>
      <Descriptions.Item span={5} label="例子">
        {example}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="更新日期">
        {updatedAt ? <div>{moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}</div> : 'N/A'}
      </Descriptions.Item>
      <Descriptions.Item label="版本">{version}</Descriptions.Item>
      <Descriptions.Item label="条目">{count}</Descriptions.Item>
      <Descriptions.Item label="文件大小">{(size / 1024).toFixed(2)}k</Descriptions.Item>
    </Descriptions>
  );
};

export const ScelDictPage: React.FC<{
  dictId;
  dictVersion?;
  metadata?: ScelMetadata;
}> = ({ dictId, dictVersion, metadata }) => {
  const { name, updatedAt, type, version, size, createdBy, example, description } = metadata;
  const [loading, setLoading] = useState(false);
  const [scel, setScel] = useState({ content: null, header: null });
  const service = createScelDataService();
  const abortRef = useRef<AbortController>();

  const [loadInfo, setLoadInfo] = useState('');

  useEffect(() => {
    abortRef.current?.abort();
    if (loading) {
      setLoading(false);
    }
    if (loadInfo) {
      setLoadInfo('');
    }
    if (scel.content) {
      setScel({ content: null, header: null });
    }
  }, [dictId]);

  const loadScel = async () => {
    setLoading(true);
    setLoadInfo('...');

    try {
      let signal: AbortSignal = null;
      try {
        abortRef.current = new AbortController();
        signal = abortRef.current.signal;
      } catch (e) {}
      const url = service.getScelUrl({ id: dictId, version: dictVersion });
      const buffer = Buffer.from(
        (await unfetch(url, { signal })
          .then(
            fetchProgress({
              onProgress({ percentage, transferred, total, speed }) {
                setLoadInfo(`${percentage.toFixed(2)}% - ${transferred}/${total} - ${Math.round(speed / 5)}/s`);
              },
            })
          )
          .then((v) => v.arrayBuffer())) as any
      );

      const content = parseScelContent(buffer as any);
      const header = parseScelHeader(buffer as any);
      enrichContent(content);

      setScel({ content, header });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <PageContent style={{ display: 'flex', flexFlow: 'column' }}>
        <Head>
          <title>
            搜狗词库 {type} {name} ID {dictVersion} 版本{dictVersion} 作者 {createdBy}
          </title>

          <meta
            name="keywords"
            content={`搜狗,词库,SCEl,解析,接口,API,查询,${createdBy},${name},${example.replace(/[\s,，]+/, ',')}`}
          />
          <meta name="author" content={createdBy ?? 'wener'} />

          <meta
            name="description"
            content={`搜狗词库 scel 解析 ${type} ${name} ${createdBy} ${example} ${description}`}
          />
          <meta name="og:title" property="og:title" content={`${name} - ${type} - ${createdBy} - 搜狗词库`} />
          <meta
            name="og:description"
            property="og:description"
            content={`搜狗词库 ${name} - ${type}: ${description} 示例 ${example}`}
          />
        </Head>
        <PageHeader
          title={
            <div>
              <BookOutlined style={{ marginRight: 8 }} />
              {name}
            </div>
          }
          subTitle={
            <div>
              <span style={{ marginLeft: 12 }}>{dictVersion ? `v${dictVersion}` : ''}</span>
              {updatedAt && (
                <span style={{ marginLeft: 12 }} title={moment(updatedAt).format('YYYY-MM-DD HH:mm:ss')}>
                  更新于 {moment(updatedAt).fromNow()}
                </span>
              )}
            </div>
          }
          extra={
            <div>
              <Button
                target="_blank"
                download={`${name}-v${version}.scel`}
                href={service.getScelUrl({ id: dictId, version: dictVersion })}
                type="primary"
                icon={<DownloadOutlined />}
              >
                下载 {name}.scel <small style={{ marginLeft: 8 }}>{(size / 1000).toFixed(2)}k</small>
              </Button>
            </div>
          }
          backIcon={false}
        />

        <div>
          <h2>基础信息</h2>
          <ScelMetaDescription metadata={metadata} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
          <h2>词库内容</h2>
          <div style={{ minHeight: 320, flex: 1, display: 'flex' }}>
            {scel.content && <ScelContentList content={scel.content} />}
            {!scel.content && (
              <Button loading={loading} onClick={loadScel}>
                加载词库 {loadInfo}
              </Button>
            )}
          </div>
        </div>

        <ScelFooter />
      </PageContent>
    </PageLayout>
  );
};

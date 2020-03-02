import {NextPage} from 'next';
import Head from 'next/head';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {Descriptions, message, PageHeader, Upload} from 'antd';
import React, {useState} from 'react';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {Buffer} from 'buffer/'
import './read.css'
import {enrichContent, parseScelContent, parseScelHeader} from 'libs/formats/scel/parser';

import {ScelContent, ScelHeader} from 'libs/formats/scel/types';

import 'react-virtualized/styles.css';
import {ScelContentList} from 'modules/scel/components/ScelContentList';
import {BookOutlined} from '@ant-design/icons';

interface ScelState {
  file?: File
  header?: ScelHeader
  content?: ScelContent
}

const ScelReaderFileUploader: React.FC<{ onFileChange? }> = ({onFileChange}) => {
  return (
    <div>
      <Upload
        className="scel-uploader"
        listType="picture-card"
        showUploadList={false}
        supportServerRender={true}
        beforeUpload={file => {
          if (!/[.]scel$/.test(file.name)) {
            message.error('只支持搜狗词库 .scel 文件');
            return false
          }

          return true
        }}
        customRequest={async opts => {
          if (opts.file instanceof File) {
            onFileChange?.(opts.file);
          } else {
            message.error('无效的上传文件')
          }
        }}
      >
        <div style={{
          width: 128,
          textAlign: 'center',
        }}>
          <div><BookOutlined /> 选择 .scel 文件</div>
        </div>
      </Upload>

    </div>
  )
}

const Page: NextPage = () => {
  const [scel, setScel] = useState<ScelState>();

  return (
    <>
      <Head>
        <title>搜狗词库 SCEL 工具</title>
      </Head>
      <PageLayout>
        <PageContent style={{display: 'flex', flexFlow: 'column'}}>
          <PageHeader
            title={
              <div>
                <BookOutlined style={{marginRight: 8}} />
                搜狗词库 Scel 解析
              </div>
            }
            extra={<ScelReaderFileUploader onFileChange={async file => {
              try {
                const arrayBuffer = await file.arrayBuffer();
                const buf = Buffer.from(arrayBuffer);

                const header = parseScelHeader(buf);
                const content = parseScelContent(buf);
                enrichContent(content);
                setScel({file, header, content});
              } catch (e) {
                message.error(`Failed to process scel file: ${e}`);
                console.error('process scel failed', e)
              }
            }} />}
            backIcon={false}
          />

          <div>
            <h3>基础信息</h3>
            <Descriptions size="small" column={5}>
              <Descriptions.Item span={4} label="词库">{scel?.header?.name}</Descriptions.Item>
              <Descriptions.Item span={1} label="类型">{scel?.header?.type}</Descriptions.Item>
              <Descriptions.Item span={5} label="说明">{scel?.header?.description}</Descriptions.Item>
              <Descriptions.Item span={5} label="例子">{scel?.header?.example}</Descriptions.Item>
            </Descriptions>
          </div>

          <div style={{flex: 1, display: 'flex', flexFlow: 'column'}}>
            <h3>词库内容</h3>
            <div style={{minHeight: 320, flex: 1}} className="scel-list-container">
              {scel && <ScelContentList content={scel.content} />}
            </div>
          </div>

        </PageContent>
      </PageLayout>
    </>
  )
}

export default Page;

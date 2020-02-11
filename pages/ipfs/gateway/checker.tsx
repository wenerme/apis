import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import {GatewayChecker} from 'modules/ipfs/components/GatewayChecker';
import Head from 'next/head';
import React from 'react';
import {Alert, Icon, PageHeader} from 'antd';


const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>IPFS 公共网关检测</title>
        </Head>
        <PageHeader
          title={
            <div>
              <Icon type="file" style={{marginRight: 8}} />
              IPFS 公共网关检测
            </div>
          }
          backIcon={false}
        />

        <GatewayChecker
          gateways={[
            'https://ipfs.io/ipfs/:hash',
            'https://:hash.ipfs.dweb.link',
            'https://gateway.ipfs.io/ipfs/:hash',
            'https://ipfs.infura.io/ipfs/:hash',
            'https://rx14.co.uk/ipfs/:hash',
            'https://ninetailed.ninja/ipfs/:hash',
            'https://ipfs.globalupload.io/:hash',
            'https://ipfs.jes.xxx/ipfs/:hash',
            'https://10.via0.com/ipfs/:hash',
            'https://ipfs.eternum.io/ipfs/:hash',
            'https://hardbin.com/ipfs/:hash',
            'https://ipfs.wa.hle.rs/ipfs/:hash',
            'https://gateway.blocksec.com/ipfs/:hash',
            'https://ipfs.renehsz.com/ipfs/:hash',
            'https://cloudflare-ipfs.com/ipfs/:hash',
            'https://:hash.ipfs.cf-ipfs.com',
            'https://ipns.co/:hash',
            'https://ipfs.mrh.io/ipfs/:hash',
            'https://gateway.originprotocol.com/ipfs/:hash',
            'https://gateway.pinata.cloud/ipfs/:hash',
            'https://ipfs.doolta.com/ipfs/:hash',
            'https://ipfs.sloppyta.co/ipfs/:hash',
            'https://ipfs.busy.org/ipfs/:hash',
            'https://ipfs.greyh.at/ipfs/:hash',
            'https://gateway.serph.network/ipfs/:hash',
            'https://jorropo.ovh/ipfs/:hash',
            'https://gateway.temporal.cloud/ipfs/:hash',
            'https://ipfs.fooock.com/ipfs/:hash',
            'https://cdn.cwinfo.net/ipfs/:hash',
            'https://ipfs.privacytools.io/ipfs/:hash',
            'https://ipfs.jeroendeneef.com/ipfs/:hash',
            'https://permaweb.io/ipfs/:hash',
            'https://ipfs.stibarc.com/ipfs/:hash',
            'https://ipfs.best-practice.se/ipfs/:hash',
            'https://:hash.ipfs.2read.net',
            'https://ipfs.2read.net/ipfs/:hash',
            'https://storjipfs-gateway.com/ipfs/:hash'
          ]}
        />

        <div style={{marginTop: 18}}>
          <Alert
            type="info"
            showIcon
            message={(
              <div>
                基础检测逻辑和网关列表来源于
                <a href="https://github.com/ipfs/public-gateway-checker" target="_blank">ipfs/public-gateway-checker</a>。
                扩展了部分额外的异常检测。
              </div>
            )}
          />
        </div>
      </PageContent>
    </PageLayout>
  )
};

export default Page

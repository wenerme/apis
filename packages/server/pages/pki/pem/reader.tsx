import React, {useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Button, Input, PageHeader} from 'antd';
import CertificateVerifiedFilled from 'components/icons/CertificateVerifiedFilled';
import Certificate from 'pkijs/src/Certificate'

async function decodeCert(pem) {
  if (typeof pem !== 'string') {
    throw new Error('Expected PEM as string')
  }

  // Load certificate in PEM encoding (base64 encoded DER)
  const b64 = pem.replace(/(-----(BEGIN|END) ([A-Z ]+)-----|[\n\r])/g, '');

  // Now that we have decoded the cert it's now in DER-encoding
  const der = new Buffer(b64, 'base64');

  // And massage the cert into a BER encoded one
  const ber = new Uint8Array(der).buffer;

  const Asn1js = await import('asn1js');
  // And now Asn1js can decode things \o/
  const asn1 = Asn1js.fromBER(ber);
  const {default: Certificate} = await import('pkijs/src/Certificate');

  return new Certificate({schema: asn1.result})
}

const PemReaderPageContent: React.FC = () => {
  const [value, setValue] = useState('');
  const [cert, setCert] = useState<Certificate>(null)
  return (
    <div className="container">
      <div>
        <Button
          type="primary"
          onClick={async () => {
            const cert = await decodeCert(value);
            window['cert'] = cert;
            console.log(cert)
            setCert(cert)
          }}>解析</Button>
        <Input.TextArea
          style={{fontFamily: 'monospace'}}
          rows={20}
          placeholder="-----BEGIN CERTIFICATE-----"
          value={value}
          onChange={v => setValue(v.target.value)}
        />

      </div>
      <div style={{overflow: 'auto', fontFamily: 'monospace'}}>
        <pre>{cert && JSON.stringify(cert.toJSON(), null, '  ')}</pre>
      </div>
      <style jsx>{`
.container {
  display: flex;
}
.container > div{
  flex:1;
  margin: 8px;
}
@media (max-width: 767.98px) { 
  .container {
    flex-flow: column;
  }
}
`}</style>
    </div>
  )
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>PEM Reader</title>
          <meta name="description" content="PEM 文件解析" />
          <meta name="keywords" content="pem file reader, pem decode" />
        </Head>
        <PageHeader
          title={
            <div>
              <CertificateVerifiedFilled style={{marginRight: 8}} />
              PEM Reader
            </div>
          }
          backIcon={false}
        />

        <PemReaderPageContent />

      </PageContent>
    </PageLayout>
  )
};
export default Page

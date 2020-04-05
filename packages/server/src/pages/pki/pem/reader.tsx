import React, { useState } from 'react';
import { PageLayout } from 'src/components/layout/PageLayout/PageLayout';
import { PageContent } from 'src/components/layout/PageLayout/PageContent';
import { Button, Input, message, PageHeader } from 'antd';
import { CertificateVerifiedFilled } from '@wener/ui/icons';
import Certificate from 'pkijs/src/Certificate';
import { API } from 'src/apis/api';
import { DownloadOutlined } from '@ant-design/icons';
import { download } from '@wener/utils/src/browsers/download';
import { resultOf } from 'src/utils/axioses';
import { getFile } from '@wener/utils/src/browsers/transfers';
import { readFileAsText } from 'src/utils/io';
import { CertificateViewer } from 'src/modules/pki/components/CertificateViewer';

async function decodeCert(pem) {
  if (typeof pem !== 'string') {
    throw new Error('Expected PEM as string');
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
  const { default: Certificate } = await import('pkijs/src/Certificate');

  return new Certificate({ schema: asn1.result });
}

const PemReaderPageContent: React.FC = () => {
  const [value, setValue] = useState('');
  const [url, setUrl] = useState('https://wener.me');
  const [cert, setCert] = useState<Certificate>(null);
  const [loading, setLoading] = useState(false);

  const doFetch = async () => {
    try {
      setLoading(true);
      const { default: axios } = await import('axios');
      const data = await resultOf(axios.post(API.apiOf('/api/pki/cert/url'), { url }));
      setValue(data?.certificate ?? '');
    } catch (e) {
      message.error(`获取证书失败: ${e.message || e.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div>
        <div style={{ display: 'flex' }}>
          <Button
            type="primary"
            onClick={async () => {
              const cert = await decodeCert(value);
              window['cert'] = cert;
              console.log(cert);
              setCert(cert);
            }}
          >
            解析
          </Button>

          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            addonAfter={
              <Button loading={loading} type="link" size="small" onClick={doFetch}>
                获取证书
              </Button>
            }
          />

          <Button icon={<DownloadOutlined />} disabled={!value} onClick={() => download('cert.pem', value)}>
            下载
          </Button>
        </div>
        <Input.TextArea
          style={{ fontFamily: 'monospace' }}
          rows={20}
          placeholder="Drop file here or input -----BEGIN CERTIFICATE-----"
          value={value}
          onChange={(v) => setValue(v.target.value)}
          onDrop={async (e) => {
            e.preventDefault();
            const { file } = getFile(e.dataTransfer) || {};
            if (file) {
              setLoading(true);
              try {
                const value = await readFileAsText(file);
                setValue(value);
              } catch (e) {
                message.error(`读取证书失败: ${e.message || e.toString()}`);
              } finally {
                setLoading(false);
              }
            }
          }}
        />
      </div>
      <div style={{ overflow: 'auto' }}>
        {cert && <CertificateViewer cert={cert} />}
        <h3>Dump</h3>
        <pre>{cert && JSON.stringify(cert.toJSON(), null, '  ')}</pre>
      </div>
      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
          margin: 8px;
        }
        @media (max-width: 767.98px) {
          .container {
            flex-flow: column;
          }
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout title="PEM Reader" description="PEM 文件解析" keywords="pem file reader, pem decode">
      <PageContent>
        <PageHeader
          title={
            <div>
              <CertificateVerifiedFilled style={{ marginRight: 8 }} />
              PEM Reader
            </div>
          }
          backIcon={false}
        />

        <PemReaderPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;

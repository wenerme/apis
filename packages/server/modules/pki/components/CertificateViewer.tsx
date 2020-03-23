import React from 'react';
import Certificate from 'pkijs/src/Certificate';
import { Descriptions } from 'antd';
import { Base16 } from 'utils/base';
import { format } from 'date-fns';

// http://www.oid-info.com/get/2.5.4
const OIDs = {
  '2.5.4.3': { label: 'Common Name', short: 'CN' },
  '2.5.4.4': { short: 'SN' },
  '2.5.4.6': { label: 'Country or Region', short: 'C' },
  '2.5.4.7': { label: 'Locality', short: 'L' },
  '2.5.4.8': { label: 'State/Province', short: 'S' },
  '2.5.4.10': { label: 'Organization', short: 'O' },
  '2.5.4.11': { label: 'Organization Unit', short: 'OU' },
  '2.5.4.12': { short: 'T' },
  '2.5.4.42': { short: 'GN' },
  '2.5.4.43': { short: 'I' },

  '2.5.29.1': { label: 'old Authority Key Identifier' },
  '2.5.29.2': { label: 'old Primary Key Attributes' },
  '2.5.29.3': { label: 'Certificate Policies' },
  '2.5.29.4': { label: 'Primary Key Usage Restriction' },
  '2.5.29.9': { label: 'Subject Directory Attributes' },
  '2.5.29.14': { label: 'Subject Key Identifier' },
  '2.5.29.15': { label: 'Key Usage' },
  '2.5.29.16': { label: 'Private Key Usage Period' },
  '2.5.29.17': { label: 'Subject Alternative Name' },
  '2.5.29.18': { label: 'Issuer Alternative Name' },
  '2.5.29.19': { label: 'Basic Constraints' },
  '2.5.29.28': { label: 'Issuing Distribution Point' },
  '2.5.29.29': { label: 'Certificate Issuer' },
  '2.5.29.30': { label: 'Name Constraints' },
  '2.5.29.31': { label: 'CRL Distribution Points' },
  '2.5.29.32': { label: 'Certificate Policies' },
  '2.5.29.33': { label: 'Policy Mappings' },
  '2.5.29.35': { label: 'Authority Key Identifier' },
  '2.5.29.36': { label: 'Policy Constraints' },
  '2.5.29.37': { label: 'Extended key usage' },
  '2.5.29.54': {
    label: 'X.509 version 3 certificate extension Inhibit Any-policy',
  },

  '1.2.840.113549.2.1': { label: 'MD2' },
  '1.2.840.113549.1.1.2': { label: 'MD2 with RSA' },
  '1.2.840.113549.2.5': { label: 'MD5' },
  '1.2.840.113549.1.1.4': { label: 'MD5 with RSA' },
  '1.3.14.3.2.26': { label: 'SHA1' },
  '1.2.840.10040.4.3': { label: 'SHA1 with DSA' },
  '1.2.840.10045.4.1': { label: 'SHA1 with ECDSA' },
  '1.2.840.113549.1.1.5': { label: 'SHA1 with RSA' },
  '2.16.840.1.101.3.4.2.4': { label: 'SHA224' },
  '1.2.840.113549.1.1.14': { label: 'SHA224 with RSA' },
  '2.16.840.1.101.3.4.2.1': { label: 'SHA256' },
  '1.2.840.113549.1.1.11': { label: 'SHA256 with RSA' },
  '2.16.840.1.101.3.4.2.2': { label: 'SHA384' },
  '1.2.840.113549.1.1.12': { label: 'SHA384 with RSA' },
  '2.16.840.1.101.3.4.2.3': { label: 'SHA512' },
  '1.2.840.113549.1.1.13': { label: 'SHA512 with RSA' },

  '1.2.840.113549.1.9.1': { label: 'E-mail' },

  '1.2.840.10045.4.3.2': {
    label:
      'Elliptic Curve Digital Signature Algorithm (DSA) coupled with the Secure Hash Algorithm 256 (SHA256) algorithm',
  },

  altNames: { label: 'DNS Name' },

  // country: 'C',
  // organizationName: 'O',
  // organizationalUnit: 'OU',
  // commonName: 'CN',
  // localityName: 'L',
  // stateName: 'S',
  // email: 'E-mail'
};

function oidOf(k) {
  return OIDs[k]?.label ?? OIDs[k]?.short ?? stringOf(k);
}

function stringOf(v) {
  if (!v) {
    return '';
  }
  if (typeof v === 'string') {
    return v;
  }
  if (v.value) {
    return String(v.value);
  }
  if (v.valueBlock) {
    const block = v.valueBlock;
    if (block.value?.length) {
      return String(block.value);
    }
    if (block.valueHex?.length) {
      return Base16.stringify(block.valueHex);
    }
  }
  return String(Object.getPrototypeOf(v)?.name ?? 'Unknown Type');
}

export const CertificateViewer: React.FC<{ cert: Certificate }> = ({ cert }) => {
  // console.log('Pub key', cert.getPublicKey())
  // console.log('Pub key', cert.subjectPublicKeyInfo)
  // cert.extensions

  // TODO prefetch oid mapping - this component should only render data
  // TODO more value type support
  // TODO extension specified render
  // TODO better oid mapping

  return (
    <div>
      <div>
        <h3>Subject Name</h3>
        <Descriptions column={1} size="small">
          {cert.subject.typesAndValues
            .map((v) => [v.type, v.value.valueBlock.value])
            .map(([k, v]) => (
              <Descriptions.Item key={k} label={oidOf(k)}>
                {stringOf(v)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <h3>Issuer Name</h3>
        <Descriptions column={1} size="small">
          {cert.issuer.typesAndValues
            .map((v) => [v.type, v.value.valueBlock.value])
            .map(([k, v]) => (
              <Descriptions.Item key={k} label={oidOf(k)}>
                {stringOf(v)}
              </Descriptions.Item>
            ))}
        </Descriptions>
        <h3>Basic</h3>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Serial Number">
            {Base16.stringify(cert.serialNumber.valueBeforeDecode).replace(/(..)/g, '$1 ')}
          </Descriptions.Item>
          <Descriptions.Item label="Version">{cert.version}</Descriptions.Item>
          <Descriptions.Item label="Signature Algorithm">
            {oidOf(cert.signatureAlgorithm.algorithmId)} ({cert.signatureAlgorithm.algorithmId})
          </Descriptions.Item>
          <Descriptions.Item label="Parameter">
            {stringOf(cert.signatureAlgorithm.algorithmParams) || 'None'}
          </Descriptions.Item>
          <Descriptions.Item label="Not Valid Before">
            {format(cert.notBefore.value, 'yyyy-MM-dd HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Not Valid After">
            {format(cert.notAfter.value, 'yyyy-MM-dd HH:mm:ss')}
          </Descriptions.Item>
        </Descriptions>

        <h3>Public Key Info</h3>
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Algorithm">
            {oidOf(cert.subjectPublicKeyInfo.algorithm.algorithmId)} (
            {cert.subjectPublicKeyInfo.algorithm.algorithmId + ''})
          </Descriptions.Item>
          <Descriptions.Item label="Parameter">
            {stringOf(cert.subjectPublicKeyInfo.algorithm.algorithmParams) || 'None'}
          </Descriptions.Item>
        </Descriptions>

        <h3>Extensions</h3>
        {(cert.extensions ?? []).map((e) => (
          <div>
            <h4>
              Extension {oidOf(e.extnID)} ({e.extnID})
            </h4>
            {
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Critical">{e.critical ? 'Yes' : 'No'}</Descriptions.Item>
                {e.parsedValue?.valueBlock
                  ? stringOf(e.parsedValue)
                  : Object.entries(e.parsedValue ?? {}).map(([k, v]) =>
                      Array.isArray(v) ? (
                        v.map((vv, i) => (
                          <Descriptions.Item label={oidOf(k)} key={`${k}-${i}`}>
                            {stringOf(vv)}
                          </Descriptions.Item>
                        ))
                      ) : (
                        <Descriptions.Item label={oidOf(k)} key={k}>
                          {stringOf(v)}
                        </Descriptions.Item>
                      )
                    )}
              </Descriptions>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

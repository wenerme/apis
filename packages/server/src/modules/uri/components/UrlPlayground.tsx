import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
// import url from 'url/';
import url from 'url';
import { useRouter } from 'next/router';
import { pick } from 'lodash';
import { firstOfMaybeArray } from '@wener/utils';
import { UrEditablePart } from 'src/modules/uri/components/UrlEditablePart';

function parseUrl(current: string) {
  let o: URL;
  try {
    o = new URL(current);
    o = pick(o, [
      'href',
      'origin',
      'protocol',
      'username',
      'password',
      'host',
      'hostname',
      'port',
      'pathname',
      'search',
      'searchParams',
      'hash',
    ]) as URL;
  } catch (e) {
    console.warn(`invalid url ${current}`, e);
    o = url.parse(current, true) as any;
  }
  return o;
}

export const UrlPlayground: React.FC = () => {
  // const router = useRouter();
  const [current, setCurrent] = useState(
    // firstOfMaybeArray(router.query['url']) ??
    'https://admin:pass@wener.me:8443/notes/java/java/?name=wener#hero',
  );
  const [value, setValue] = useState(current);
  const [parsed, setParsed] = useState<URL>(null);

  useEffect(() => {
    const o = parseUrl(current);
    setParsed(o);
    // sync url param
    // if (firstOfMaybeArray(router.query['url']) !== current) {
    //   router.push({ pathname: location.pathname, query: { url: current } });
    // }
  }, [current]);

  useEffect(() => {
    if (!parsed) {
      return;
    }
    let v;
    if (parsed.origin) {
      const { origin, searchParams, ...o } = parsed;
      const u = Object.assign(new URL(current), o);
      v = u.toString();
    } else {
      console.info(`format parsed`, parsed);
      v = url.format(parsed);
    }
    setValue(v);
  }, [parsed]);

  return (
    <div>
      <Input.Search value={value} onChange={(v) => setValue(v.target.value)} enterButton="解析" onSearch={setCurrent} />

      <div style={{ marginTop: 16 }}>
        <h2>URI 信息</h2>
        <UrEditablePart value={parsed} onChanged={setParsed} />
      </div>
    </div>
  );
};

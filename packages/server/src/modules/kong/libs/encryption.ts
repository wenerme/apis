import { Base64Url } from '../../../utils/base';

export async function encrypt(v): Promise<{ encrypted; secret }> {
  const encoder = new TextEncoder();
  const counter = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.generateKey({ name: 'AES-CTR', length: 128 }, true, ['encrypt', 'decrypt']);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-CTR',
      counter,
      length: 64,
    },
    key,
    encoder.encode(v)
  );
  const keyRaw = await crypto.subtle.exportKey('raw', key);
  // console.log(await crypto.subtle.exportKey('jwk', key))
  // console.log(btoa(JSON.stringify(await crypto.subtle.exportKey('jwk', key))))
  return {
    encrypted:
      Base64Url.stringify(counter, { pad: false }) +
      '.' +
      Base64Url.stringify(new Uint8Array(encrypted), { pad: false }),
    // secret: base64url.stringify('AES-CTR', {pad: false}) + '.' + base64url.stringify(new Uint8Array(keyRaw), {pad: false}),
    secret: Base64Url.stringify(new Uint8Array(keyRaw), { pad: false }),
  };
}

export async function decrypt(encrypted: string, secret: string): Promise<string> {
  const [initialStr, encStr] = encrypted.split('.');
  const initial = Base64Url.parse(initialStr, { loose: true });
  const enc = Base64Url.parse(encStr, { loose: true });

  const decoder = new TextDecoder();

  const sec = Base64Url.parse(secret, { loose: true });
  const key = await crypto.subtle.importKey('raw', sec, 'AES-CTR', false, ['encrypt', 'decrypt']);
  const dec = await crypto.subtle.decrypt({ name: 'AES-CTR', counter: initial, length: 64 }, key, enc);
  return decoder.decode(dec);
}

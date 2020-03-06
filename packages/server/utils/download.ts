export function download(filename, data, {type = 'application/octet-stream'} = {}) {
  const a = document.createElement('a');
  let closer = () => null;
  try {
    a.download = filename;

    // console.info(`downloading ${name}`, data);

    if (data instanceof Uint8Array) {
      data = new Blob([data], {type})
    }
    if (typeof data === 'string' && /^(https?:|datat:)/.test(data)) {
      a.href = data;
    } else if (data instanceof File || data instanceof Blob || data instanceof MediaSource) {
      a.href = URL.createObjectURL(data);
      closer = () => URL.revokeObjectURL(a.href);
    } else {
      console.error(`invalid download data`, data);
      throw new Error(`can not download ${Object.getPrototypeOf(data)}`);
    }
    a.click()
  } finally {
    closer()
  }
}

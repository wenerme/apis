export class BlobUtil {
  fromDataUrl(url: string) {
    const arr = url.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  }

  async toDataUrl(blob: Blob): Promise<string | ArrayBuffer | null> {
    const a = new FileReader();
    return new Promise(((resolve, reject) => {
      a.onload = e => {
        resolve(e.target.result);
      };
      a.onerror = e => {
        reject(e);
      };
      a.readAsDataURL(blob);
    }))
  }
}

export const Blobs = new BlobUtil();

export function readFileAsArrayBuffer(file: File | Blob): Promise<ArrayBuffer> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      resolve(e.target.result as ArrayBuffer);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export function readFileAsText(file: File | Blob): Promise<string> {
  const reader = new FileReader();
  reader.readAsText(file);
  return new Promise((resolve, reject) => {
    reader.onload = async (e) => {
      resolve(e.target.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

export async function readFileAsBuffer(file: File | Blob): Promise<Buffer> {
  const { Buffer } = await import('buffer/');
  return Buffer.from(await readFileAsArrayBuffer(file)) as any;
}

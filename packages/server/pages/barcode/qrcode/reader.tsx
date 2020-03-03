import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {message, notification, PageHeader, Spin, Upload} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {InboxOutlined, QrcodeOutlined} from '@ant-design/icons/lib';
import {QRCode} from 'jsqr';
import {sleep} from 'utils/utils';

const decoders = {
  'image/jpeg': buf => import('jpeg-js').then(({decode}) => decode(buf)),
  'image/png': buf => import('pngjs').then(({PNG}) => PNG.sync.read(buf)),
};

const ImageUploader: React.FC<{ onFileChange?, onImageDataChange?, decoderType?: 'canvas' | 'js' }> = ({onFileChange, onImageDataChange: rawOnImageDataChange, decoderType = 'canvas'}) => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();
  const [imageInfo, setImageInfo] = useState<{ width, height }>();
  const canvasRef = useRef<HTMLCanvasElement>();

  const [loading, setLoading] = useState(false);
  const onImageDataChange = (v) => {
    setLoading(false);
    rawOnImageDataChange?.(v);
  };

  useEffect(() => {
    if (!file || !onImageDataChange || decoderType !== 'js') {
      return
    }

    const decoder: (buf: ArrayBuffer) => Promise<ImageData> = decoders[file.type];
    if (!decoder) {
      message.error(`无法解析 ${file.type} 文件`);
      return;
    }
    setLoading(true);

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      try {
        console.log(`read file length ${reader.result?.['byteLength']} <=> ${file.size}`);
        onImageDataChange(await decoder(reader.result as ArrayBuffer))
      } catch (e) {
        console.log(`parse file failed ${file.name} ${file.type} ${file.size}`, e);
        notification.error({message: '解析文件失败', description: `${file.name} :${e.message}`, duration: 8})
      } finally {
        setLoading(false)
      }
    };
    reader.onerror = error => {
      console.log(`failed file reading`, file, error);
      notification.error({message: '读取文件失败', description: `${file.name}`, duration: 8});
      setLoading(false)
    };
  }, [file]);

  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const items: DataTransferItemList = (e.clipboardData || e['originalEvent']?.['clipboardData'])?.items ?? [];
      console.log(`paste item`, items);

      if (items.length === 2 && items[0].kind === 'string' && items[1].kind === 'file' && items[1].type.startsWith('image/')) {
        let file = items[1].getAsFile();
        const text: string = await new Promise(resolve => {
          items[0].getAsString(v => resolve(v))
        });
        let type = file.type;
        if (text.endsWith('.jpg') || text.endsWith('.jpeg')) {
          type = 'image/jpeg'
        } else if (text.endsWith('.png')) {
          type = 'image/png'
        }
        // NOTE paste file can not parse by libs
        if (type !== file.type) {
          const blob = file.slice(0, file.size);
          file = new File([blob], text, {type});
        }
        // file = file;
        console.log(`Get file`, text, file.name, file.type, file);
        setFile(file)
      } else {
        console.log(`paste item not match`, [...items].map(v => ({type: v.type, kind: v.kind})));
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);

  useEffect(() => {
    if (!file) {
      return
    }
    setPreview(s => {
      if (s) {
        URL.revokeObjectURL(s);
      }
      return URL.createObjectURL(file)
    });
    onFileChange?.(file);
  }, [file]);

  return (
    <Upload.Dragger
      showUploadList={false}
      supportServerRender={true}
      accept="image/*"
      beforeUpload={file => {
        // console.log(`beforeUpload`, file)
        // if (!/[.](png|jpg|jpeg)$/.test(file.name)) {
        if (!file?.type?.startsWith('image/')) {
          message.error('只支持图片文件');
          return false
        }
        return true
      }}
      customRequest={async opts => {
        console.log(`upload`, opts);
        if (opts.file instanceof File) {
          setFile(opts.file);
        } else {
          message.error('无效的上传文件')
        }
      }}
    >
      <canvas
        style={{width: '100%', display: 'none'}}
        ref={canvasRef}
        width={imageInfo?.width ?? 0}
        height={imageInfo?.height ?? 0}
      />
      <Spin spinning={loading}>
        {
          !preview && (
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                点击<b>选择</b>图片、<b>拖拽</b>图片到该区域、<b>粘贴</b>图片
              </p>
              <p className="ant-upload-hint">
                支持解析 JPG、PNG 格式图片中的二维码
              </p>
            </div>
          )
        }
        {
          preview && (
            <figure>
              <img
                src={preview}
                alt={file.name}
                style={{width: '100%', height: '100%'}}
                onLoad={e => {
                  const img = e.currentTarget;

                  const width = img.naturalWidth;
                  const height = img.naturalHeight;
                  setImageInfo({width, height});

                  if (onImageDataChange && decoderType === 'canvas') {
                    setLoading(true);
                    setTimeout(() => {
                      canvasRef.current.getContext('2d').drawImage(img, 0, 0);
                      onImageDataChange(canvasRef.current.getContext('2d').getImageData(0, 0, width, height))
                    }, 0)
                  }
                }}
              />
              <figcaption>
                <b>{file.name}</b>
                <br />
                图片大小 {imageInfo?.width} x {imageInfo?.height}
                <br />
                文件大小 {(file.size / 1000).toFixed(2)}K
                <br />
                {file.type}
              </figcaption>
            </figure>
          )
        }
      </Spin>
    </Upload.Dragger>
  )
};

const ChunkInfo: React.FC<{ chunk }> = ({chunk}) => {
  const {type, text, bytes} = chunk;
  return (
    <div>
      <div>
        类型: {type}
      </div>
      {text && <div>文本: {text}</div>}
      {bytes && <div>字节: {bytes?.length}</div>}
    </div>
  )
};

const QRCodeReaderPageContent: React.FC = () => {
  const [qrInfo, setQrInfo] = useState<QRCode>();
  const [imageData, setImageData] = useState<ImageData>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!imageData) {
      return
    }
    setLoading(true);

    console.log(`Parse data ${imageData.data.length} ${imageData.width}x${imageData.height}`);
    import('jsqr')
      .then(async ({default: jsQR}) => {
        try {
          // update loading state
          await sleep(100);
          console.time('jsqr.decode');
          const code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'attemptBoth'});
          console.timeEnd('jsqr.decode');
          setQrInfo(code);
          console.log(`Code`, code)
        } catch (e) {
          console.error(`parse failed`, e, imageData);
          notification.error({
            duration: 5,
            message: '解析失败',
            description: e.message,
          })
        } finally {
          setLoading(false)
        }
      })

  }, [imageData]);
  return (
    <div style={{display: 'flex'}} className="container">
      <div style={{flex: 1}}>
        <div style={{margin: 20}}>
          <h2>二维码中的信息</h2>
          <Spin spinning={loading}>
            <div>
              <div>
                <h3>数据</h3>
                <pre>{qrInfo?.data}</pre>
              </div>
              <div>
                <h3>区块</h3>
                {
                  qrInfo && (qrInfo.chunks.map((v, i) => (
                    <div key={i}>
                      <ChunkInfo chunk={v} />
                      <hr />
                    </div>
                  )))
                }
              </div>
            </div>
          </Spin>
        </div>
      </div>
      <div style={{flex: 1}}>
        <div>
          <ImageUploader
            decoderType="canvas"
            onImageDataChange={setImageData}
          />
        </div>
      </div>

      <style jsx>{`
.container {
  display: flex;
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
          <title>二维码/QR code/快速响应码 解析器</title>
        </Head>
        <PageHeader
          title={
            <div>
              <QrcodeOutlined style={{marginRight: 8}} />
              二维码/QR code 解析器
            </div>
          }
          backIcon={false}
        />

        <QRCodeReaderPageContent />

      </PageContent>
    </PageLayout>
  )
};

export default Page

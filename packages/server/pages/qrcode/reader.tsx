import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {message, notification, PageHeader, Spin, Upload} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {InboxOutlined, QrcodeOutlined} from '@ant-design/icons/lib';
import {QRCode} from 'jsqr';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
    setLoading(true)

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      try {
        onImageDataChange(await decoder(reader.result as ArrayBuffer))
      } catch (e) {
        console.log(`failed parse file`, file, e);
        notification.error({message: '解析文件失败', description: `${file.name}`})
      } finally {
        setLoading(false)
      }
    };
    reader.onerror = error => {
      console.log(`failed file reading`, file, error);
      notification.error({message: '读取文件失败', description: `${file.name}`})
      setLoading(false)
    };
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
          setPreview(s => {
            if (s) {
              URL.revokeObjectURL(s);
            }
            return URL.createObjectURL(opts.file)
          });

          onFileChange?.(opts.file);
        } else {
          message.error('无效的上传文件')
        }
      }}
    >
      <canvas ref={canvasRef} style={{display: 'none'}} />
      <Spin spinning={loading}>
        {
          !preview && (
            <div>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                点击选择图片或拖拽图片到该区域
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
                    setTimeout(() => {
                      canvasRef.current.getContext('2d').drawImage(img, 0, 0);
                      onImageDataChange(canvasRef.current.getContext('2d').getImageData(0, 0, img.width, img.height))
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
  useEffect(() => {
    if (!imageData) {
      return
    }
    console.log(`Parse data ${imageData.data.length} ${imageData.width}x${imageData.height}`);
    import('jsqr')
      .then(({default: jsQR}) => {
        try {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {inversionAttempts: 'attemptBoth'});
          setQrInfo(code);
          console.log(`Code`, code)
        } catch (e) {
          console.error(`parse failed`, e, imageData);
          notification.error({
            duration: 5,
            message: '解析失败',
            description: e.message,
          })
        }
      })
  }, [imageData]);
  return (
    <div style={{display: 'flex'}} className="container">
      <div style={{flex: 1}}>
        <h2>二维码中的信息</h2>
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
      </div>
      <div style={{flex: 1}}>
        <div style={{margin: '40px 60px'}}>
          <ImageUploader
            decoderType="js"
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

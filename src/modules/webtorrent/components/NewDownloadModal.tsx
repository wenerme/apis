import React, { useState } from 'react';
import { Form, message, Modal, Radio } from 'antd';
import { FormFieldBuilder, FormFieldsBuilder } from 'src/libs/antds/form/builder';
import { MagnetOutlined, TorrentFileFilled } from 'src/ui/icons';
import { useRootSelector } from 'src/reducers/store';
import { useDispatch } from 'react-redux';
//@ts-ignore - Cannot find module or its corresponding type declarations.
import { hideDialog } from 'src/reducers/webtorrent';
import { doCreateDownload } from 'src/reducers/webtorrent/actions';

export const NewDownloadModal: React.FC = () => {
  // todo fixing type
  const visible = useRootSelector((v) => v.webtorrent['showDialog'] === 'new-download');
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const doHide = () => dispatch(hideDialog());

  const doCreate = async (values) => {
    try {
      await dispatch(doCreateDownload(values));
      doHide();
    } catch (e) {
      console.error(`failed seed`, values, e);
      message.error(`创建失败: ${e}`, 5);
    }
  };

  const [type, setType] = useState('magnet');

  return (
    <Modal title="新建下载" forceRender centered visible={visible} onCancel={doHide} onOk={() => form.submit()}>
      <Form
        form={form}
        initialValues={{ type }}
        onFinish={doCreate}
        onValuesChange={(v) => {
          if (v['type']) {
            setType(v['type']);
          }
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <FormFieldBuilder pure field={{ key: 'type' }}>
          <Radio.Group>
            <Radio.Button value="magnet">
              <MagnetOutlined />
              磁力链接
            </Radio.Button>
            <Radio.Button value="torrent">
              <TorrentFileFilled />
              种子文件
            </Radio.Button>
          </Radio.Group>
        </FormFieldBuilder>
        {type === 'magnet' && (
          <FormFieldsBuilder
            pure
            fields={[
              {
                key: 'magnet.uri',
                label: '链接',
                required: true,
                'widget:placeholder': 'magnet:?xt=urn:btih:......',
              },
            ]}
          />
        )}

        {type === 'torrent' && (
          <FormFieldsBuilder pure fields={[{ key: 'torrent.file', label: '文件', required: true }]} />
        )}
      </Form>
    </Modal>
  );
};

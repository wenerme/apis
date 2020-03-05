import React, {useEffect, useState} from 'react'
import {Form, message, Modal, Radio} from 'antd';
import produce from 'immer';
import {FormFieldBuilder, FormFieldListBuilder} from 'libs/antds/form/builder';
import MagnetOutlined from 'components/icons/MagnetOutlined';
import TorrentFileFilled from 'components/icons/TorrentFileFilled';
import {useRootSelector} from 'reducers/index';
import {useDispatch} from 'react-redux';
import {hideDialog} from 'reducers/webtorrent';
import {createDownload} from 'modules/webtorrent/libs/downloads';
import {getCurrentWebTorrentClient} from 'modules/webtorrent/client';

export const NewDownloadModal: React.FC = () => {
  const visible = useRootSelector(v => v.webtorrent.showDialog === 'new-download');
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [options, setOptions] = useState({type: 'magnet'});
  useEffect(() => {
    form.setFieldsValue(options);
  }, []);
  const doHide = () => dispatch(hideDialog());

  const doCreate = async (values) => {
    try {
      await createDownload(getCurrentWebTorrentClient(), values as any);
      doHide()
    } catch (e) {
      console.error(`failed seed`, values, e);
      message.error(`创建失败: ${e}`, 5)
    }
  };

  return (
    <Modal title="新建下载" centered visible={visible} onCancel={doHide} onOk={() => form.submit()}>
      <Form
        form={form}
        onFinish={doCreate}
        onValuesChange={v => {
          setOptions(produce(s => {
            Object.assign(s, v)
          }))
        }}

        labelCol={{span: 4}}
        wrapperCol={{span: 20}}
      >
        <FormFieldBuilder pure field={{key: 'type'}}>
          <Radio.Group>
            <Radio.Button value="magnet"><MagnetOutlined />磁力链接</Radio.Button>
            <Radio.Button value="torrent"><TorrentFileFilled />种子文件</Radio.Button>
          </Radio.Group>
        </FormFieldBuilder>

        {
          options.type === 'magnet' && (
            <FormFieldListBuilder pure fields={[
              {key: 'magnet.uri', label: '链接', required: true, 'widget:placeholder': 'magnet:?xt=urn:btih:......'},
            ]} />
          )
        }

        {
          options.type === 'torrent' && (
            <FormFieldListBuilder pure fields={[
              {key: 'torrent.file', label: '文件', required: true},
            ]} />
          )
        }
      </Form>
    </Modal>
  )
};


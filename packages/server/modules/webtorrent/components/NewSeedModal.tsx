import React, {useEffect, useState} from 'react';
import {Form, Input, message, Modal, Radio} from 'antd';
import {FormFieldBuilder, FormFieldListBuilder} from 'libs/antds/form/builder';
import produce from 'immer';
import {FileOutlined, FileTextOutlined} from '@ant-design/icons/lib';
import {useRootSelector} from 'reducers/index';
import {useDispatch} from 'react-redux';
import {hideDialog} from 'reducers/webtorrent';
import {createSeed} from 'modules/webtorrent/libs/seeds';
import {getCurrentWebTorrentClient} from 'modules/webtorrent/client';

export const NewSeedModal: React.FC = () => {
  const visible = useRootSelector(v => v.webtorrent.showDialog === 'new-seed');
  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const [options, setOptions] = useState({type: 'text'});
  useEffect(() => {
    form.setFieldsValue(options);
  }, []);
  const doHide = () => dispatch(hideDialog());

  const doCreate = async (values) => {
    try {
      await createSeed(getCurrentWebTorrentClient(), values as any)
      doHide()
    } catch (e) {
      console.error(`failed seed`, values, e);
      message.error(`创建失败: ${e}`, 5)
    }
  };

  // Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?
  return (
    <Modal title="新建种子" centered visible={visible} onCancel={doHide} onOk={() => form.submit()}>
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
            <Radio.Button value="text"><FileTextOutlined />文本</Radio.Button>
            <Radio.Button value="file"><FileOutlined />文件</Radio.Button>
          </Radio.Group>
        </FormFieldBuilder>

        {
          options.type === 'text' && (
            <FormFieldListBuilder pure fields={[
              {key: 'text.filename', label: '文件名', required: true},
              {key: 'text.content', label: '文本内容', required: true, widget: Input.TextArea,},
            ]} />
          )
        }

        {
          options.type === 'magnet' && (
            <FormFieldListBuilder pure fields={[
              {key: 'magnet.uri', label: '链接', required: true, 'widget:placeholder': 'magnet:?xt=urn:btih:......'},
            ]} />
          )
        }

      </Form>
    </Modal>
  )
};

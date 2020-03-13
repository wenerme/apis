import React, {useState} from 'react';
import {Form, Input, message, Modal, Radio} from 'antd';
import {FormFieldBuilder, FormFieldsBuilder} from 'libs/antds/form/builder';
import {FileOutlined, FileTextOutlined} from '@ant-design/icons/lib';
import {useRootSelector} from 'reducers/store';
import {useDispatch} from 'react-redux';
import {hideDialog} from 'reducers/webtorrent';
import {doCreateSeed} from 'reducers/webtorrent/actions';

export const NewSeedModal: React.FC = () => {
  const visible = useRootSelector(v => v.webtorrent.showDialog === 'new-seed');
  const dispatch = useDispatch()

  const [form] = Form.useForm();

  const doHide = () => dispatch(hideDialog());

  const doCreate = async (values) => {
    try {
      await dispatch(doCreateSeed(values));
      doHide()
    } catch (e) {
      console.error(`failed seed`, values, e);
      message.error(`创建失败: ${e}`, 5)
    }
  };

  const [type, setType] = useState('text');

  // Instance created by `useForm` is not connect to any Form element. Forget to pass `form` prop?
  return (
    <Modal title="新建种子" forceRender centered visible={visible} onCancel={doHide} onOk={() => form.submit()}>
      <Form
        form={form}
        initialValues={{type}}
        onFinish={doCreate}
        onValuesChange={v => {
          if (v['type']) {
            setType(v['type'])
          }
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
          type === 'text' && (
            <FormFieldsBuilder pure fields={[
              {key: 'text.filename', label: '文件名', required: true},
              {key: 'text.content', label: '文本内容', required: true, widget: Input.TextArea,},
            ]} />
          )
        }

        {
          type === 'magnet' && (
            <FormFieldsBuilder pure fields={[
              {key: 'magnet.uri', label: '链接', required: true, 'widget:placeholder': 'magnet:?xt=urn:btih:......'},
            ]} />
          )
        }

      </Form>
    </Modal>
  )
};

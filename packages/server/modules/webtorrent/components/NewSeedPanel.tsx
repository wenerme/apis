import React, {useEffect, useState} from 'react';
import {Form, Input, Radio} from 'antd';
import {FormFieldBuilder, FormFieldListBuilder} from 'libs/antds/form/builder';
import produce from 'immer';
import {FileOutlined, FileTextOutlined} from '@ant-design/icons/lib';

export const NewSeedPanel: React.FC = () => {
  const [form] = Form.useForm();

  const [options, setOptions] = useState({type: 'text'});
  useEffect(() => {
    form.setFieldsValue(options);
  }, []);

  return (
    <div>
      <Form
        form={form}
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
    </div>
  )
};

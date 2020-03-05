import React, {useEffect, useState} from 'react'
import {Form, Radio} from 'antd';
import produce from 'immer';
import {FormFieldBuilder, FormFieldListBuilder} from 'libs/antds/form/builder';
import MagnetOutlined from 'components/icons/MagnetOutlined';
import TorrentFileFilled from 'components/icons/TorrentFileFilled';

export const NewDownloadPanel: React.FC = () => {
  const [form] = Form.useForm();

  const [options, setOptions] = useState({type: 'magnet'});
  useEffect(() => {
    form.setFieldsValue(options);
  }, []);

  return (
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
  )
};


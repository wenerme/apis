import React from 'react';
import {FormFieldProps} from 'libs/antds/form/builder';
import {Button, Form} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons/lib';
import {Trans} from 'react-i18next';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 20},
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {span: 24, offset: 0},
    sm: {span: 20, offset: 4},
  },
};
export const FormListField: React.FC<{ field: FormFieldProps }> = ({field}) => {
  const {name, label, key, widget, widgetProps} = field;
  const Widget: any = widget;
  return (
    <Form.List name={name} key={key}>
      {(fields, {add, remove}) => (
        <div>
          {fields.map((field, i) => (
            <Form.Item
              {...(i === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
              label={i === 0 ? label : ''}
              key={field.key}
            >
              <Form.Item
                {...field}
                noStyle
              >
                <Widget style={{minWidth: '60%', maxWidth: 'calc(100% - 32px)', marginRight: 8}} {...widgetProps} />
              </Form.Item>

              {fields.length > 1 ? (
                <MinusCircleOutlined
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                  }}
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              ) : null}

            </Form.Item>
          ))}

          <Form.Item
            {...(fields.length === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={fields.length === 0 ? label : ''}
          >
            <Button
              type="dashed"
              onClick={() => add()}
              style={{minWidth: '60%', maxWidth: 'calc(100% - 32px)'}}
            >
              <PlusOutlined /> <Trans>添加</Trans>
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  )
};

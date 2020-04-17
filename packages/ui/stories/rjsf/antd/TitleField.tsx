import React from 'react';
import classNames from 'classnames';

import { Field } from '@rjsf/core';
import { Badge, Col, PageHeader } from 'antd';

export const TitleField: Field = ({
  // autofocus,
  // disabled,
  // errorSchema,
  formContext,
  // formData,
  id,
  // idSchema,
  // name,
  // onChange,
  prefixCls,
  // readonly,
  // registry,
  required,
  // schema,
  title,
  // uiSchema,
  description,

  // custom props
  extra,
}) => {
  const { colon = true, labelAlign = 'right', labelCol = {} } = formContext;

  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = classNames(
    labelClsBasic,
    labelAlign === 'left' && `${labelClsBasic}-left`,
    labelCol.className,
  );

  let _title: React.ReactNode = title;
  if (colon && typeof title === 'string' && title.trim() !== '') {
    _title = title.replace(/[：:]\s*$/, '');
  }
  if (required && _title) {
    _title = <Badge count={<span style={{ color: '#f5222d' }}>*</span>}>{_title}</Badge>;
  }

  const labelClassName = classNames({
    [`${prefixCls}-item-required`]: required,
    [`${prefixCls}-item-no-colon`]: !colon,
  });

  const handleLabelClick = () => {
    if (!id) {
      return;
    }

    const control = document.querySelector<HTMLInputElement>(`[id="${id}"]`);
    if (control && control.focus) {
      control.focus();
    }
  };

  return !title && !extra && !description ? null : (
    <Col {...labelCol} className={labelColClassName}>
      <label
        className={labelClassName}
        htmlFor={id}
        onClick={handleLabelClick}
        title={typeof title === 'string' ? title : ''}
      >
        {/*{labelChildren}*/}
        <PageHeader
          title={_title}
          subTitle={description}
          extra={extra}
          style={{ marginBottom: 20, borderBottom: '1px solid #e5e5e5' }}
        />
      </label>
    </Col>
  );
};

TitleField.defaultProps = {
  formContext: {},
};

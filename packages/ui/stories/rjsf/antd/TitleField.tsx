import React from 'react';
import classNames from 'classnames';

import { Field } from '@rjsf/core';
import { Col, PageHeader } from 'antd';

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
}) => {
  const { colon = true, labelAlign = 'right', labelCol = {} } = formContext;

  const labelClsBasic = `${prefixCls}-item-label`;
  const labelColClassName = classNames(
    labelClsBasic,
    labelAlign === 'left' && `${labelClsBasic}-left`,
    labelCol.className,
  );

  let labelChildren = title;
  if (colon && typeof title === 'string' && title.trim() !== '') {
    labelChildren = title.replace(/[：:]\s*$/, '');
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

  return title ? (
    <Col {...labelCol} className={labelColClassName}>
      <label
        className={labelClassName}
        htmlFor={id}
        onClick={handleLabelClick}
        title={typeof title === 'string' ? title : ''}
      >
        {/*{labelChildren}*/}
        <PageHeader
          title={labelChildren}
          subTitle={description}
          style={{ marginBottom: 20, borderBottom: '1px solid #e5e5e5' }}
        />
      </label>
    </Col>
  ) : null;
};

TitleField.defaultProps = {
  formContext: {},
};

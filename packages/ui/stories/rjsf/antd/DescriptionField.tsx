import React from 'react';
import { Field } from '@rjsf/core';
import { Col, Row } from 'antd';
// import PropTypes from 'prop-types';

export const DescriptionField: Field = ({
  // autofocus,
  description,
  // disabled,
  // errorSchema,
  // formContext,
  // formData,
  id,
  // idSchema,
  // name,
  // onChange,
  // readonly,
  // registry,
  // required,
  // schema,
  // uiSchema,
}) => {
  return (
    <Row id={id}>
      <Col offset={1}>{description}</Col>
    </Row>
  );
  // return <span id={id}>{description}</span>;
};

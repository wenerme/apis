import { Button, Col, Row } from 'antd';
import React from 'react';
import { ArrayFieldTemplateItem } from './ArrayFieldTemplateItem';
import { PlusCircleOutlined } from '@ant-design/icons/lib';

export const NormalArrayFieldTemplate = ({
  canAdd,
  className,
  DescriptionField,
  disabled,
  formContext,
  formData,
  idSchema,
  items,
  onAddClick,
  readonly,
  registry,
  required,
  schema,
  title,
  TitleField,
  uiSchema,
}) => (
  <fieldset className={className} id={idSchema.$id}>
    {title && (
      <TitleField
        id={`${idSchema.$id}__title`}
        key={`array-field-title-${idSchema.$id}`}
        required={required}
        title={uiSchema['ui:title'] || title}
      />
    )}

    {(uiSchema['ui:description'] || schema.description) && (
      <DescriptionField
        description={uiSchema['ui:description'] || schema.description}
        id={`${idSchema.$id}__description`}
        key={`array-field-description-${idSchema.$id}`}
      />
    )}

    {items && items.map(ArrayFieldTemplateItem)}

    {canAdd && (
      <Row
        gutter={24}
        // type="flex"
      >
        <Col style={{ flex: '1' }} />
        <Col style={{ width: '192px' }}>
          <Button
            className="array-item-add"
            disabled={disabled || readonly}
            onClick={onAddClick}
            style={{ width: '100%' }}
            type="primary"
          >
            <PlusCircleOutlined /> Add Item
          </Button>
        </Col>
      </Row>
    )}
  </fieldset>
);

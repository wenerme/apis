import _ from 'lodash';
import { Col, Row } from 'antd';
import React from 'react';
import { getUiOptions } from '@rjsf/core/lib/utils';
import { AddButton } from './AddButton';
import { ObjectFieldTemplateProps } from '@rjsf/core';
import { AntdThemeFormContext } from './layouts';

export const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps & any> = ({
  DescriptionField,
  TitleField,
  description,
  formContext,
  // formData,
  idSchema,
  properties,
  required,
  formData,
  schema,
  title,
  uiSchema,
  // not defined in typescript
  disabled,
  readonly,
  onAddClick,
}) => {
  const canExpand = function canExpand() {
    // const { formData, schema, uiSchema } = props;
    if (!schema.additionalProperties) {
      return false;
    }
    const { expandable } = getUiOptions(uiSchema) as any;
    if (expandable === false) {
      return expandable;
    }
    // if ui:options.expandable was not explicitly set to false, we can add
    // another property if we have not exceeded maxProperties yet
    if (schema.maxProperties !== undefined) {
      return Object.keys(formData).length < schema.maxProperties;
    }
    return true;
  };

  const { colSpan, rowGutter = 24 } = formContext as AntdThemeFormContext;

  const findSchema = (element) => element.content.props.schema;

  const findSchemaType = (element) => findSchema(element).type;

  const findUiSchema = (element) => element.content.props.uiSchema;

  const findUiSchemaField = (element) => findUiSchema(element)['ui:field'];

  const findUiSchemaWidget = (element) => findUiSchema(element)['ui:widget'];

  const getColProps = (e) => {
    if (Number.isInteger(colSpan)) {
      return { span: colSpan };
    }
    const type = findSchemaType(e);
    // no label
    if (type === 'boolean') {
      return { span: 18, offset: 6 };
    }
    return {};
  };
  const calculateColSpan = (element) => {
    if (Number.isInteger(colSpan)) {
      return colSpan;
    }

    const type = findSchemaType(element);
    const field = findUiSchemaField(element);
    const widget = findUiSchemaWidget(element);

    const defaultColSpan =
      properties.length < 2 || // Single or no field in object.
      type === 'object' ||
      type === 'array' ||
      widget === 'textarea'
        ? 24
        : 12;

    if (_.isObject(colSpan)) {
      return colSpan[widget] || colSpan[field] || colSpan[type] || defaultColSpan;
    }
    return defaultColSpan;
  };

  const filterHidden = (element) => element.content.props.uiSchema['ui:widget'] !== 'hidden';

  // FIXME onKeyChange cause title undefined - all title
  const _title = uiSchema['ui:title'] || title;
  const expand = canExpand();

  const _description = uiSchema['ui:description'] || description;
  return (
    <Row gutter={rowGutter}>
      <fieldset id={idSchema.$id} style={{ width: '100%' }}>
        {(_title || _description || expand) && (
          <TitleField
            id={`${idSchema.$id}-title`}
            description={_description}
            required={required}
            title={_title}
            extra={
              expand && (
                <AddButton
                  className="object-property-expand"
                  onClick={onAddClick(schema)}
                  disabled={disabled || readonly}
                />
              )
            }
          />
        )}

        {properties.filter(filterHidden).map((element) => (
          <Col
            key={element.name}
            // span={calculateColSpan(element)}
            {...getColProps(element)}
          >
            {element.content}
          </Col>
        ))}
      </fieldset>
    </Row>
  );
};

import { ArrayFieldTemplateProps, Widget } from '@rjsf/core';
import UnsupportedField from '@rjsf/core/lib/components/fields/UnsupportedField';

import {
  getDefaultRegistry,
  getUiOptions,
  getWidget,
  isFilesArray,
  isFixedItems,
  isMultiSelect,
  optionsList,
  retrieveSchema,
} from '@rjsf/core/lib/utils';

import React from 'react';
import { FixedArrayFieldTemplate } from './FixedArrayFieldTemplate';
import { NormalArrayFieldTemplate } from './NormalArrayFieldTemplate';

export const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
  DescriptionField,
  TitleField,
  // autofocus,
  canAdd,
  className,
  disabled,
  formContext,
  formData,
  idSchema,
  items,
  // label,
  // name,
  onAddClick,
  // onBlur,
  // onChange,
  // onFocus,
  // placeholder,
  // rawErrors,
  readonly,
  registry = getDefaultRegistry(),
  required,
  schema,
  title,
  uiSchema,
}) => {
  const { widgets } = registry;
  const rootSchema = (registry as any).rootSchema;
  const renderFiles = () => {
    const { widget = 'files', ...options } = getUiOptions(uiSchema) ?? {};

    const Widget = getWidget(schema, widget as Widget, widgets) as any; // todo assert

    return (
      <Widget
        // autofocus={autofocus}
        disabled={disabled}
        formContext={formContext}
        id={idSchema && idSchema.$id}
        multiple
        // onBlur={onBlur}
        // onChange={onChange}
        // onFocus={onFocus}
        // rawErrors={rawErrors}
        options={options}
        readonly={readonly}
        schema={schema}
        title={schema.title || name} // Why not props.title?
        value={formData}
      />
    );
  };

  const renderMultiSelect = () => {
    const itemsSchema = retrieveSchema(schema.items as any /* todo typing */, rootSchema, formData);
    const enumOptions = optionsList(itemsSchema);
    const { widget = 'select', ...options } = {
      ...getUiOptions(uiSchema),
      enumOptions,
    };

    const Widget = getWidget(schema, widget as any, widgets) as any; // todo typing

    return (
      <Widget
        // autofocus={autofocus}
        disabled={disabled}
        formContext={formContext}
        id={idSchema && idSchema.$id}
        multiple
        // label={label}
        // onBlur={onBlur}
        // onChange={onChange}
        // onFocus={onFocus}
        // placeholder={placeholder}
        // rawErrors={rawErrors}
        options={options}
        readonly={readonly}
        registry={registry}
        required={required}
        schema={schema}
        value={formData}
      />
    );
  };

  if (!Object.prototype.hasOwnProperty.call(schema, 'items')) {
    return <UnsupportedField idSchema={idSchema} reason="Missing items definition" schema={schema} />;
  }

  if (isFixedItems(schema)) {
    return (
      <FixedArrayFieldTemplate
        canAdd={canAdd}
        className={className}
        DescriptionField={DescriptionField}
        disabled={disabled}
        formContext={formContext}
        formData={formData}
        idSchema={idSchema}
        items={items}
        onAddClick={onAddClick}
        readonly={readonly}
        registry={registry}
        required={required}
        schema={schema}
        title={title}
        TitleField={TitleField}
        uiSchema={uiSchema}
      />
    );
  }
  if (isFilesArray(schema, uiSchema, rootSchema)) {
    return renderFiles();
  }
  if (isMultiSelect(schema, rootSchema)) {
    return renderMultiSelect();
  }

  return (
    <NormalArrayFieldTemplate
      canAdd={canAdd}
      className={className}
      DescriptionField={DescriptionField}
      disabled={disabled}
      formContext={formContext}
      formData={formData}
      idSchema={idSchema}
      items={items}
      onAddClick={onAddClick}
      readonly={readonly}
      registry={registry}
      required={required}
      schema={schema}
      title={title}
      TitleField={TitleField}
      uiSchema={uiSchema}
    />
  );
};

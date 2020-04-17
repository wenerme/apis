import { DescriptionField } from './DescriptionField';
import { TitleField } from './TitleField';
import { ThemeProps } from '@rjsf/core';
import { ErrorList } from './ErrorList';
import { getDefaultRegistry } from '@rjsf/core/lib/utils';
import { ArrayFieldTemplate } from './ArrayFieldTemplate';
import { UpDownWidget } from './UpDownWidget';
import { TextareaWidget } from './TextareaWidget';
import { TextWidget } from './TextWidget';
import { SelectWidget } from './SelectWidget';
import { RangeWidget } from './RangeWidget';
import { RadioWidget } from './RadioWidget';
import { PasswordWidget } from './PasswordWidget';
import { DateWidget } from './DateWidget';
import { DateTimeWidget } from './DateTimeWidget';
import { ColorWidget } from './ColorWidget';
import { CheckboxesWidget } from './CheckboxesWidget';
import { CheckboxWidget } from './CheckboxWidget';
import { ObjectFieldTemplate } from './ObjectFieldTemplate';
import { FieldTemplate } from './FieldTemplate';

const { fields, widgets } = getDefaultRegistry();

export const Fields = {
  DescriptionField,
  TitleField,
};
export const Widgets = {
  CheckboxesWidget,
  CheckboxWidget,
  ColorWidget,
  DateTimeWidget,
  DateWidget,
  PasswordWidget,
  RadioWidget,
  RangeWidget,
  SelectWidget,
  TextareaWidget,
  TextWidget,
  UpDownWidget,
};
export const AntdRjsfTheme: ThemeProps = {
  ArrayFieldTemplate,
  fields: { ...fields, ...Fields },
  FieldTemplate,
  ObjectFieldTemplate,
  widgets: { ...widgets, ...Widgets },
  ErrorList,
};

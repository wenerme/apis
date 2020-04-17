export const ArrayActionColProps = {
  span: 4,
  lg: 5,
  xl: 4,
  xxl: 3,
};

export interface AntdThemeFormContext {
  colon?;
  labelCol?;
  wrapperCol?;
  wrapperStyle?;
  readonlyAsDisabled?: boolean;

  labelSpan?;
  rowGutter?;

  /**
   * @deprecated
   */
  colSpan?;
}

export function getTextFromContext(formContext, text) {
  return formContext.texts?.[text] ?? text;
}

import { EditableProps } from 'slate-react/dist/components/editable';
import React from 'react';
import { ReactEditor } from 'slate-react';

export interface RichEditor extends ReactEditor {
  editableProps: EditableProps;
  fragments: React.ReactNode[];
}

export type RichEditorPlugin = (editor: RichEditor) => RichEditor;
export type RichEditorPluginFactory = (...args) => RichEditorPlugin;

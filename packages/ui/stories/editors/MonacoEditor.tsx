import type monacoEditorApi from 'monaco-editor';
import React from 'react';
import Editor, { ControlledEditor, EditorProps, monaco } from '@monaco-editor/react';

export type MonacoApi = typeof monacoEditorApi;
export type MonacoCodeEditor = monacoEditorApi.editor.IStandaloneCodeEditor;
export type MonacoDiffEditor = monacoEditorApi.editor.IStandaloneDiffEditor;

export interface MonacoEditorProps extends Omit<EditorProps, 'editorDidMount' | 'onChange'> {
  editorDidMount?: (editor: MonacoCodeEditor, monaco: MonacoApi) => void;
  value?: string;
  onChange?: (v: string, e: monacoEditorApi.editor.IModelContentChangedEvent) => void;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({
  editorDidMount,
  loading: fallback,
  value,
  onChange,
  ...props
}) => {
  const [loading, setLoading] = React.useState(!window['monaco']);

  const editorRef = React.useRef<MonacoCodeEditor>();
  const monacoRef = React.useRef<MonacoApi>();

  React.useEffect(() => {
    if (window['monaco']) {
      monacoRef.current = window['monaco'];
      setLoading(false);
      return;
    }

    (async () => {
      console.time(`Load monaco`);
      const builder: any = monaco;
      monacoRef.current = await builder.config({ 'vs/nls': { availableLanguages: { '*': 'zh-cn' } } }).init();
      setLoading(false);
      console.timeEnd(`Load monaco`);
    })();
  }, []);
  if (loading) {
    return (fallback as any) || <div>Loading</div>;
  }
  const onEditorMount = (getValue, editor) => {
    editorRef.current = editor;
    editorDidMount?.(editorRef.current!, monacoRef.current!);
  };

  if (!onChange) {
    return <Editor value={value} editorDidMount={onEditorMount} {...props} />;
  }
  return (
    <ControlledEditor
      value={value}
      onChange={(e, v) => v && onChange(v, e)}
      editorDidMount={onEditorMount}
      {...props}
    />
  );
};

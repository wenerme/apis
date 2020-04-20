import React from 'react';
import { MonacoApi, MonacoCodeEditor, MonacoEditor } from './MonacoEditor';

export default {
  title: 'editors/monaco/amd',
};

export const DynamicLoadDemo = () => {
  const ref = React.useRef<[MonacoCodeEditor, MonacoApi]>();
  const [value, setValue] = React.useState('{"name":"wener"}');
  return (
    <div>
      <div>
        <button onClick={() => ref.current?.[0].getAction('editor.action.formatDocument')?.run()}>Format</button>
      </div>
      <MonacoEditor
        value={value}
        onChange={(v) => setValue(v)}
        language="json"
        theme="vs-dark"
        height={640}
        editorDidMount={(...args) => (ref.current = args)}
      />
    </div>
  );
};

import React, {useEffect, useState} from 'react'
import Editor from 'react-simple-code-editor';
import {usePrismLanguage} from 'hooks/prism';

export const SimpleCodeEditor: React.FC<{ value, onChange, language, theme? }> = ({value, onChange, language, theme = 'prism'}) => {
  const [highlight, setHighlight] = useState(null);
  const {grammar, Prism} = usePrismLanguage(language);
  useEffect(() => {
    if (grammar) {
      setHighlight(() => {
        return v => Prism.highlight(v, grammar);
      })
    }
  }, [grammar]);
  return (
    <Editor
      value={value}
      onValueChange={onChange}
      highlight={highlight ?? (code => code)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  )
};


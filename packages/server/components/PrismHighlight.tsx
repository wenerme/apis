import React, { useEffect, useRef } from 'react';
import { usePrismLanguage } from 'hooks/prism';

export const PrismHighlight: React.FC<{ code; language }> = ({ code: content, language }) => {
  const { grammar, Prism } = usePrismLanguage(language || 'html');
  const ref = useRef();
  useEffect(() => {
    if (grammar && content) {
      Prism.highlightElement(ref.current);
    }
  }, [content, grammar]);
  return (
    <pre>
      <code ref={ref} className={`language-${language}`}>{content}</code>
    </pre>
  );
};

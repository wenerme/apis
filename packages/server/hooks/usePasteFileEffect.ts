import { useEffect } from 'react';
import { getFile } from 'utils/transfers';

export function usePasteFileEffect(opts: { onFile: (e: { file: File; filename: string }) => void }) {
  const { onFile } = opts;
  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const clipboardData: DataTransfer =
        e.clipboardData || window['clipboardData'] || e['originalEvent']?.['clipboardData'];
      const res = getFile(clipboardData);
      if (res) {
        onFile(res);
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);
}

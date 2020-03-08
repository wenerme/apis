import {useEffect} from 'react';

export function usePasteFileEffect(opts: {
  onFile: (e: { file: File, filename: string }) => void,
}) {
  const {onFile} = opts;
  useEffect(() => {
    const onPaste = async (e: ClipboardEvent) => {
      const clipboardData: DataTransfer = e.clipboardData || window['clipboardData'] || e['originalEvent']?.['clipboardData'];
      const items: DataTransferItemList = clipboardData?.items ?? [] as any;

      if (items.length >= 2 && items[0].kind === 'string' && items[1].kind === 'file') {
        const text = clipboardData.getData('text');
        const file = items[1].getAsFile() ?? clipboardData.files?.item(0);
        if (!file) {
          console.error(`no file ${text}`, items[1]);
          return
        }

        // let type = file.type;
        // // fix type
        // type = type;
        // // NOTE paste file can not parse by libs
        // if (type !== file.type) {
        //   const blob = file.slice(0, file.size);
        //   file = new File([blob], text, {type});
        // }

        onFile({file, filename: text})
      } else if (items[0].kind === 'file') {
        const file = items[0].getAsFile();
        onFile({file, filename: file.name})
      } else {
        console.debug(`paste item not match`, [...items].map(v => ({type: v.type, kind: v.kind})));
      }
    };

    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
  }, []);
}

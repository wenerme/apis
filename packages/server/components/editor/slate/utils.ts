import {Editor, Transforms} from 'slate';

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
};
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false
};
export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });
  return !!match
};

const ListTypes = ['numbered-list', 'bulleted-list'];
export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = ListTypes.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => ListTypes.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = {type: format, children: []};
    Transforms.wrapNodes(editor, block)
  }
};

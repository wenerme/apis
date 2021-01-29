import { useFocused, useSelected } from 'slate-react';
import React, { useCallback, useState } from 'react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { Range, Transforms } from 'slate';

export const withMentions = () => (editor) => {
  const { isInline, isVoid } = editor;
  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element);
  };
  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  const editableProps: EditableProps = editor.editableProps ?? {};
  const { renderElement } = editableProps;
  editableProps.renderElement = (props) => {
    if (props.element.type === 'mention') {
      return <MentionElement {...props} />;
    }
    return renderElement(props);
  };
  return editor;
};

const MentionElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      style={{
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
      }}
    >
      @{element.character}
      {children}
    </span>
  );
};

export const insertMention = (editor, character) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

export function useMentionState({ editor }) {
  const [target, setTarget] = useState<Range>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  const chars = ['wener', 'wahaha', 'wasai', 'cyw', 'ceco', 'xxx', 'xyz', '你好']
    .filter((c) => c.toLowerCase().startsWith(search.toLowerCase()))
    .slice(0, 10);

  const onKeyDown = useCallback(
    (event) => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown': {
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          }
          case 'ArrowUp': {
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          }
          case 'Tab':
          case 'Enter':
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case 'Escape':
            event.preventDefault();
            setTarget(null);
            break;
          default:
            return false;
        }
      }
    },
    [index, search, target],
  );
}

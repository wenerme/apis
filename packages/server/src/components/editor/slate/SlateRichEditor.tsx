import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from 'antd';
import {
  BoldOutlined,
  CodeOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  ItalicOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons/lib';
import { Editable, ReactEditor, Slate, useEditor, useReadOnly, useSlate, withReact } from 'slate-react';
import { createEditor, Editor, Node, Point, Range, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import ReactDOM from 'react-dom';
import { flow } from 'lodash';
import { withMarkdownShortcuts } from './withMarkdownShortcuts';
import { withRender } from './withRender';
import { useMentionState, withMentions } from './withMentions';
import { RichEditor, RichEditorPluginFactory } from './types';
import { isBlockActive, isMarkActive, toggleBlock, toggleMark } from './utils';
import { css } from 'emotion';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

export const Portal = ({ children }) => {
  let container;
  if (typeof window !== 'undefined') {
    const rootContainer = document.createElement('div');
    const parentElem = document.querySelector('#__next') ?? document.body;
    parentElem.appendChild(rootContainer);
    container = rootContainer;
  }

  // return ReactDOM.createPortal(children, document.body)
  return container ? ReactDOM.createPortal(children, container) : null;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      type={isBlockActive(editor, format) ? 'primary' : null}
      icon={icon}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    ></Button>
  );
};
const MarkButton = ({ format, icon, ...props }) => {
  const editor = useSlate();
  return (
    <Button
      type={isMarkActive(editor, format) ? 'primary' : null}
      icon={icon}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    ></Button>
  );
};

export const Toolbar = React.forwardRef<any, any>(({ className, ...props }, ref) => (
  <div
    {...props}
    ref={ref}
    // className={cx(
    //   className,
    //   css`
    //     position: relative;
    //     padding: 1px 18px 17px;
    //     margin: 0 -20px;
    //     border-bottom: 2px solid #eee;
    //     margin-bottom: 20px;
    //   `
    // )}
  />
));

const insertMention = (editor, character) => {
  const mention = { type: 'mention', character, children: [{ text: '' }] };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const withChecklists: RichEditorPluginFactory = () => (editor) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [match] = Editor.nodes(editor, {
        match: (n) => n.type === 'check-list-item',
      });

      if (match) {
        const [, path] = match;
        const start = Editor.start(editor, path);

        if (Point.equals(selection.anchor, start)) {
          Transforms.setNodes(editor, { type: 'paragraph' }, { match: (n) => n.type === 'check-list-item' });
          return;
        }
      }
    }

    deleteBackward(...args);
  };

  const { renderElement } = editor.editableProps;
  editor.editableProps.renderElement = (props) => {
    if (props.element.type === 'check-list-item') {
      return <CheckListItemElement {...props} />;
    }
    return renderElement(props);
  };

  return editor;
};

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = String(1);
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  const marks = [
    { format: 'bold', icon: <BoldOutlined /> },
    { format: 'italic', icon: <ItalicOutlined /> },
    { format: 'underline', icon: <UnderlineOutlined /> },
    { format: 'strike-through', icon: <StrikethroughOutlined /> },
    { format: 'code', icon: <CodeOutlined /> },
  ];

  return (
    <Portal>
      <div
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        {marks.map(({ format, icon }) => (
          <MarkButton key={format} format={format} icon={icon} />
        ))}
      </div>
    </Portal>
  );
};

const withLayout = () => (editor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title = { type: 'heading-one', children: [{ text: 'Untitled' }] };
        Transforms.insertNodes(editor, title, { at: path.concat(0) });
      }

      if (editor.children.length < 2) {
        const paragraph = { type: 'paragraph', children: [{ text: '' }] };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      }

      for (const [child, childPath] of Node.children(editor, path)) {
        const type = childPath[0] === 0 ? 'title' : 'paragraph';

        if (child.type !== type) {
          Transforms.setNodes(editor, { type }, { at: childPath });
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

const CheckListItemElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const readOnly = useReadOnly();
  const { checked } = element;
  return (
    <div
      {...attributes}
      className={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        & + & {
          margin-top: 0;
        }
      `}
    >
      <span
        contentEditable={false}
        className={css`
          margin-right: 0.75em;
        `}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const path = ReactEditor.findPath(editor, element);
            Transforms.setNodes(editor, { checked: event.target.checked }, { at: path });
          }}
        />
      </span>
      <span
        contentEditable={!readOnly}
        suppressContentEditableWarning
        className={css`
          flex: 1;
          opacity: ${checked ? 0.666 : 1};
          text-decoration: ${checked ? 'none' : 'line-through'};
          &:focus {
            outline: none;
          }
        `}
      >
        {children}
      </span>
    </div>
  );
};

export const SlateRichEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement>();

  const editor: RichEditor = useMemo(
    () =>
      flow([withReact, withHistory, withRender(), withChecklists(), withMentions(), withMarkdownShortcuts()])(
        createEditor(),
      ),
    [],
  );
  useMentionState({ editor });
  useEffect(() => {
    window['editor'] = editor;
  }, []);

  const { editableProps, fragments } = editor;
  const [value, setValue] = useState<any[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },

    {
      type: 'check-list-item',
      checked: true,
      children: [{ text: 'Slide to the left.' }],
    },
    {
      type: 'check-list-item',
      checked: true,
      children: [{ text: 'Slide to the right.' }],
    },
    {
      type: 'check-list-item',
      checked: false,
      children: [{ text: 'Criss-cross.' }],
    },
    {
      type: 'check-list-item',
      checked: true,
      children: [{ text: 'Criss-cross!' }],
    },
    {
      type: 'check-list-item',
      checked: false,
      children: [{ text: 'Cha cha real smooth…' }],
    },
    {
      type: 'check-list-item',
      checked: false,
      children: [{ text: "Let's go to work!" }],
    },
    {
      children: [{ text: 'Try it out for yourself!' }],
    },
  ]);

  const [target, setTarget] = useState<Range>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  const chars = ['wener', 'wahaha', 'wasai', 'cyw', 'ceco', 'xxx', 'xyz']
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
  useEffect(() => {
    if (target && chars.length > 0 && ref.current) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars.length, editor, index, search, target]);

  // fixme fix icon
  const blocks = [
    { format: 'heading-one', icon: <FieldBinaryOutlined /> },
    { format: 'heading-two', icon: <FieldNumberOutlined /> },
    { format: 'block-quote', icon: <MenuUnfoldOutlined /> },
    { format: 'numbered-list', icon: <OrderedListOutlined /> },
    { format: 'bulleted-list', icon: <UnorderedListOutlined /> },
  ];
  const marks = [
    { format: 'bold', icon: <BoldOutlined /> },
    { format: 'italic', icon: <ItalicOutlined /> },
    { format: 'underline', icon: <UnderlineOutlined /> },
    { format: 'strike-through', icon: <StrikethroughOutlined /> },
    { format: 'code', icon: <CodeOutlined /> },
  ];
  return (
    <Slate
      editor={editor}
      value={value}
      // onChange={value => setValue(value)}
      onChange={(value) => {
        setValue(value);
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: 'word' });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch(beforeMatch[1]);
            setIndex(0);
            return;
          }
        }

        setTarget(null);
      }}
    >
      <Toolbar>
        <Button.Group>
          {marks.map(({ format, icon }) => (
            <MarkButton key={format} format={format} icon={icon} />
          ))}
          {blocks.map(({ format, icon }) => (
            <BlockButton key={format} format={format} icon={icon} />
          ))}
        </Button.Group>
      </Toolbar>
      <HoveringToolbar />
      <Editable
        autoFocus
        {...editableProps}
        onKeyDown={(event) => {
          if (onKeyDown(event) !== false) {
            return;
          }
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
              return;
            }
          }

          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(editor, {
              match: (n) => n.type === 'code',
            });
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              { type: match ? 'paragraph' : 'code' },
              { match: (n) => Editor.isBlock(editor, n) },
            );
          }
        }}
      />
      {fragments}
      {target && chars.length > 0 && (
        <Portal>
          <div
            ref={ref}
            style={{
              top: '-9999px',
              left: '-9999px',
              position: 'absolute',
              zIndex: 1,
              padding: '3px',
              background: 'white',
              borderRadius: '4px',
              boxShadow: '0 1px 5px rgba(0,0,0,.2)',
            }}
          >
            {chars.map((char, i) => (
              <div
                key={char}
                style={{
                  padding: '1px 3px',
                  borderRadius: '3px',
                  background: i === index ? '#B4D5FF' : 'transparent',
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </Portal>
      )}
    </Slate>
  );
};

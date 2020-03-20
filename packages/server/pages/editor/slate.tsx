import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {PageLayout} from 'components/layout/PageLayout/PageLayout';
import {PageContent} from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import {Button, PageHeader} from 'antd';
import {
  BoldOutlined,
  CodeOutlined,
  EditOutlined,
  FieldBinaryOutlined,
  FieldNumberOutlined,
  ItalicOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined
} from '@ant-design/icons/lib';
import {Editable, ReactEditor, Slate, useFocused, useSelected, useSlate, withReact} from 'slate-react';
import {createEditor, Editor, Point, Range, Transforms} from 'slate';
import {withHistory} from 'slate-history'
import isHotkey from 'is-hotkey';
import ReactDOM from 'react-dom';
import {flow} from 'lodash';
import {SlateMarkdownEditor} from 'components/editor/slate/SlateMarkdownEditor';


const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
};


const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};
const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
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
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false
};


const Element = (props) => {
  const {attributes, children, element} = props;
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'mention':
      return <MentionElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>
  }
};

const Leaf = ({attributes, children, leaf}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf['strike-through']) {
    children = <s>{children}</s>
  }

  return <span {...attributes}>{children}</span>
};

export const Portal = ({children}) => {
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

const BlockButton = ({format, icon}) => {
  const editor = useSlate();
  return (
    <Button
      type={isBlockActive(editor, format) ? 'primary' : null}
      icon={icon}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format)
      }}
    >
    </Button>
  )
};
const MarkButton = ({format, icon}) => {
  const editor = useSlate();
  return (
    <Button
      type={isMarkActive(editor, format) ? 'primary' : null}
      icon={icon}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format)
      }}
    >
    </Button>
  )
};
const withMentions = editor => {
  const {isInline, isVoid} = editor;

  editor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element)
  };

  editor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element)
  };

  return editor
};


const withShortcuts = editor => {
  const {deleteBackward, insertText} = editor;

  editor.insertText = text => {
    const {selection} = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const {anchor} = selection;
      const block = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = {anchor, focus: start};
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          {type},
          {match: n => Editor.isBlock(editor, n)}
        );

        if (type === 'list-item') {
          const list = {type: 'bulleted-list', children: []};
          Transforms.wrapNodes(editor, list, {
            match: n => n.type === 'list-item',
          })
        }

        return
      }
    }

    insertText(text)
  };

  editor.deleteBackward = (...args) => {
    const {selection} = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: n => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, {type: 'paragraph'});

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: n => n.type === 'bulleted-list',
              split: true,
            })
          }

          return
        }
      }

      deleteBackward(...args)
    }
  };

  return editor
};


export const Toolbar = React.forwardRef<any, any>(({className, ...props}, ref) => (

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
  const mention = {type: 'mention', character, children: [{text: ''}]};
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor)
};

const MentionElement = ({attributes, children, element}) => {
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
  )
};

const DemoPageContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>();
  const editor = useMemo(() => flow([withReact, withHistory, withMentions, withShortcuts])(createEditor()), []);
  const [value, setValue] = useState<any[]>([
    {
      type: 'paragraph',
      children: [{text: 'A line of text in a paragraph.'}],
    },
  ]);

  const [target, setTarget] = useState<Range>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');

  const chars = ['wener', 'wahaha', 'wasai', 'cyw', 'ceco', 'xxx', 'xyz'].filter(c =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  const onKeyDown = useCallback(
    event => {
      if (target) {
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case 'ArrowUp':
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
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
            return false
        }
      }
    },
    [index, search, target]
  );
  useEffect(() => {
    if (target && chars.length > 0 && ref.current) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`
    }
  }, [chars.length, editor, index, search, target]);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  // fixme fix icon
  const blocks = [
    {format: 'heading-one', icon: <FieldBinaryOutlined />},
    {format: 'heading-two', icon: <FieldNumberOutlined />},
    {format: 'block-quote', icon: <MenuUnfoldOutlined />},
    {format: 'numbered-list', icon: <OrderedListOutlined />},
    {format: 'bulleted-list', icon: <UnorderedListOutlined />},
  ];
  const marks = [
    {format: 'bold', icon: <BoldOutlined />},
    {format: 'italic', icon: <ItalicOutlined />},
    {format: 'underline', icon: <UnderlineOutlined />},
    {format: 'strike-through', icon: <StrikethroughOutlined />},
    {format: 'code', icon: <CodeOutlined />},
  ];
  return (
    <Slate
      editor={editor} value={value}
      // onChange={value => setValue(value)}
      onChange={value => {
        setValue(value);
        const {selection} = editor;

        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, {unit: 'word'});
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
            return
          }
        }

        setTarget(null)
      }}
    >
      <Toolbar>
        <Button.Group>
          {marks.map(({format, icon}) => <MarkButton key={format} format={format} icon={icon} />)}
          {blocks.map(({format, icon}) => <BlockButton key={format} format={format} icon={icon} />)}
        </Button.Group>
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        autoFocus
        onKeyDown={event => {
          if (onKeyDown(event) !== false) {
            return;
          }
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
              return
            }
          }

          if (event.key === '`' && event.ctrlKey) {
            event.preventDefault();
            // Determine whether any of the currently selected blocks are code blocks.
            const [match] = Editor.nodes(editor, {
              match: n => n.type === 'code',
            });
            // Toggle the block type depending on whether there's already a match.
            Transforms.setNodes(
              editor,
              {type: match ? 'paragraph' : 'code'},
              {match: n => Editor.isBlock(editor, n)}
            )
          }
        }}
      />

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
  )
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>Slate Editor Demo</title>
          <meta name="description" content="Slate 编辑器演示页面" />
          <meta name="keywords" content="slate demo" />
        </Head>
        <PageHeader
          title={
            <div>
              <EditOutlined style={{marginRight: 8}} />
              Slatejs
            </div>
          }
          backIcon={false}
        />

        {/*<DemoPageContent />*/}
        <SlateMarkdownEditor />

      </PageContent>
    </PageLayout>
  )
};
export default Page

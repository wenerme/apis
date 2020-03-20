import Prism from 'prismjs'
import React, {useCallback, useMemo, useState} from 'react'
import {Editable, Slate, withReact} from 'slate-react'
import {createEditor, Text} from 'slate'
import {withHistory} from 'slate-history'
import {css} from 'emotion'
import 'prismjs/components/prism-markdown.js'
import 'prismjs/components/prism-clike.js'
import 'prismjs/components/prism-javascript.js'

/// NOTE Can only process simple preview
export const SlateMarkdownEditor: React.FC = () => {
  const [value, setValue] = useState<any>(initialValue);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const decorate = useCallback(([node, path]) => {
    const ranges = [];

    if (!Text.isText(node)) {
      return ranges
    }

    const getLength = token => {
      if (typeof token === 'string') {
        return token.length
      } else if (typeof token.content === 'string') {
        return token.content.length
      } else {
        return token.content.reduce((l, t) => l + getLength(t), 0)
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    console.log(`tokens`, tokens);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== 'string') {
        ranges.push({
          // pass down token
          token,
          // styling
          [token.type]: true,
          anchor: {path, offset: start},
          focus: {path, offset: end},
        })
      }

      start = end
    }

    return ranges
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        placeholder="Write some markdown..."
      />
    </Slate>
  )
};

const Leaf = ({attributes, children, leaf}) => {
  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && 'bold'};
        font-style: ${leaf.italic && 'italic'};
        text-decoration: ${leaf.underlined && 'underline'};
        ${leaf.url &&
      css`
            color: #3883fa;
            text-decoration: underline;
          `}
        ${leaf.title &&
      css`
            display: inline-block;
            font-weight: bold;
            font-size: 20px;
            margin: 20px 0 10px 0;
          `}
        ${leaf.list &&
      css`
            padding-left: 10px;
            font-size: 20px;
            line-height: 10px;
          `}
        ${leaf.hr &&
      css`
            display: block;
            text-align: center;
            border-bottom: 2px solid #ddd;
          `}
        ${leaf.blockquote &&
      css`
            display: inline-block;
            border-left: 2px solid #ddd;
            padding-left: 10px;
            color: #aaa;
            font-style: italic;
          `}
        ${leaf.code &&
      css`
            font-family: monospace;
            background-color: #eee;
            padding: 3px;
          `}
      `}
    >
      {children}
    </span>
  )
};

const initialValue = [
  {
    children: [
      {
        text:
          `
# Markdown preview editor

[__Slate__](https://www.slatejs.org/) support _decorate_ to change the render leaf. \`easy\` to process !

\`\`\`js
const name = 'wener'
console.log(name);
\`\`\`

Name | Age
----|----
wener | 18
xxx | 16

> Slate editor

1. good
  * this one
2. bad
`,
      },
    ],
  },
  {
    children: [{text: '## Try it out!'}],
  },
  {
    children: [{text: 'Try it out for yourself!'}],
  },
];

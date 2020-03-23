import React, { useEffect, useState } from 'react';
import { PageLayout } from 'components/layout/PageLayout/PageLayout';
import { PageContent } from 'components/layout/PageLayout/PageContent';
import Head from 'next/head';
import { Button, Checkbox, Divider, PageHeader } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-menu/style/menu.css';
import 'prosemirror-gapcursor/style/gapcursor.css';
import { createEditor, EditorInstance, ProseMirrorEditor } from 'components/editor/ProseMirrorEditor';
import { defaultMarkdownSerializer } from 'prosemirror-markdown';
import produce from 'immer';
import { DOMSerializer } from 'prosemirror-model';

const ProseMirrorEditorPageContent: React.FC = () => {
  // const editor = useEditor(() => createEditor({markdown: true, initialDoc: '# Hello Title\n content __here__ !'}));
  const [editor, setEditor] = useState<EditorInstance>(null);
  const [output, setOutput] = useState('');
  const [setting, setSetting] = useState({ markdown: false });

  const { markdown } = setting;
  const serialize = ({ markdown = setting.markdown } = {}) => {
    if (!editor) {
      return '';
    }
    if (markdown) {
      return defaultMarkdownSerializer.serialize(editor.state.doc);
    } else {
      const div = document.createElement('div');
      div.appendChild(DOMSerializer.fromSchema(editor.state.schema).serializeFragment(editor.state.doc.content));
      return div.innerHTML;
    }
  };
  const doOutput = () => {
    setOutput(serialize());
  };
  useEffect(() => {
    let neo: EditorInstance;
    if (markdown) {
      neo = createEditor({
        markdown: true,
        initialDoc: serialize({ markdown: true }) || '# Hello Title\n content __here__ !',
      });
    } else {
      neo = createEditor({
        markdown: false,
        initialDoc: serialize({ markdown: false }) || '<h1>Hello Title</h1><p>content <i>here</i> !</p>',
      });
    }
    window['editor'] = neo;
    setEditor(neo);
    setTimeout(doOutput, 60);
  }, [setting]);

  return (
    <div className="container">
      <div>
        <div
          style={{
            display: 'grid',
            columnGap: 12,
            alignItems: 'center',
            gridAutoFlow: 'column',
            gridTemplateColumns: 'repeat(auto-fit, 128px)',
          }}
        >
          <Button onClick={doOutput}>输出</Button>
          <Checkbox
            checked={markdown}
            onChange={(e) =>
              setSetting(
                produce((s) => {
                  s.markdown = e.target.checked;
                })
              )
            }
          >
            Markdown
          </Checkbox>
        </div>
        {editor && <ProseMirrorEditor editor={editor} style={{ minHeight: 300 }} />}
      </div>
      <div>
        <Divider>输出内容</Divider>
        <textarea readOnly style={{ width: '100%' }} rows={20} value={output} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
        }
        .container > div {
          flex: 1;
          margin: 8px;
        }
        @media (max-width: 767.98px) {
          .container {
            flex-flow: column;
          }
        }
      `}</style>
    </div>
  );
};

const Page = () => {
  return (
    <PageLayout>
      <PageContent>
        <Head>
          <title>ProseMirror</title>
          <meta name="description" content="ProseMirror React Demo" />
          <meta name="keywords" content="ProseMirror editor react" />
        </Head>
        <PageHeader
          title={
            <div>
              <EditOutlined style={{ marginRight: 8 }} />
              ProseMirror
            </div>
          }
          backIcon={false}
        />

        <ProseMirrorEditorPageContent />
      </PageContent>
    </PageLayout>
  );
};
export default Page;

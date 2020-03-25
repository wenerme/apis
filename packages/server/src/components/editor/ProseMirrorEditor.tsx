import React, { CSSProperties, useEffect, useRef } from 'react';
import { DOMParser, Node as ProsemirrorNode, Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { schema as basicSchema } from 'prosemirror-schema-basic';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { proseMirrorSetup } from './prosemirror/setup';
import { defaultMarkdownParser, schema as markdownSchema } from 'prosemirror-markdown';

export interface EditorInstance {
  state: EditorState;
}

export interface EditorOptions {
  markdown?: boolean;
  initialDoc?: ProsemirrorNode | string;
  schema?: Schema;
  state?: EditorState;
  plugins?: Plugin[];
}

export function createEditor(options: EditorOptions = {}): EditorInstance {
  const { markdown, initialDoc } = options;
  let { schema, state, plugins } = options;
  let initial: ProsemirrorNode = initialDoc && typeof initialDoc !== 'string' ? initialDoc : null;
  if (!state) {
    if (!schema) {
      if (!markdown) {
        schema = new Schema({
          nodes: addListNodes(basicSchema.spec.nodes as any, 'paragraph block*', 'block'),
          marks: basicSchema.spec.marks,
        });
        if (typeof initialDoc === 'string') {
          initial = DOMParser.fromSchema(schema).parse(new window.DOMParser().parseFromString(initialDoc, 'text/html'));
        }
      } else {
        schema = markdownSchema;
        if (typeof initialDoc === 'string') {
          initial = defaultMarkdownParser.parse(initialDoc);
        }
      }
    }
    if (!plugins) {
      plugins = proseMirrorSetup({ schema });
    }
    state = EditorState.create({
      doc: initial,
      schema,
      plugins,
    });
  }
  return {
    state,
  };
}

export function useEditor(editor?: EditorInstance | (() => EditorInstance)): EditorInstance {
  const editorRef = useRef<EditorInstance>();
  if (editorRef.current && (!editor || editor === editorRef.current)) {
    return editorRef.current;
  } else if (editor) {
    if (typeof editor === 'function') {
      editorRef.current = editor();
    } else {
      editorRef.current = editor;
    }
  } else {
    editorRef.current = createEditor();
  }
  return editorRef.current;
}

export const ProseMirrorEditor: React.FC<{
  style?: CSSProperties;
  editor: EditorInstance;
}> = ({ style, editor }) => {
  const viewWrapperRef = useRef();
  const viewRef = useRef<EditorView>();
  editor = useEditor(editor);
  useEffect(() => {
    const view = (viewRef.current = new EditorView(viewWrapperRef.current, {
      state: editor.state,
      dispatchTransaction: (tr) => {
        view.updateState((editor.state = editor.state.apply(tr)));
      },
      attributes: {
        // FIXME
        style: 'min-height:300px',
      },
    }));
    return () => {
      view.destroy();
    };
  }, [editor]);
  return <div ref={viewWrapperRef}></div>;
};

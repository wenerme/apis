import React, { useMemo } from 'react';
import { inlineJsonForm, jsonForm } from 'next-tinacms-json';
import ReactMarkdown from 'react-markdown';
import { InlineForm, InlineField, useInlineForm, InlineTextField } from 'react-tinacms-inline';
import { Wysiwyg } from '@tinacms/fields';
import { TinaField } from '@tinacms/form-builder';
import { Tina, TinaCMS, TinaForm } from 'tinacms';
import { useLocalJsonForm } from 'next-tinacms-json';
import { Button as TinaButton } from '@tinacms/styles';

export default {
  title: 'tinacms/Demo',
};
export const TinaDemo: React.FC = () => {
  const cms = useMemo(() => {
    const cms = new TinaCMS();
    cms.registerApi('git', new MockGit());
    return cms;
  }, []);

  return (
    <Tina cms={cms}>
      <Hello></Hello>
      <hr />
      <WrapInlineMarkdown
        jsonFile={{ fileRelativePath: 'inline-markdown', data: { title: 'markdown', content: '__bold__' } }}
      />
      <hr />
      <InlineFormDemo />
    </Tina>
  );
};

const ExtraFormTest: React.FC = () => {
  const [data] = useLocalJsonForm(
    { fileRelativePath: 'site', data: { version: '1.0.0' } },
    {
      fields: [
        {
          name: 'version',
          label: 'Version Number',
          component: 'text',
        },
      ],
    },
  );
  return (
    <div>
      Version <b>{data.version}</b> !
    </div>
  );
};

const InlineMarkdown: React.FC<{ jsonFile?; setIsEditing; isEditing }> = ({ jsonFile, setIsEditing, isEditing }) => {
  console.log('InlineMarkdown', jsonFile);
  // const { data } = jsonFile || {};
  const data = jsonFile;
  return (
    <div>
      <TinaField name="content" Component={({ input, meta }) => <input {...input} />}>
        <ReactMarkdown>{data?.content || '# no content'}</ReactMarkdown>
      </TinaField>
      <button onClick={() => setIsEditing(p => !p)}>{isEditing ? 'Preview' : 'Edit'}</button>
    </div>
  );
};

const WrapInlineMarkdown = inlineJsonForm(InlineMarkdown, {
  label: 'Wrap InlineMarkdown',
  fields: [
    {
      name: 'title',
      label: 'Content Title',
      component: 'text',
    },
    {
      name: 'content',
      label: 'Content Body',
      component: 'markdown',
    },
  ],
});

const FormEditor: React.FC = () => {
  const [data, form] = useLocalJsonForm({ fileRelativePath: 'inline', data: {} }, {});
  return <TinaForm form={form}>{props => <InlineMarkdown {...props} />}</TinaForm>;
};

const InlineFormDemo: React.FC = () => {
  const [data, form] = useLocalJsonForm(
    { fileRelativePath: 'InlineFormDemo', data: { title: 'Untitled inline', content: 'No content' } },
    {
      label: 'Inline Form Demo',
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
        },
        {
          name: 'content',
          label: 'Content',
          component: 'markdown',
        },
        {
          name: 'comment',
          label: 'Comment',
          component: 'text',
        },
      ],
    },
  );
  return (
    <InlineForm form={form}>
      <h2>InlineFormDemo</h2>
      <div>
        Comment <InlineTextField name="comment" />
      </div>
      <div>
        <InlineField name="title">
          {({ input, status }) => {
            if (status === 'active') {
              return <input type="text" {...input} />;
            }
            return <h1>{input.value}</h1>;
          }}
        </InlineField>
      </div>
      <div>
        <InlineField name="content">
          {({ input, status }) => {
            if (status === 'active') {
              return <Wysiwyg input={input} />;
            }
            return <ReactMarkdown source={input.value} />;
          }}
        </InlineField>
      </div>
      <div>
        <InlineEditToggle />
        <InlineSaveButton />
        <InlineResetButton />
      </div>
    </InlineForm>
  );
};

function InlineEditToggle() {
  const { status, activate, deactivate } = useInlineForm();
  const editing = status === 'active';
  return (
    <button
      onClick={() => {
        if (editing) deactivate();
        else activate();
      }}
    >
      {editing ? 'Preview' : 'Edit'}
    </button>
  );
}

function InlineSaveButton() {
  const { status, form } = useInlineForm();
  const editing = status === 'active';
  if (!editing) return null;
  return (
    <button
      onClick={() => {
        form.finalForm.submit();
      }}
    >
      Save
    </button>
  );
}

function InlineResetButton() {
  const { status, form } = useInlineForm();
  const editing = status === 'active';
  if (!editing) return null;
  return (
    <button
      onClick={() => {
        form.reset();
      }}
    >
      Reset
    </button>
  );
}

const Hello: React.FC = () => {
  const [data] = useLocalJsonForm(
    { fileRelativePath: 'hello', data: { name: 'wener' } },
    {
      fields: [
        {
          name: 'name',
          label: 'Hello Name',
          component: 'text',
        },
      ],
    },
  );
  console.log(`Hello data`, data);
  return (
    <div>
      Hello <b>{data.name}</b> !
      <hr />
      <ExtraFormTest />
    </div>
  );
};

class MockGit implements GitClient {
  records = {};
  saved = {};

  async commit(data) {
    console.log(`Commit`, data);
    data.files.forEach(v => (this.saved[v] = this.records[v]));
    return {};
  }
  async writeToDisk(data) {
    const { fileRelativePath, content } = data;
    console.log(`writeToDisk`, data);
    this.records[fileRelativePath] = content;
  }
  async writeMediaToDisk(data) {
    console.log(`writeMediaToDisk`, data);
  }
  async deleteFromDisk(data) {
    console.log(`deleteFromDisk`, data);
    delete this.records[data.relPath || data.fileRelativePath];
  }
  async push() {
    console.log(`push`);
  }
  async reset(data) {
    data.files.forEach(v => (this.records[v] = this.saved[v]));
  }
  async show(fileRelativePath) {
    // FXIME - fallback
    const content = this.records[fileRelativePath];

    console.log(`GIT show ${fileRelativePath}`, content);
    if (!content) {
      return {
        status: 'failure',
        message: 'content not found',
        fileRelativePath: fileRelativePath,
      };
    }
    return {
      fileRelativePath,
      status: 'success',
      content,
    };
  }
  async branch(name) {
    console.log(`GIT branch`, name);
  }
  async branches() {
    console.log(`GIT branches`);
  }
}

export interface GitClient {
  // 提交数据
  commit(data: { files: string[]; message?: string; name?: string; email?: string }): Promise<any>;

  /// git 推送
  push(): Promise<any>;

  /// 写文本数据
  writeToDisk(data: { fileRelativePath: string; content: string }): Promise<any>;

  /// 上传文件
  writeMediaToDisk(data: { directory: string; content: File }): Promise<any>;

  /// 删除文件 - 之后可能会使用 fileRelativePath
  deleteFromDisk(data: { relPath: string }): Promise<any>;

  /// 重置修改
  reset(data: { files: string[] });

  /// 获取文件内容
  show(fileRelativePath: string);

  /// 获取分支信息
  branch(name?: string);

  /// 分支列表 - 应该不是必须
  branches();
}

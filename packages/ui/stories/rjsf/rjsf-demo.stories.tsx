import Form, { withTheme } from '@rjsf/core';
import React, { useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import { useAntdTheme } from '../../src/antds/hooks';
import { Theme } from './antd/AntdTheme';
import styled from 'styled-components';
import { Button, Col, Row } from 'antd';

export default {
  title: 'rjsf/demo',
};

const schema: JSONSchema7 = {
  title: 'A registration form',
  description: 'A simple form example.',
  type: 'object',
  required: ['firstName', 'lastName'],
  properties: {
    firstName: {
      type: 'string',
      title: 'First name',
      default: 'Chuck',
    },
    lastName: {
      type: 'string',
      title: 'Last name',
    },
    age: {
      type: 'integer',
      title: 'Age',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};

const log = type => console.log.bind(console, type);

const ThemedForm = withTheme(Theme);

export const Demo = () => {
  return <Form schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')} />;
};

export const ThemedFormDemo = () => {
  useAntdTheme();
  return <ThemedForm schema={schema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')} />;
};

const nestedSchema: JSONSchema7 = {
  title: 'A list of tasks',
  type: 'object',
  required: ['title'],
  properties: {
    title: {
      type: 'string',
      title: 'Task list title',
    },
    tasks: {
      type: 'array',
      title: 'Tasks',
      items: {
        type: 'object',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            title: 'Title',
            description: 'A sample title',
          },
          details: {
            type: 'string',
            title: 'Task details',
            description: 'Enter the task details',
          },
          done: {
            type: 'boolean',
            title: 'Done?',
            default: false,
          },
        },
      },
    },
  },
};

export const Nested = () => {
  useAntdTheme();
  return (
    <ThemedForm schema={nestedSchema} onChange={log('changed')} onSubmit={log('submitted')} onError={log('errors')} />
  );
};

const PlaygroundDiv = styled.div``;
const playgrounds: Record<string, any> = require('./playground.json');
export const Playground = () => {
  useAntdTheme();
  const [play, setPlay] = useState(() => Object.values(playgrounds)[0]);
  const [data, setData] = useState(() => play.formData ?? {});
  // const [state,setState] = useImmer()
  const onPlay = play => {
    setData(play.formData ?? {});
    setPlay(play);
  };
  return (
    <PlaygroundDiv>
      <Row>
        <div>
          {Object.entries(playgrounds).map(([key, v]) => (
            <Button key={key} onClick={() => onPlay(v)} type={play === v ? 'primary' : 'link'} title={v.schema?.title}>
              {key.replace(/\.js$/, '')}
            </Button>
          ))}
        </div>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <div>
            <h3>JSON Schema</h3>
            <textarea style={{ width: '100%', minHeight: 300 }} value={JSON.stringify(play.schema, null, 2)} />
          </div>
          <div>
            <h3>UI Schema</h3>
            <textarea style={{ width: '100%', minHeight: 300 }} value={JSON.stringify(play.uiSchema, null, 2)} />
          </div>
        </Col>
        <Col span={16}>
          <ThemedForm
            schema={play.schema}
            formData={data}
            onChange={e => {
              log('change')(e);
              const { formData } = e;
              setData(formData);
            }}
            onSubmit={e => {
              log('submit')(e);
              const { formData } = e;
              setData(formData);
            }}
            onError={log('errors')}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button htmlType="submit" type="primary">
                提交
              </Button>
              <Button htmlType="reset">重置</Button>
            </div>
          </ThemedForm>
          <div>
            <h3>Form Data</h3>
            <textarea style={{ width: '100%', minHeight: 300 }} value={JSON.stringify(data, null, 2)} />
          </div>
        </Col>
      </Row>
    </PlaygroundDiv>
  );
};

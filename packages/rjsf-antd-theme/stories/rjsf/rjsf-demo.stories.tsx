import Form, { FormProps, withTheme } from '@rjsf/core';
import React, { useState } from 'react';
import { JSONSchema7 } from 'json-schema';
import { AntdRjsfTheme } from '../../src';
import styled from 'styled-components';
import { Button, Card, Col, Input, message, Row } from 'antd';
import produce from 'immer';

export default {
  title: 'rjsf/demo',
};

function useAntdTheme() {
  const href = 'https://unpkg.com/antd/dist/antd.min.css';
  const ele = document.querySelector(`link[href="${href}"]`);
  if (ele) {
    return;
  }
  const el = document.createElement('link');
  el.rel = 'stylesheet';
  el.href = href;
  document.head.appendChild(el);
}

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

const log = (type) => console.log.bind(console, type);

const ThemedForm: React.ComponentType<FormProps<any>> = withTheme(AntdRjsfTheme);

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

const PlaygroundDiv = styled.div`
  padding: 0 16px;
`;
const playgrounds: Record<string, any> = Object.assign({}, require('./playground.json'), require('./plays-more.json'));
export const Playground = () => {
  useAntdTheme();

  const getStateFromPlay = ([name, { uiSchema = {}, formData = {}, schema }]) => {
    return {
      name,
      uiSchema,
      formData,
      schema,
      schemaJson: JSON.stringify(schema, null, 2),
      formDataJson: JSON.stringify(formData, null, 2),
      uiSchemaJson: JSON.stringify(uiSchema, null, 2),
    };
  };
  const [state, setState] = useState(() => getStateFromPlay(Object.entries(playgrounds)[0]));
  const onPlay = ([name, play]) => {
    setState(
      produce((s) => {
        Object.assign(s, getStateFromPlay([name, play]));
      }),
    );
  };

  return (
    <PlaygroundDiv>
      <Row>
        <div>
          {Object.entries(playgrounds).map(([key, v]) => (
            <Button
              key={key}
              onClick={() => onPlay([key, v])}
              type={state.name === key ? 'primary' : 'link'}
              title={v.schema?.title}
            >
              {key.replace(/\.js$/, '')}
            </Button>
          ))}
        </div>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <div style={{ position: 'sticky', top: 0 }}>
            <Card
              title="JSON Schema"
              extra={
                <Button
                  type="primary"
                  onClick={() =>
                    setState(
                      produce((s) => {
                        try {
                          s.schema = JSON.parse(s.schemaJson);
                        } catch (e) {
                          message.error('Invalid json');
                        }
                      }),
                    )
                  }
                >
                  Apply
                </Button>
              }
            >
              <Input.TextArea
                style={{ width: '100%', minHeight: 300 }}
                value={state.schemaJson}
                onChange={(v) => {
                  const value = v.target.value;

                  setState(
                    produce((s) => {
                      s.schemaJson = value;
                    }),
                  );
                }}
              />
            </Card>
            <Card
              title="UI Schema"
              extra={
                <Button
                  type="primary"
                  onClick={() =>
                    setState(
                      produce((s) => {
                        try {
                          s.uiSchema = JSON.parse(s.uiSchemaJson);
                        } catch (e) {
                          message.error('Invalid json');
                        }
                      }),
                    )
                  }
                >
                  Apply
                </Button>
              }
            >
              <Input.TextArea
                style={{ width: '100%', minHeight: 150 }}
                value={state.uiSchemaJson}
                onChange={(v) => {
                  const value = v.target.value;

                  setState(
                    produce((s) => {
                      s.uiSchemaJson = value;
                    }),
                  );
                }}
              />
            </Card>
            <Card
              title="Form Data"
              extra={
                <Button
                  type="primary"
                  onClick={() =>
                    setState(
                      produce((s) => {
                        try {
                          s.formData = JSON.parse(s.formDataJson);
                        } catch (e) {
                          message.error('Invalid json');
                        }
                      }),
                    )
                  }
                >
                  Apply
                </Button>
              }
            >
              <Input.TextArea
                style={{ width: '100%', minHeight: 300 }}
                value={state.formDataJson}
                onChange={(v) => {
                  const value = v.target.value;
                  setState(
                    produce((s) => {
                      s.formDataJson = value;
                    }),
                  );
                }}
              />
            </Card>
          </div>
        </Col>
        <Col span={16}>
          <div style={{ position: 'sticky', top: 0 }}>
            <ThemedForm
              schema={state.schema}
              uiSchema={state.uiSchema}
              formContext={{
                texts: {
                  'Add Item': '添加',
                },
              }}
              formData={state.formData}
              onChange={(e) => {
                log('change')(e);
                const { formData } = e;
                setState(
                  produce((s) => {
                    s.formData = formData;
                    s.formDataJson = JSON.stringify(formData, null, 2);
                  }),
                );
              }}
              onSubmit={(e) => {
                log('submit')(e);
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
          </div>
        </Col>
      </Row>
    </PlaygroundDiv>
  );
};

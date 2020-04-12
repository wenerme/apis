import * as React from 'react';
import { useEffect, useState } from 'react';
import { Canvas as CraftCanvas, Editor, Frame, useEditor, useNode, UserComponent } from '@craftjs/core';
import { Card, Col, Input, InputNumber, Row, Slider } from 'antd';
import styled from 'styled-components';
import { Layers } from '@craftjs/layers';
import { useAntdTheme } from '../../antds';
import ContentEditable from 'react-contenteditable';

export default {
  title: 'craftjs/Demo',
};

// const TextComponent = ({ text }) => {
//   const {
//     connectors: { connect, drag },
//     isClicked,
//     setProp,
//   } = useNode(state => ({
//     isClicked: state.events.selected,
//   }));
//   return (
//     <div ref={dom => connect(drag(dom))}>
//       <h2>{text}</h2>
//       {isClicked ? (
//         <Modal>
//           <input type="text" value={text} onChange={e => setProp(e.target.value)} />
//         </Modal>
//       ) : null}
//     </div>
//   );
// };
//
// const Hero: React.FC<{ title? }> & { craft? } = ({ title, children }) => {
//   const {
//     connectors: { connect, drag },
//     setProp,
//     isClicked,
//   } = useNode(node => ({
//     isClicked: node.events.selected,
//   }));
//   return (
//     <div ref={dom => connect(drag(dom))}>
//       <h2
//         contentEditable={isClicked}
//         onKeyUp={e => {
//           setProp(props => {
//             props.title = e.target['innerText'];
//           });
//         }}
//       >
//         {title}
//       </h2>
//       <div>{children}</div>
//     </div>
//   );
// };
//
// const HeroToolbarSettings = () => {
//   const { setProp, text } = useNode(node => ({
//     text: node.data.props.text,
//   }));
//   return (
//     <div>
//       <h2>Hero settings</h2>
//       <input type="text" value={text} onChange={e => setProp(prop => (prop.text = e.target.value))} />
//     </div>
//   );
// };
//
// Hero.craft = {
//   related: {
//     toolbar: HeroToolbarSettings,
//   },
// };

const StyleSettings = () => {
  const { style, setProp } = useNode((node) => ({
    style: node.data.props.style ?? {},
  }));

  return (
    <div>
      <h2>Style</h2>
      <Row>
        <Col span={8}>font-size</Col>
        <Col span={16}>
          <Input
            value={style.fontSize}
            onChange={(e) => setProp((prop) => (prop.style = { ...style, fontSize: e.target.value }))}
          />
        </Col>
      </Row>
      <Row>
        <Col span={8}>background-color</Col>
        <Col span={16}>
          <Input
            value={style.backgroundColor ?? 'unset'}
            onChange={(e) => setProp((prop) => (prop.style = { ...style, backgroundColor: e.target.value }))}
          />
        </Col>
      </Row>
    </div>
  );
};

const HeaderSettings = () => {
  const { setProp, level } = useNode((node) => ({
    level: node?.data?.props?.level,
  }));
  return (
    <div>
      <h2>Header settings</h2>
      {/*<input type="text" value={text} onChange={e => setProp(prop => (prop.text = e.target.value))} />*/}

      <Row>
        <Col span={12}>
          {/*<Slider*/}
          {/*  min={1}*/}
          {/*  max={20}*/}
          {/*  onChange={this.onChange}*/}
          {/*  value={typeof inputValue === 'number' ? inputValue : 0}*/}
          {/*/>*/}

          <Slider
            min={1}
            max={6}
            value={level}
            onChange={(e) => setProp((prop) => (prop.level = parseInt(e[0] || e)))}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={1}
            max={6}
            style={{ margin: '0 16px' }}
            value={level}
            onChange={(e) => setProp((prop) => (prop.level = parseInt(e[0] || e)))}
          />
        </Col>
      </Row>
      <StyleSettings />
    </div>
  );
};
const HeaderComponent: UserComponent = ({ children, level = 1, ...props }) => {
  const Comp: 'h1' = `h${level}` as 'h1';
  const {
    connectors: { connect, drag },
    setProp,
    isClicked,
  } = useNode((node) => ({
    isClicked: node.events.selected,
  }));
  // return React.createElement(Comp, { ...props, ref: dom => connect(drag(dom)) }, children);
  return (
    <Comp ref={(ref) => connect(drag(ref as any))} {...props}>
      {children}
    </Comp>
  );
};
HeaderComponent.craft = {
  name: 'Header',
  defaultProps: {
    level: 1,
  },
  related: {
    toolbar: HeaderSettings,
  },
};

const ContainerComponent: UserComponent = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref as any))} style={{ padding: '8px 0' }} {...props}>
      {children}
    </div>
  );
};
ContainerComponent.craft = {
  name: 'Container',
  rules: {
    canMoveIn: () => true,
    canMoveOut: () => true,
  },
  related: {
    settings: StyleSettings,
  },
};

const CardComponent: UserComponent = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <Card
      ref={(ref) => connect(drag(ref as any))}
      title={
        <Canvas id="title">
          <TextComponent text="Title" />
        </Canvas>
      }
    >
      {children}
    </Card>
  );
};
CardComponent.craft = {
  name: 'Card',
};

const TextComponent: UserComponent = ({ text, ...props }) => {
  const {
    connectors: { connect, drag },
    setProp,
    selected,
    dragged,
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);
  useEffect(() => {
    !selected && setEditable(false);
  }, [selected]);

  return (
    <div ref={(ref) => connect(drag(ref))} onDoubleClick={(e) => setEditable(true)}>
      <ContentEditable
        style={props.style}
        disabled={!editable}
        onBlur={() => setEditable(false)}
        html={text}
        onChange={(e) => {
          setProp((props) => (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, '')));
        }}
        tagName="p"
      />
    </div>
  );
};
TextComponent.craft = {
  name: 'Text',
  defaultProps: {
    text: '文本内容',
  },
  rules: {
    canMoveIn: () => false,
    canMoveOut: () => false,
  },
  related: {
    toolbar: StyleSettings,
  },
};

const ButtonComponent: UserComponent = ({ children }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <button ref={(ref) => connect(drag(ref as any))}>
      <Canvas id="content" is={TextComponent}>
        <TextComponent text="Button" />
      </Canvas>
    </button>
  );
};
ButtonComponent.craft = {
  name: 'Button',
};
const InputComponent: UserComponent = ({ children, ...props }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <span ref={(ref) => connect(drag(ref as any))}>
      <Input {...props} />
    </span>
  );
};
InputComponent.craft = {
  name: 'Input',
  related: {
    settings() {
      const { placeholder, readOnly, setProp } = useNode((s) => {
        return {
          placeholder: s.data.props.placeholder,
          readOnly: s.data.props.readOnly ?? false,
        };
      });
      console.log(`readOnly`, readOnly);
      return (
        <div>
          <h3>INPUT</h3>
          <Row>
            <Col span={8}>placeholder</Col>
            <Col span={16}>
              <input
                type="text"
                value={placeholder}
                onChange={(e) => setProp((props) => (props.placeholder = e.target.value))}
              />
            </Col>
          </Row>
          <Row>
            <Col span={8}>readonly</Col>
            <Col span={16}>
              <input
                type="checkbox"
                checked={readOnly}
                onChange={(e) => {
                  setProp((props) => (props.readOnly = e.target.checked));
                }}
              />
            </Col>
          </Row>
        </div>
      );
    },
  },
};

const FieldComponent: UserComponent = ({ name, labelSpan, inputSpan }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <ContainerComponent>
      <Row>
        <Col span={labelSpan}>
          <Canvas id="text" is={TextComponent}>
            <TextComponent text="Label" />
          </Canvas>
        </Col>
        <Col span={inputSpan}>
          <Canvas id="input" is={InputComponent}>
            <InputComponent name={name} />
          </Canvas>
        </Col>
      </Row>
    </ContainerComponent>
  );
};
FieldComponent.craft = {
  name: 'Field',
  related: {
    settings: () => {
      const { name, setProp } = useNode((s) => {
        return { name: s.data.props.name };
      });
      return (
        <div>
          <h3>字段设置</h3>
          <Row>
            <Col span={8}>名字</Col>
            <Col span={16}>
              <Input value={name} onChange={(e) => setProp((props) => (props.name = e.target.value))} />
            </Col>
          </Row>
        </div>
      );
    },
  },
};

const components = {
  ContainerComponent,
  ButtonComponent,
  TextComponent,
  InputComponent,
  CardComponent,
  FieldComponent,
};

const Toolbar = () => {
  const { actions, connectors, selected, query } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected;
    if (currentNodeId) {
      const node = state.nodes[currentNodeId];
      selected = {
        id: currentNodeId,
        name: node.data.name ?? node.data.displayName,
        settings: node.related?.settings ?? node.related?.toolbar,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });
  return (
    <div>
      <Card title="工具">
        <button
          onClick={() => {
            window.prompt('JSON', JSON.stringify(JSON.parse(query.serialize()), null, 2));
          }}
        >
          保存
        </button>
        <button
          onClick={() => {
            const json = window.prompt('加载');
            if (json) {
              try {
                actions.deserialize(json);
              } catch (e) {
                alert('加载失败 ' + e);
              }
            }
          }}
        >
          加载
        </button>
      </Card>
      <Card title="组件">
        {Object.values(components).map((v) => (
          <button
            key={v.craft.name}
            ref={(ref) => connectors.create(ref, React.createElement(v, v.craft.defaultProps ?? {}))}
          >
            {v.craft.name}
          </button>
        ))}
      </Card>
      {selected && (
        <Card
          title={`组件 ${selected.name}`}
          extra={<div>{selected.isDeletable && <button onClick={() => actions.delete(selected.id)}>删除</button>}</div>}
        >
          {/*{selectedNodeId && toolbarSettings ? React.createElement(toolbarSettings) : null}*/}
          {selected.settings && React.createElement(selected.settings)}
        </Card>
      )}
      <div title="图层">
        <Layers />
      </div>
    </div>
  );
};

const EditorContainer = styled.div`
  .container {
    display: flex;
  }

  .canvas {
    flex: 1;

    .viewport {
      width: 720px;
      margin: 0 auto;
      box-shadow: 0px 0px 10px 0px black;
      padding: 32px;
    }
  }
  .toolbar {
    width: 360px;
  }
`;

// const Canvas = styled(CraftCanvas)`
//   &:hover {
//     border: 1px dashed lightblue;
//   }
// `;
const Canvas = CraftCanvas;

const App = () => {
  return (
    <EditorContainer>
      <div className="container">
        <Editor resolvers={components}>
          <div className="canvas">
            <div className="viewport">
              <Frame>
                <CraftCanvas is={ContainerComponent}>
                  {/*<Canvas is={CardComponent}></Canvas>*/}
                  <Canvas is={ContainerComponent}>
                    <Canvas is={HeaderComponent}>
                      <Canvas is={TextComponent} text="Hello there" />
                    </Canvas>
                  </Canvas>
                  <Canvas is={ContainerComponent}>
                    <Canvas is={TextComponent} text="Content is here" />
                  </Canvas>
                </CraftCanvas>
              </Frame>
            </div>
          </div>
          <div className="toolbar">
            <Toolbar />
          </div>
        </Editor>
      </div>
    </EditorContainer>
  );
};

export const SimpleDemo: React.FC = () => {
  useAntdTheme({ theme: 'light' });
  return (
    <div>
      <App></App>
    </div>
  );
};

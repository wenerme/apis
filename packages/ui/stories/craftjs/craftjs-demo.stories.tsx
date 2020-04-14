import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import { Canvas as CraftCanvas, Editor, Frame, useEditor, useNode, UserComponent } from '@craftjs/core';
import { Card, Col, Input, InputNumber, Row, Slider } from 'antd';
import styled from 'styled-components';
import { Layers } from '@craftjs/layers';
import { useAntdTheme } from '@wener/ui/src/antds';
import ContentEditable from 'react-contenteditable';
import { DeleteOutlined, DragOutlined, VerticalAlignTopOutlined } from '@ant-design/icons/lib';
import { useInternalNode } from '@craftjs/core/lib/nodes/useInternalNode';
import { NodeConnectors } from '@craftjs/core/lib/nodes/NodeHandlers';
import { Node } from '@craftjs/core/lib/interfaces';

declare type useNode<S = null> = Omit<useInternalNode<S>, 'actions'> &
  Pick<useInternalNode<S>['actions'], 'setProp'> & {
    // not optional
    connectors: NodeConnectors;
  };
declare function useNode(): useNode;
declare function useNode<S = null>(collect?: (node: Node) => S): useNode<S>;

const ROOT_NODE = 'canvas-ROOT';
export default {
  title: 'craftjs/Demo',
};

const IndicatorDiv = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  padding: 0.5rem;

  height: 30px;
  margin-top: -29px;
  font-size: 12px;
  line-height: 12px;

  svg {
    //fill: #fff;
    //width: 15px;
    //height: 15px;
  }
`;

const Btn = styled.a`
  padding: 0 0px;
  opacity: 0.9;
  display: flex;
  align-items: center;
  > div {
    position: relative;
    top: -50%;
    left: -50%;
  }
`;

const RenderNode = ({ render }) => {
  const { actions, query, connectors } = useEditor();
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isActive: node.events.selected,
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
  }));

  const currentRef = React.useRef<HTMLDivElement>();
  useEffect(() => {
    if (dom) {
      if (isActive || isHover) {
        dom.classList.add('component-selected');
      } else {
        dom.classList.remove('component-selected');
      }
    }
  }, [dom, isActive, isHover]);

  const getPos = React.useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom);
    currentDOM.style.top = top;
    currentDOM.style.left = left;
  }, [dom]);

  // 外部容器
  // useEffect(() => {
  //   document.querySelector('.craftjs-renderer')?.addEventListener('scroll', scroll);
  //
  //   return () => {
  //     document.querySelector('.craftjs-renderer')?.removeEventListener('scroll', scroll);
  //   };
  // }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <IndicatorDiv
              ref={currentRef as any}
              className="px-2 py-2 text-white bg-primary fixed flex items-center"
              style={{
                left: getPos(dom).left,
                top: getPos(dom).top,
                zIndex: 9999,
              }}
            >
              <h2 className="flex-1 mr-4">{name}</h2>
              {moveable ? (
                <Btn className="mr-2 cursor-move" ref={drag}>
                  {/*<Move />*/}
                  <DragOutlined />
                  {/*<MoveOutlined/>*/}
                </Btn>
              ) : null}
              {id !== ROOT_NODE && (
                <Btn
                  className="mr-2 cursor-pointer"
                  onClick={() => {
                    actions.selectNode(parent);
                  }}
                >
                  {/*<ArrowUp />*/}
                  <VerticalAlignTopOutlined />
                </Btn>
              )}
              {deletable ? (
                <Btn
                  className="cursor-pointer"
                  onMouseDown={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    actions.delete(id);
                  }}
                >
                  {/*<Delete />*/}
                  <DeleteOutlined />
                </Btn>
              ) : null}
            </IndicatorDiv>,
            document.body,
          )
        : null}
      {render}
    </>
  );
};

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
            onChange={(e) => setProp((prop) => (prop.level = parseInt(e?.[0] || e)))}
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
            key={v.craft?.name}
            ref={(ref) => connectors.create(ref, React.createElement(v, v?.craft?.defaultProps ?? {}))}
          >
            {v.craft?.name}
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
        <Editor resolver={components} onRender={RenderNode}>
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
  // loadStyles('https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css');
  return (
    <div>
      <App></App>
    </div>
  );
};

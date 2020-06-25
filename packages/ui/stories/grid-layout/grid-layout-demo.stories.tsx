import * as React from 'react';
import { useState } from 'react';
import RGL, { ReactGridLayoutProps, WidthProvider } from 'react-grid-layout';
import { ExampleStyle } from './example-style';
import styled from 'styled-components';
import _ from 'lodash';

export default {
  title: 'grid-layout/Demo',
};

const ReactGridLayout = WidthProvider<ReactGridLayoutProps>(RGL);

function stringifyLayout(layout) {
  return layout.map(function (l) {
    const name = l.i === '__dropping-elem__' ? 'drop' : l.i;
    return (
      <div className="layoutItem" key={l.i}>
        <b>{name}</b>
        {`: [${l.x}, ${l.y}, ${l.w}, ${l.h}]`}
      </div>
    );
  });
}

const RightTop = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const MyItem = ({ children, onClose, ...props }) => {
  return (
    <div {...props}>
      <RightTop>
        <button onClick={onClose}>X</button>
      </RightTop>
      {children}
    </div>
  );
};

const Placeholder = styled.div`
  width: 128px;
  height: 64px;
  border: 1px solid lightgrey;
`;
let ids = 1;
export const ControlledLayoutGrid = () => {
  const [layout, setLayout] = useState(() => [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ]);

  return (
    <div>
      <div>
        <Placeholder
          onDragStart={(e) => e.dataTransfer.setData('text/plain', '' + ids)}
          draggable={true}
          unselectable="on"
        >
          Drag to Drop
        </Placeholder>
      </div>
      <div>
        <button
          onClick={() => {
            // x: (this.state.items.length * 2) % (this.state.cols || 12),
            // layout.length
            setLayout([
              ...layout,
              {
                i: Date.now() + '',
                w: 4,
                h: 4,
                y: Infinity,
                // x: 0 ,
                x: (layout.length * 2) % 24,
              },
            ]);
          }}
        >
          Add
        </button>
      </div>
      <ExampleStyle />
      <div className="layoutJSON">
        Displayed as <code>[x, y, w, h]</code>:<div className="columns">{stringifyLayout(layout)}</div>
      </div>
      <ReactGridLayout
        isDroppable
        // 开启后不会推开其他元素
        // preventCollision
        useCSSTransforms
        measureBeforeMount={false}
        droppingItem={{ i: 'DROPING' + ids, w: 2, h: 2 }}
        onDrop={(event) => {
          console.log(`DROP`, event, event.e);
          const { x, y } = event;
          setLayout((layout) => {
            console.log(layout.map((v) => v.i));
            return [...layout.filter((v) => !v.i.startsWith('DROPING')), { i: 'DROP' + ids, x, y, w: 2, h: 2 }];
          });
          ids += 2;
        }}
        className="layout"
        cols={24}
        rowHeight={30}
        layout={layout}
        onLayoutChange={setLayout}
      >
        {layout.map(({ i }, ii) => (
          <MyItem key={i || ii} onClose={() => setLayout(_.reject(layout, { i }))}>
            {i}/{ii}
          </MyItem>
        ))}
      </ReactGridLayout>
    </div>
  );
};

export const DataGridPropLayout = () => {
  return (
    <div>
      <ExampleStyle />
      <ReactGridLayout useCSSTransforms className="layout" cols={24} rowHeight={30}>
        <div key="a" data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}>
          a
        </div>
        <div key="b" data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}>
          b
        </div>
        <div key="c" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
          c
        </div>
      </ReactGridLayout>
    </div>
  );
};

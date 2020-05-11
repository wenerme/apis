import React from 'react';

import { Button, Col, Row } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons/lib';
import { ArrayActionColProps } from './layouts';

export const ArrayFieldTemplateItem = ({
  children,
  disabled,
  hasMoveDown,
  hasMoveUp,
  hasRemove,
  hasToolbar,
  index,
  onDropIndexClick,
  onReorderClick,
  readonly,
}) => {
  const btnStyle = {
    width: 'calc(100% / 3)',
  };

  return (
    <Row key={`array-item-${index}`} gutter={24}>
      <Col
        style={{
          flex: 1,
          // 如果数组内部很复杂
          // padding: 8,
          // border: '1px solid #ddd',
          // marginBottom: 20,
          // borderRadius: 4,
          // boxShadow: '0 1px 1px rgba(0,0,0,.05);',
        }}
      >
        {children}
      </Col>

      {hasToolbar && (
        <Col {...ArrayActionColProps}>
          <Button.Group style={{ width: '100%' }}>
            {(hasMoveUp || hasMoveDown) && (
              <Button
                disabled={disabled || readonly || !hasMoveUp}
                icon={<ArrowUpOutlined />}
                onClick={onReorderClick(index, index - 1)}
                style={btnStyle}
                type="default"
              />
            )}

            {(hasMoveUp || hasMoveDown) && (
              <Button
                disabled={disabled || readonly || !hasMoveDown}
                icon={<ArrowDownOutlined />}
                onClick={onReorderClick(index, index + 1)}
                style={btnStyle}
                type="default"
              />
            )}

            {hasRemove && (
              <Button
                disabled={disabled || readonly}
                icon={<DeleteOutlined />}
                onClick={onDropIndexClick(index)}
                style={btnStyle}
                danger
              />
            )}
          </Button.Group>
        </Col>
      )}
    </Row>
  );
};

ArrayFieldTemplateItem.defaultProps = {
  disabled: false,
  hasMoveDown: true,
  hasMoveUp: true,
  hasRemove: true,
  hasToolbar: true,
  onDropIndexClick: () => {
    //
  },
  onReorderClick: () => {
    //
  },
  readonly: false,
};

import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button, Popover } from 'antd';
// import './SketchColorPicker.module.css';
import { HighlightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SketchPopover = styled(Popover)`
  .ant-popover__no-padding .ant-popover-inner-content {
    padding: 0 !important;
  }
`;

export const SketchColorPicker = React.forwardRef<any, { value; onChange }>(({ value, onChange }, ref) => {
  const [picking, setPicking] = useState(false);

  return (
    <SketchPopover
      ref={ref}
      overlayClassName="ant-popover__no-padding"
      content={<SketchPicker color={value} onChangeComplete={({ hex }) => onChange(hex)} />}
      trigger="click"
      visible={picking}
      onVisibleChange={setPicking}
    >
      <Button style={{ backgroundColor: value }} icon={<HighlightOutlined />} />
    </SketchPopover>
  );
});
SketchColorPicker.displayName = 'SketchColorPicker';

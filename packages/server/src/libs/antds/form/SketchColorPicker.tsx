import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button, Popover } from 'antd';
import './SketchColorPicker.module.css';
import { HighlightOutlined } from '@ant-design/icons';

export const SketchColorPicker = React.forwardRef<any, { value; onChange }>(({ value, onChange }, ref) => {
  const [picking, setPicking] = useState(false);

  return (
    <Popover
      ref={ref}
      overlayClassName="ant-popover__no-padding"
      content={<SketchPicker color={value} onChangeComplete={({ hex }) => onChange(hex)} />}
      trigger="click"
      visible={picking}
      onVisibleChange={setPicking}
    >
      <Button style={{ backgroundColor: value }} icon={<HighlightOutlined />} />
    </Popover>
  );
});
SketchColorPicker.displayName = 'SketchColorPicker';

import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons/lib';

export const AddButton: React.FC<{ className?; onClick?; disabled? }> = ({ className, onClick, disabled }) => {
  return (
    <Button className={className} disabled={disabled} onClick={onClick} type="primary">
      <PlusCircleOutlined /> Add Item
    </Button>
  );
};

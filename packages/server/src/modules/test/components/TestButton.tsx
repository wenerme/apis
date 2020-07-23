import React from 'react';
import { Button, notification } from 'antd';

export const TestButton: React.FC = () => {
  return <Button onClick={() => notification.info({ message: 'Hi' })}>TestButton</Button>;
};

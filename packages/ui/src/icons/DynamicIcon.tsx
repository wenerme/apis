import React, { ComponentType } from 'react';
import { LoadingOutlined } from '@ant-design/icons/lib';
import { resolver } from './resolver';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

export interface DynamicIconProps extends AntdIconProps {
  type: string;
}

// const loaded: WeakMap<React.ComponentType, string> = new WeakMap();
const loaded: Record<string, React.ComponentType> = {};

export const DynamicIcon: React.FC<DynamicIconProps> & { Fallback; resolvers } = (props) => {
  const { type, children } = props;
  if (loaded[type]) {
    return React.createElement(loaded[type], props as any, children);
  }
  let c: Promise<{ default: ComponentType }> | null = null;
  for (const resolver of DynamicIcon.resolvers) {
    c = resolver(props);
    if (c) {
      break;
    }
  }
  if (!c) {
    console.error(`Missing Icon`, type);
    if (typeof window !== 'undefined') {
      window['MissingIcons'] = window['MissingIcons'] ?? [];
      window['MissingIcons'].push(type);
    }
    return DynamicIcon.Fallback;
  }
  const found: Promise<{ default: ComponentType }> = c;
  return (
    <React.Suspense fallback={DynamicIcon.Fallback}>
      {React.createElement(
        React.lazy(() =>
          found.then((v) => {
            loaded[type] = v.default;
            return v;
          }),
        ),
        props,
        children,
      )}
    </React.Suspense>
  );
};

DynamicIcon.Fallback = <LoadingOutlined />;
DynamicIcon.resolvers = [resolver];

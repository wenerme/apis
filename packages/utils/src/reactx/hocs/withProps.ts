import React from 'react';

/// add default props to WrappedComponent
export function withProps(WrappedComponent: React.ElementType, extra: any) {
  return (props: any) => React.createElement(WrappedComponent, Object.assign({}, props, extra));
}

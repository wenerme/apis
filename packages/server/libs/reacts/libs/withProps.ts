import React from 'react';

export function withProps(WrappedComponent, extra) {
  return (props) => React.createElement(WrappedComponent, Object.assign({}, props, extra));
}

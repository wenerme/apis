import React from 'react';
import Error from 'next/error';

export default class PageError extends Error {
  render() {
    return (
      <div>
        Page error {this.props.statusCode} {this.props.title}{' '}
      </div>
    );
  }
}

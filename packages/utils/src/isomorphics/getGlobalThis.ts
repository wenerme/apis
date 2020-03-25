export const getGlobalThis = (): typeof globalThis => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global as any;
  // eslint-disable-next-line
  // @ts-ignore
  if (typeof this !== 'undefined') return this;
  throw new Error('Unable to locate global `this`');
};

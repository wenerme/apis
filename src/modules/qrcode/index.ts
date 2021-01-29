export * from './components/QrCodeBuilderPlayground';
export * from './reader/QrCodeReaderPlayground';
export { default as metadata } from './metadata.json';

// builder - 740K
// +reader - 3.4M - due to the image codec
// +reader - 1.9M - proper handle pngjs

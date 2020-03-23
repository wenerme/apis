/**
 * @jest-environment node
 */
import createDebug from 'debug';

const debug = createDebug('test:demo');
test('test demo', async () => {
  jest.setTimeout(60 * 1000);
  debug('DEMO');
  console.log('done');
});

import { Cron } from 'src/modules/langs/cron/Cron';

test('parse base cron', async () => {
  const tests = [
    '* * * * *',
    '1 1 1 1 1',
    '5 0 * 8 *',
    '15 14 1 * *',
    '23 0-20/2 * */2 *',
    '23 0-20/2 * * *',
    '1,2,3,4,5,5,6,7,8 0-20/2 * * *',
  ];
  for (const test of tests) {
    try {
      const ast = Cron.parseSyntax(test);
      expect(Cron.stringifySyntax(ast)).toBe(test);
    } catch (e) {
      console.error(`Test failed: ${test}`);
      throw e;
    }
  }
});

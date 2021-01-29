import { stringifyIni } from 'src/modules/langs/ini/stringifyIni';

test('ini str', async () => {
  const a = {
    '': {
      name: 'wener',
    },
    sec: {
      arrs: [1, 2, 3],
      int: 12,
      bool: true,
    },
  };
  expect(stringifyIni(a)).toBe(
    `
name=wener
[sec]
arrs=1
arrs=2
arrs=3
int=12
bool=true
`.trim(),
  );
});

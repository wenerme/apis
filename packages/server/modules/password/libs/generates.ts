export interface BuildGeneratorOption {
  length
  letter
  upper
  lower
  number
  symbol
  random
}

export function generatePassword(opts?: Partial<BuildGeneratorOption>) {
  return createPasswordGenerator(opts)();
}

export function createPasswordGenerator(opts?: Partial<BuildGeneratorOption>) {
  const {
    length = 12,
    letter = true,
    upper = true,
    lower = true,
    number = true,
    symbol = true,
    random = Math.random.bind(Math)
  } = opts || {};

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';
  const all = (letter && upper ? uppercase : '') + (letter && lower ? lowercase : '') + (number ? numbers : '') + (symbol ? symbols : '');

  return () => {
    let password = '';
    for (let index = 0; index < length; index++) {
      const character = Math.floor(random() * all.length);
      password += all.substring(character, character + 1);
    }
    return password;
  }
}

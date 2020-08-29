module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      // tsConfig: 'tsconfig.jest.json'
      // tsConfig: 'tsconfig.json',
    }
  },
};

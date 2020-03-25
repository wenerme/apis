module.exports = {
  '*.{css,scss,yaml,json}': 'prettier --write',
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
};

module.exports = {
  '*.{css,scss,yaml}': 'prettier --write',
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
};

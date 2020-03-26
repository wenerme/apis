module.exports = {
  '*.{css,scss,yaml,json,md,graphql}': 'prettier --write',
  '*.{ts,tsx,js,jsx}': ['eslint --fix', 'prettier --write'],
};

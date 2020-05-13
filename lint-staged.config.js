module.exports = {
  '**/*.{css,scss,yaml,json,md,mdx}': 'prettier --write',
  '**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
};

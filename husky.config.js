const tasks = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
  },
};

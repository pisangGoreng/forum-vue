// ! move the eslintConfig from package.json to here
// ! to use conditional logic

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
    // 'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'prettier/prettier': 'error'
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
  // plugins: ['prettier']
}

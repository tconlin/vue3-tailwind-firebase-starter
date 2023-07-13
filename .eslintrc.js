module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['vue'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'no-unused-vars': 'off',
    'no-var': 2,
    'prefer-const': 2,
    'vue/attribute-hyphenation': 'off',
    'import/extensions': 'off',
    camelcase: 'off',
    'vue/v-slot-style': 'off'
  },
  globals: {
    window: true,
    document: true
  }
}

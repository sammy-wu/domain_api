module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/ban-ts-comment': [
      'warn', // Change to 'off' to completely disable the rule
      {
        'ts-ignore': 'allow-with-description', // Allow ts-ignore with descriptions
        'ts-expect-error': 'allow',           // Allow ts-expect-error
        'ts-nocheck': false,                  // Allow ts-nocheck (no restriction)
        'ts-check': false                     // Allow ts-check
      }
    ]
  },
};

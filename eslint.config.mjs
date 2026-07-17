import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default tseslint.config(
  {
    ignores: ['dist/**', '.astro/**', '.vercel/**', '.yarn/**', 'node_modules/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    // Astro 6 generates types at .astro/types.d.ts referenced via triple-slash.
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': ['error', { path: 'always' }],
    },
  },
);

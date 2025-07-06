import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import globals from 'globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Next.js에서는 자동으로 import됨
      'react/jsx-uses-react': 'off', // React 17+ 에서는 불필요
      'react/prop-types': 'off', // TypeScript 사용시 불필요
      'react-hooks/rules-of-hooks': 'error', // Hooks 규칙 강제
      'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 배열 경고
    },
    settings: {
      react: {
        version: 'detect', // package.json에서 React 버전 자동 감지
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      // TypeScript 엄격한 규칙들
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_', // _로 시작하는 매개변수는 무시
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-unsafe-call': 'warn', // 안전하지 않은 함수 호출 경고
      '@typescript-eslint/no-unsafe-assignment': 'warn', // 안전하지 않은 할당 경고
      '@typescript-eslint/no-unsafe-member-access': 'warn', // 안전하지 않은 속성 접근 경고
      '@typescript-eslint/no-unsafe-return': 'warn', // 안전하지 않은 반환값 경고
    },
  },
  {
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Next.js 성능 최적화 규칙들
      '@next/next/no-html-link-for-pages': 'error', // pages 내부 링크는 Link 컴포넌트 사용
      '@next/next/no-img-element': 'warn', // img 대신 Next.js Image 컴포넌트 사용 권장
      '@next/next/no-sync-scripts': 'error', // 동기 스크립트 로딩 금지
      '@next/next/no-unwanted-polyfillio': 'error', // 불필요한 polyfill 금지
      '@next/next/no-page-custom-font': 'warn', // 페이지별 폰트 로딩 대신 _app.tsx에서 처리
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 에러로 처리
      'arrow-body-style': 'off', // Prettier와 충돌하는 규칙들 비활성화
      'prefer-arrow-callback': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        // 브라우저와 Node.js 전역 변수들
        ...globals.browser,
        ...globals.node,
        // Next.js 특화 전역 변수들
        __DEV__: 'readonly',
        __PROD__: 'readonly',
      },
    },
  },
  prettierConfig,
]

export default eslintConfig

module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@babel/eslint-parser', // Babel 파서를 명시적으로 추가
  parserOptions: {
    requireConfigFile: false, // Babel 설정 파일을 반드시 요구하지 않도록 설정
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
  },
};

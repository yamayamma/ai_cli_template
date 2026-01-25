export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 許可するtype（CONTRIBUTING.mdに準拠）
    'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'test', 'refactor', 'perf', 'ci']],
    // typeは必須
    'type-empty': [2, 'never'],
    // subjectは必須
    'subject-empty': [2, 'never'],
    // Breaking Change (!) は許可しない
    'subject-exclamation-mark': [2, 'never'],
  },
};

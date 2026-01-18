import type { Command } from '../types';

export const commands: Command[] = [
  {
    id: 'specify',
    name: 'specify',
    alias: 'sp',
    description:
      '新しい仕様を作成します。ユーザーの要求を受け取り、構造化された仕様書を生成します。',
    usage: 'speckit specify [機能名]',
    syntax: 'speckit specify [feature-name] [options]',
    category: '仕様管理',
    step: 1,
    options: [
      {
        name: '--template, -t',
        description: '使用するテンプレートを指定',
        required: false,
        default: 'default',
      },
      {
        name: '--output, -o',
        description: '出力先ディレクトリを指定',
        required: false,
        default: '.specify/',
      },
      {
        name: '--interactive, -i',
        description: '対話モードで仕様を作成',
        required: false,
        default: 'true',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: 'speckit specify "ユーザー認証機能"',
        code: '$ speckit specify "ユーザー認証機能"\n✓ 仕様ファイルを作成しました: .specify/specs/001-user-auth/spec.md',
        description: '新しい仕様作成を開始',
      },
      {
        title: 'テンプレート指定',
        command: 'speckit specify -t api "REST APIエンドポイント"',
        code: '$ speckit specify -t api "REST APIエンドポイント"\n✓ APIテンプレートを使用しました',
        description: 'APIテンプレートを使用して仕様作成',
      },
    ],
    relatedSteps: ['step1'],
    tags: ['仕様', '作成', '要件', 'spec'],
  },
  {
    id: 'clarify',
    name: 'clarify',
    alias: 'cl',
    description: '仕様の曖昧点を特定し、明確化します。質問リストを生成し、回答を仕様に反映します。',
    usage: 'speckit clarify [仕様ファイル]',
    syntax: 'speckit clarify [spec-path] [options]',
    category: '仕様管理',
    step: 1,
    options: [
      {
        name: '--auto, -a',
        description: '自動的に明確化を提案',
        required: false,
        default: 'false',
      },
      {
        name: '--spec, -s',
        description: '対象の仕様ファイル',
        required: false,
        default: '最新の仕様',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: 'speckit clarify',
        code: '$ speckit clarify\n分析中: .specify/specs/001-user-auth/spec.md\n\n発見された曖昧な点:\n1. "適切なエラー処理" - 具体的なエラーケースが未定義',
        description: '現在の仕様の曖昧点を質問形式で解消',
      },
    ],
    relatedSteps: ['step1'],
    tags: ['明確化', '質問', 'clarify'],
  },
  {
    id: 'research',
    name: 'research',
    alias: 'rs',
    description:
      '仕様に基づいて技術調査を実行します。利用可能な技術、ベストプラクティス、リスクを分析します。',
    usage: 'speckit research [仕様ファイル]',
    syntax: 'speckit research [spec-path] [options]',
    category: '計画・設計',
    step: 2,
    options: [
      {
        name: '--depth, -d',
        description: '調査の深さ (shallow/normal/deep)',
        required: false,
        default: 'normal',
      },
      {
        name: '--focus, -f',
        description: '特定の技術領域にフォーカス',
        required: false,
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: 'speckit research',
        code: '$ speckit research\n調査を開始: 001-user-auth\n\n✓ 認証ライブラリを分析しました\n✓ セキュリティベストプラクティスを確認しました\n✓ research.md を生成しました',
        description: '現在の仕様に基づいて技術調査を実行',
      },
    ],
    relatedSteps: ['step2'],
    tags: ['調査', 'research', '技術選定'],
  },
  {
    id: 'plan',
    name: 'plan',
    alias: 'pl',
    description:
      '実装計画を生成します。技術選定、アーキテクチャ、ファイル構造を含む計画書を作成します。',
    usage: 'speckit plan [仕様ファイル]',
    syntax: 'speckit plan [options]',
    category: '計画・設計',
    step: 3,
    options: [
      {
        name: '--detailed, -d',
        description: '詳細な計画を生成',
        required: false,
        default: 'false',
      },
      {
        name: '--template, -t',
        description: '計画テンプレート',
        required: false,
        default: 'default',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: 'speckit plan',
        code: '$ speckit plan\n仕様を分析中...\n\n✓ 技術計画を生成しました: .specify/specs/001-user-auth/plan.md',
        description: '仕様に基づいて技術計画を生成',
      },
    ],
    relatedSteps: ['step3'],
    tags: ['計画', 'plan', 'アーキテクチャ'],
  },
  {
    id: 'tasks',
    name: 'tasks',
    alias: 'tk',
    description: 'タスク分解を行います。実装計画から具体的なタスクリストを生成します。',
    usage: 'speckit tasks [計画ファイル]',
    syntax: 'speckit tasks [options]',
    category: '計画・設計',
    step: 4,
    options: [
      {
        name: '--granularity, -g',
        description: 'タスクの粒度 (coarse/normal/fine)',
        required: false,
        default: 'normal',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: 'speckit tasks',
        code: '$ speckit tasks\n計画を分析中...\n\n✓ 12個のタスクを生成しました\n✓ tasks.md を作成しました',
        description: '計画からタスクリストを生成',
      },
    ],
    relatedSteps: ['step4'],
    tags: ['タスク', 'tasks', '分解'],
  },
  {
    id: 'implement',
    name: 'implement',
    alias: 'impl',
    description: 'タスク計画に基づいて実装を実行します。段階的にコードを生成し、検証を行います。',
    usage: 'speckit implement [タスクID]',
    syntax: 'speckit implement [options]',
    category: '実装・検証',
    step: 5,
    options: [
      {
        name: '--task, -t',
        description: '特定のタスクを実行',
        required: false,
      },
      {
        name: '--all, -a',
        description: '全タスクを連続実行',
        required: false,
        default: 'false',
      },
      {
        name: '--dry-run',
        description: '実行せず計画のみ表示',
        required: false,
        default: 'false',
      },
    ],
    examples: [
      {
        title: '次のタスクを実行',
        command: 'speckit implement',
        code: '$ speckit implement\n現在のタスク: T003 - UserServiceクラスを作成\n\n実行中...\n✓ src/services/userService.ts を作成しました',
        description: '次の未完了タスクを実装',
      },
    ],
    relatedSteps: ['step5'],
    tags: ['実装', 'implement', 'コード生成'],
  },
  {
    id: 'verify',
    name: 'verify',
    alias: 'vf',
    description:
      '実装が仕様を満たしているか検証します。テスト実行、整合性チェック、カバレッジ計測を行います。',
    usage: 'speckit verify [仕様ファイル]',
    syntax: 'speckit verify [options]',
    category: '実装・検証',
    step: 5,
    options: [
      {
        name: '--test, -t',
        description: 'テストのみ実行',
        required: false,
        default: 'false',
      },
      {
        name: '--coverage',
        description: 'カバレッジを表示',
        required: false,
        default: 'false',
      },
      {
        name: '--strict',
        description: '厳格モード',
        required: false,
        default: 'false',
      },
    ],
    examples: [
      {
        title: '基本的な検証',
        command: 'speckit verify',
        code: '$ speckit verify\n検証中: 001-user-auth\n\n✓ テスト実行: 15/15 passed\n✓ 仕様との整合性: 8/8 要件を満たしています\n\n検証結果: PASSED',
        description: '実装が仕様を満たしているか検証',
      },
    ],
    relatedSteps: ['step5'],
    tags: ['検証', 'verify', 'テスト'],
  },
];

export function getCommandById(id: string): Command | undefined {
  return commands.find((cmd) => cmd.id === id);
}

export function getCategories(): string[] {
  const categories = new Set(commands.map((cmd) => cmd.category));
  return Array.from(categories);
}

export function filterCommands(query: string): Command[] {
  const lowerQuery = query.toLowerCase();
  return commands.filter(
    (cmd) =>
      cmd.name.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.category.toLowerCase().includes(lowerQuery) ||
      cmd.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

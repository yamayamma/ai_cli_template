import type { Command } from '../types'

export const commands: Command[] = [
  {
    id: 'specify',
    name: '/speckit.specify',
    description:
      '新しい仕様を作成します。ユーザーの要求を受け取り、構造化された仕様書を生成します。',
    usage: '/speckit.specify [要求の説明]',
    options: [
      {
        name: '--template',
        shortName: '-t',
        description: '使用するテンプレートを指定',
        required: false,
        defaultValue: 'default',
      },
      {
        name: '--output',
        shortName: '-o',
        description: '出力先ディレクトリを指定',
        required: false,
        defaultValue: './specs',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: '/speckit.specify "ユーザー認証機能を追加したい"',
        description: '新しい仕様作成を開始',
      },
      {
        title: 'テンプレート指定',
        command: '/speckit.specify -t api "REST APIエンドポイントを追加"',
        description: 'APIテンプレートを使用して仕様作成',
      },
    ],
    relatedSteps: ['specify'],
    tags: ['仕様', '作成', '要件', 'spec'],
  },
  {
    id: 'clarify',
    name: '/speckit.clarify',
    description:
      '仕様の曖昧点を解消します。質問リストを生成し、回答を仕様に反映します。',
    usage: '/speckit.clarify [仕様ファイルパス]',
    options: [
      {
        name: '--interactive',
        shortName: '-i',
        description: 'インタラクティブモードで実行',
        required: false,
        defaultValue: 'true',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: '/speckit.clarify',
        description: '現在の仕様の曖昧点を質問形式で解消',
      },
    ],
    relatedSteps: ['clarify'],
    tags: ['明確化', '質問', 'clarify'],
  },
  {
    id: 'plan',
    name: '/speckit.plan',
    description:
      '実装計画を生成します。技術選定、アーキテクチャ、タスク分解を含む計画書を作成します。',
    usage: '/speckit.plan [仕様ファイルパス]',
    options: [
      {
        name: '--detailed',
        shortName: '-d',
        description: '詳細な計画を生成',
        required: false,
        defaultValue: 'false',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: '/speckit.plan',
        description: '仕様に基づいて実装計画を生成',
      },
    ],
    relatedSteps: ['plan'],
    tags: ['計画', 'プラン', '設計', 'plan'],
  },
  {
    id: 'execute',
    name: '/speckit.execute',
    description:
      'タスクを実行します。TDDアプローチでテストを先に書き、実装を行います。',
    usage: '/speckit.execute [タスクID]',
    options: [
      {
        name: '--tdd',
        description: 'TDDモードで実行（デフォルト）',
        required: false,
        defaultValue: 'true',
      },
      {
        name: '--skip-tests',
        description: 'テスト作成をスキップ（非推奨）',
        required: false,
        defaultValue: 'false',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: '/speckit.execute',
        description: '次のタスクを実行',
      },
      {
        title: '特定タスクの実行',
        command: '/speckit.execute T001',
        description: '指定したタスクを実行',
      },
    ],
    relatedSteps: ['execute'],
    tags: ['実行', '実装', 'TDD', 'execute'],
  },
  {
    id: 'verify',
    name: '/speckit.verify',
    description:
      '実装を検証します。テスト実行、コード品質チェック、仕様との整合性確認を行います。',
    usage: '/speckit.verify [検証対象]',
    options: [
      {
        name: '--coverage',
        shortName: '-c',
        description: 'カバレッジレポートを生成',
        required: false,
        defaultValue: 'true',
      },
      {
        name: '--strict',
        description: '厳格モードで検証',
        required: false,
        defaultValue: 'false',
      },
    ],
    examples: [
      {
        title: '基本的な使用方法',
        command: '/speckit.verify',
        description: '全テストを実行し、品質を検証',
      },
      {
        title: '厳格モード',
        command: '/speckit.verify --strict',
        description: '厳格なルールで検証',
      },
    ],
    relatedSteps: ['verify'],
    tags: ['検証', 'テスト', '品質', 'verify'],
  },
]

export function getCommandById(id: string): Command | undefined {
  return commands.find((command) => command.id === id)
}

export function searchCommands(query: string): Command[] {
  const lowerQuery = query.toLowerCase()
  return commands.filter(
    (command) =>
      command.name.toLowerCase().includes(lowerQuery) ||
      command.description.toLowerCase().includes(lowerQuery) ||
      command.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )
}

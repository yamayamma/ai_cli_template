import type { Step } from '../types'

export const steps: Step[] = [
  {
    id: 'specify',
    name: 'Specify',
    title: '仕様作成',
    description:
      'ユーザーの要求を明確な仕様書に変換します。機能要件、非機能要件、制約条件を定義し、開発の方向性を決定します。',
    shortDescription: 'ユーザー要求を仕様書に変換',
    order: 1,
    icon: '📝',
    color: '#4A90D9',
    examples: [
      {
        title: '新機能の仕様作成',
        description: 'ユーザー認証機能の仕様を作成する例',
        codeSnippet: '/speckit.specify "ユーザー認証機能を追加したい"',
      },
    ],
    relatedCommands: ['specify'],
    nextStep: 'clarify',
  },
  {
    id: 'clarify',
    name: 'Clarify',
    title: '明確化',
    description:
      '仕様書の曖昧な点を質問形式で解消します。ステークホルダーとの対話を通じて、要件の詳細を明確にします。',
    shortDescription: '曖昧点を質問で解消',
    order: 2,
    icon: '🔍',
    color: '#7B68EE',
    examples: [
      {
        title: '要件の明確化',
        description: '認証方式の詳細を確認する例',
        codeSnippet: '/speckit.clarify',
      },
    ],
    relatedCommands: ['clarify'],
    previousStep: 'specify',
    nextStep: 'plan',
  },
  {
    id: 'plan',
    name: 'Plan',
    title: '計画',
    description:
      '実装計画と技術選定を行います。アーキテクチャ決定、タスク分解、スケジュール作成を含みます。',
    shortDescription: '実装計画と技術選定',
    order: 3,
    icon: '📋',
    color: '#50C878',
    examples: [
      {
        title: '実装計画の作成',
        description: '技術スタックとタスク分解',
        codeSnippet: '/speckit.plan',
      },
    ],
    relatedCommands: ['plan'],
    previousStep: 'clarify',
    nextStep: 'execute',
  },
  {
    id: 'execute',
    name: 'Execute',
    title: '実行',
    description:
      'TDD（テスト駆動開発）による実装を行います。テストを先に書き、それをパスするコードを実装します。',
    shortDescription: 'TDDによる実装',
    order: 4,
    icon: '⚡',
    color: '#FF6B6B',
    examples: [
      {
        title: 'タスクの実行',
        description: '計画に基づいてコードを実装',
        codeSnippet: '/speckit.execute',
      },
    ],
    relatedCommands: ['execute'],
    previousStep: 'plan',
    nextStep: 'verify',
  },
  {
    id: 'verify',
    name: 'Verify',
    title: '検証',
    description:
      'テストと品質確認を行います。ユニットテスト、統合テスト、E2Eテストの実行と、コード品質の検証を含みます。',
    shortDescription: 'テストと品質確認',
    order: 5,
    icon: '✅',
    color: '#FFD700',
    examples: [
      {
        title: '実装の検証',
        description: 'テスト実行と品質チェック',
        codeSnippet: '/speckit.verify',
      },
    ],
    relatedCommands: ['verify'],
    previousStep: 'execute',
  },
]

export function getStepById(id: string): Step | undefined {
  return steps.find((step) => step.id === id)
}

export function getStepByOrder(order: number): Step | undefined {
  return steps.find((step) => step.order === order)
}

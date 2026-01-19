/**
 * Spec Kit Commands Reference Data
 * Requirements: 2.1, 2.2, 2.3
 *
 * 主要コマンドの情報、パラメータ、構文、使用例を定義
 */

import type { Command } from './types';

/**
 * Spec Kitの主要コマンド一覧
 *
 * Business Rule: 各コマンドは最低1つのexampleを持つ
 */
export const commands: readonly Command[] = [
  {
    id: 'spec-init',
    name: '/kiro-spec-init',
    description:
      '新しい機能仕様のディレクトリを初期化します。spec.jsonと空のrequirements.md, design.md, tasks.mdを作成します。',
    syntax: '/kiro-spec-init "機能の説明"',
    parameters: [
      {
        name: 'description',
        type: 'string',
        required: true,
        description: '機能の簡潔な説明。ディレクトリ名とspec.jsonに使用されます。',
      },
    ],
    examples: [
      {
        title: '基本的な使用例',
        code: '/kiro-spec-init "ユーザー認証機能"',
        language: 'bash',
      },
      {
        title: '詳細な説明を含む例',
        code: '/kiro-spec-init "ダッシュボードウィジェットのドラッグ&ドロップ"',
        language: 'bash',
      },
    ],
  },
  {
    id: 'spec-requirements',
    name: '/kiro-spec-requirements',
    description:
      '指定した機能の要件定義フェーズを実行します。EARS形式で構造化された要件を生成し、requirements.mdに出力します。',
    syntax: '/kiro-spec-requirements {feature-name} [-y]',
    parameters: [
      {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '対象の機能名（.kiro/specs/配下のディレクトリ名）',
      },
      {
        name: '-y',
        type: 'flag',
        required: false,
        description: '確認をスキップして自動承認（ファストトラック）',
      },
    ],
    examples: [
      {
        title: '対話的に要件を生成',
        code: '/kiro-spec-requirements user-auth',
        language: 'bash',
      },
      {
        title: 'ファストトラックで自動承認',
        code: '/kiro-spec-requirements user-auth -y',
        language: 'bash',
      },
    ],
  },
  {
    id: 'spec-design',
    name: '/kiro-spec-design',
    description:
      '承認済みの要件に基づいて設計フェーズを実行します。アーキテクチャ、コンポーネント構成、データフローを定義し、design.mdに出力します。',
    syntax: '/kiro-spec-design {feature-name} [-y]',
    parameters: [
      {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '対象の機能名（要件が承認済みであること）',
      },
      {
        name: '-y',
        type: 'flag',
        required: false,
        description: '確認をスキップして自動承認',
      },
    ],
    examples: [
      {
        title: '設計ドキュメントを生成',
        code: '/kiro-spec-design user-auth',
        language: 'bash',
      },
      {
        title: 'ファストトラックで設計を承認',
        code: '/kiro-spec-design user-auth -y',
        language: 'bash',
      },
    ],
  },
  {
    id: 'spec-tasks',
    name: '/kiro-spec-tasks',
    description:
      '承認済みの設計をTDD実装可能なタスクに分解します。各タスクは明確な完了条件を持ち、tasks.mdに出力します。',
    syntax: '/kiro-spec-tasks {feature-name} [-y]',
    parameters: [
      {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '対象の機能名（設計が承認済みであること）',
      },
      {
        name: '-y',
        type: 'flag',
        required: false,
        description: '確認をスキップして自動承認',
      },
    ],
    examples: [
      {
        title: 'タスク一覧を生成',
        code: '/kiro-spec-tasks user-auth',
        language: 'bash',
      },
      {
        title: 'ファストトラックでタスクを承認',
        code: '/kiro-spec-tasks user-auth -y',
        language: 'bash',
      },
    ],
  },
  {
    id: 'spec-impl',
    name: '/kiro-spec-impl',
    description:
      '承認済みのタスクをTDD方式で実装します。テストを先に書き、実装、リファクタリングのサイクルで進めます。',
    syntax: '/kiro-spec-impl {feature-name} [task-numbers]',
    parameters: [
      {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '対象の機能名（タスクが承認済みであること）',
      },
      {
        name: 'task-numbers',
        type: 'string',
        required: false,
        description:
          '実行するタスク番号（例: "1.1" または "1,2,3"）。省略時は全ての未完了タスクを実行',
      },
    ],
    examples: [
      {
        title: '特定のタスクを実装',
        code: '/kiro-spec-impl user-auth 1.1',
        language: 'bash',
      },
      {
        title: '複数タスクを指定して実装',
        code: '/kiro-spec-impl user-auth 1,2,3',
        language: 'bash',
      },
      {
        title: '全ての未完了タスクを実装',
        code: '/kiro-spec-impl user-auth',
        language: 'bash',
      },
    ],
  },
  {
    id: 'spec-status',
    name: '/kiro-spec-status',
    description:
      '機能の現在のステータスを確認します。各フェーズの承認状態とタスクの完了状況を表示します。',
    syntax: '/kiro-spec-status {feature-name}',
    parameters: [
      {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '対象の機能名',
      },
    ],
    examples: [
      {
        title: '機能のステータスを確認',
        code: '/kiro-spec-status user-auth',
        language: 'bash',
      },
    ],
  },
] as const;

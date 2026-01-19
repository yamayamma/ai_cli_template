/**
 * SDD Phases Content Data
 * Requirements: 1.1, 1.2
 *
 * Spec-Driven Developmentの3フェーズ情報を定義
 */

import type { Phase } from './types';

/**
 * SDDの3フェーズ: Requirements → Design → Tasks
 *
 * 各フェーズは以下を含む:
 * - id: フェーズの一意識別子
 * - title: 表示用タイトル
 * - description: フェーズの目的説明
 * - outputs: フェーズの成果物
 * - icon: 視覚的アイコン
 */
export const phases: readonly Phase[] = [
  {
    id: 'requirements',
    title: 'Requirements',
    description:
      '機能の要件を明確化し、EARS形式で構造化された要件を定義します。ユーザーストーリー、機能要件、非機能要件を整理し、実装の基盤を作ります。',
    outputs: ['requirements.md'],
    icon: '📋',
  },
  {
    id: 'design',
    title: 'Design',
    description:
      '要件に基づいてシステム設計を行います。アーキテクチャ、コンポーネント構成、データフロー、インターフェースを定義し、実装の設計図を作成します。',
    outputs: ['design.md'],
    icon: '🏗️',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    description:
      '設計を実装タスクに分解します。各タスクは明確な完了条件を持ち、TDDで実装可能な粒度に細分化されます。',
    outputs: ['tasks.md'],
    icon: '✅',
  },
] as const;

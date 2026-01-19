/**
 * Steering and Specs Concepts Content Data
 * Requirements: 4.1, 4.2, 4.3
 *
 * SteeringとSpecsの概念説明と比較表データを定義
 */

// ============================================
// Type Definitions
// ============================================

/**
 * 概念説明のデータ構造
 */
export interface Concept {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly purposes: readonly string[];
}

/**
 * 比較表の項目
 */
export interface ComparisonItem {
  readonly aspect: string;
  readonly steering: string;
  readonly specs: string;
}

// ============================================
// Type Guards
// ============================================

/**
 * オブジェクトかどうかを確認
 */
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * 文字列配列かどうかを確認
 */
function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

/**
 * Concept型のランタイム検証
 */
export function isConcept(value: unknown): value is Concept {
  if (!isObject(value)) return false;

  return (
    typeof value['id'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['description'] === 'string' &&
    typeof value['path'] === 'string' &&
    isStringArray(value['purposes'])
  );
}

// ============================================
// Content Data
// ============================================

/**
 * Steering概念の説明
 * Requirements: 4.2
 */
export const steeringConcept: Concept = {
  id: 'steering',
  title: 'Steering',
  description:
    'プロジェクト全体のルール、コンテキスト、開発ガイドラインを定義します。AIがプロジェクトの方針を理解し、一貫した開発を行うための「プロジェクトメモリ」として機能します。',
  path: '.kiro/steering/',
  purposes: [
    'プロジェクト全体の技術スタック・アーキテクチャを定義',
    '開発標準・コーディング規約を記述',
    'プロダクトの目的・価値提案を明文化',
    'ディレクトリ構造・命名規則を設定',
  ],
} as const;

/**
 * Specs概念の説明
 * Requirements: 4.3
 */
export const specsConcept: Concept = {
  id: 'specs',
  title: 'Specs',
  description:
    '個別機能の開発プロセスを形式化します。Requirements → Design → Tasksの3フェーズワークフローに従い、機能ごとに仕様書を作成・管理します。',
  path: '.kiro/specs/',
  purposes: [
    '機能ごとの要件定義（requirements.md）',
    '設計ドキュメント（design.md）の作成',
    'TDD実装タスク（tasks.md）の管理',
    '承認ワークフローによる品質保証',
  ],
} as const;

/**
 * SteeringとSpecsの比較表データ
 * Requirements: 4.1
 */
export const comparisonItems: readonly ComparisonItem[] = [
  {
    aspect: 'スコープ',
    steering: 'プロジェクト全体',
    specs: '個別機能',
  },
  {
    aspect: 'ファイル構成',
    steering: 'product.md, tech.md, structure.md',
    specs: 'requirements.md, design.md, tasks.md',
  },
  {
    aspect: '更新頻度',
    steering: 'プロジェクト初期〜必要に応じて',
    specs: '機能開発ごと',
  },
  {
    aspect: '目的',
    steering: 'AIへのコンテキスト提供',
    specs: '開発プロセスの形式化',
  },
  {
    aspect: 'ライフサイクル',
    steering: 'プロジェクト存続中',
    specs: '機能完成後はアーカイブ可能',
  },
] as const;

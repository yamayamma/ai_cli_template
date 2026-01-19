/**
 * Content Data Types for Spec Kit Documentation SPA
 * Requirements: 1.1, 1.2, 2.1, 6.1
 *
 * 型定義とランタイム型ガード関数を提供
 */

// ============================================
// Type Definitions
// ============================================

/**
 * SDDフェーズ情報
 * Requirements: 1.1, 1.2
 */
export interface Phase {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly outputs: readonly string[];
  readonly icon: string;
}

/**
 * コマンドパラメータ情報
 * Requirements: 2.1
 */
export interface Parameter {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly description: string;
}

/**
 * コード例
 * Requirements: 2.1
 */
export interface CodeExample {
  readonly title: string;
  readonly code: string;
  readonly language: string;
}

/**
 * Spec Kitコマンド情報
 * Requirements: 2.1
 * Business Rule: 最低1つのexampleを持つ
 */
export interface Command {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly syntax: string;
  readonly parameters: readonly Parameter[];
  readonly examples: readonly CodeExample[];
}

/**
 * EARS形式パターン
 * Requirements: 6.1
 */
export interface EarsPattern {
  readonly id: string;
  readonly name: string;
  readonly pattern: string;
  readonly description: string;
  readonly examples: readonly string[];
}

/**
 * ナビゲーションセクション
 * Requirements: 1.3, 5.2
 */
export interface Section {
  readonly id: string;
  readonly title: string;
  readonly icon?: string;
}

// ============================================
// Type Guards (Runtime Validation)
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
 * Phase型のランタイム検証
 */
export function isPhase(value: unknown): value is Phase {
  if (!isObject(value)) return false;

  return (
    typeof value['id'] === 'string' &&
    typeof value['title'] === 'string' &&
    typeof value['description'] === 'string' &&
    isStringArray(value['outputs']) &&
    typeof value['icon'] === 'string'
  );
}

/**
 * Parameter型のランタイム検証
 */
export function isParameter(value: unknown): value is Parameter {
  if (!isObject(value)) return false;

  return (
    typeof value['name'] === 'string' &&
    typeof value['type'] === 'string' &&
    typeof value['required'] === 'boolean' &&
    typeof value['description'] === 'string'
  );
}

/**
 * CodeExample型のランタイム検証
 */
export function isCodeExample(value: unknown): value is CodeExample {
  if (!isObject(value)) return false;

  return (
    typeof value['title'] === 'string' &&
    typeof value['code'] === 'string' &&
    typeof value['language'] === 'string'
  );
}

/**
 * Command型のランタイム検証
 * Business Rule: 最低1つのexampleが必要
 */
export function isCommand(value: unknown): value is Command {
  if (!isObject(value)) return false;

  const hasRequiredFields =
    typeof value['id'] === 'string' &&
    typeof value['name'] === 'string' &&
    typeof value['description'] === 'string' &&
    typeof value['syntax'] === 'string' &&
    Array.isArray(value['parameters']) &&
    Array.isArray(value['examples']);

  if (!hasRequiredFields) return false;

  // Validate parameters array
  const parametersValid = (value['parameters'] as unknown[]).every(isParameter);
  if (!parametersValid) return false;

  // Validate examples array (must have at least one)
  const examples = value['examples'] as unknown[];
  if (examples.length === 0) return false;

  return examples.every(isCodeExample);
}

/**
 * EarsPattern型のランタイム検証
 */
export function isEarsPattern(value: unknown): value is EarsPattern {
  if (!isObject(value)) return false;

  return (
    typeof value['id'] === 'string' &&
    typeof value['name'] === 'string' &&
    typeof value['pattern'] === 'string' &&
    typeof value['description'] === 'string' &&
    isStringArray(value['examples'])
  );
}

/**
 * Section型のランタイム検証
 */
export function isSection(value: unknown): value is Section {
  if (!isObject(value)) return false;

  const hasRequiredFields = typeof value['id'] === 'string' && typeof value['title'] === 'string';

  if (!hasRequiredFields) return false;

  // icon is optional but must be string if present
  if ('icon' in value && value['icon'] !== undefined) {
    return typeof value['icon'] === 'string';
  }

  return true;
}

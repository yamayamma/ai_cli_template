/**
 * EARS Patterns Content Data
 * Requirements: 6.1, 6.2
 *
 * EARS（Easy Approach to Requirements Syntax）の5つのパターンを定義
 * 各パターンのテンプレートと実例を記述
 */

import type { EarsPattern } from './types';

/**
 * EARS形式の5つのパターン
 *
 * Business Rule: EarsPatternは5種類固定
 * - Event-Driven: イベント発生時の動作
 * - State-Driven: 状態に基づく動作
 * - Unwanted Behavior: 異常系の処理
 * - Optional Feature: オプション機能
 * - Ubiquitous: 常に適用される要件
 */
export const earsPatterns: readonly EarsPattern[] = [
  {
    id: 'event-driven',
    name: 'Event-Driven',
    pattern: 'WHEN <trigger event>, the <system> SHALL <action>.',
    description:
      'イベント発生時のシステム動作を定義します。ユーザーアクションや外部イベントへの応答を記述する際に使用します。',
    examples: [
      'WHEN the user clicks the submit button, the system SHALL validate the form data.',
      'WHEN the session expires, the system SHALL redirect the user to the login page.',
      'WHEN a new file is uploaded, the system SHALL scan for malware.',
    ],
  },
  {
    id: 'state-driven',
    name: 'State-Driven',
    pattern: 'WHILE <system state>, the <system> SHALL <action>.',
    description:
      '特定の状態にある間のシステム動作を定義します。継続的な条件や状態に依存する要件を記述する際に使用します。',
    examples: [
      'WHILE the system is in maintenance mode, the system SHALL display a maintenance notice.',
      'WHILE the user is logged in, the system SHALL refresh the authentication token every 15 minutes.',
      'WHILE processing a large file, the system SHALL display a progress indicator.',
    ],
  },
  {
    id: 'unwanted-behavior',
    name: 'Unwanted Behavior',
    pattern: 'IF <unwanted condition>, THEN the <system> SHALL <response>.',
    description:
      '異常系や望ましくない状況への対処を定義します。エラーハンドリングやフォールバック動作を記述する際に使用します。',
    examples: [
      'IF the database connection fails, THEN the system SHALL retry up to 3 times before showing an error.',
      'IF the input exceeds the maximum length, THEN the system SHALL truncate and warn the user.',
      'IF the API rate limit is exceeded, THEN the system SHALL queue the request for later processing.',
    ],
  },
  {
    id: 'optional-feature',
    name: 'Optional Feature',
    pattern: 'WHERE <feature is enabled>, the <system> SHALL <action>.',
    description:
      'オプション機能や設定に依存する動作を定義します。機能フラグやユーザー設定による条件分岐を記述する際に使用します。',
    examples: [
      'WHERE dark mode is enabled, the system SHALL apply the dark color theme.',
      'WHERE two-factor authentication is configured, the system SHALL require OTP verification.',
      'WHERE analytics tracking is enabled, the system SHALL collect user interaction data.',
    ],
  },
  {
    id: 'ubiquitous',
    name: 'Ubiquitous',
    pattern: 'The <system> SHALL <action>.',
    description:
      '常に適用される要件を定義します。条件なしで常に満たされるべき要件を記述する際に使用します。',
    examples: [
      'The system SHALL encrypt all data in transit using TLS 1.3.',
      'The system SHALL log all authentication attempts.',
      'The system SHALL respond to API requests within 500ms.',
    ],
  },
] as const;

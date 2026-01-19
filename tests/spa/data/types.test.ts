/**
 * Task 2.1: コンテンツデータの型定義と構造のテスト
 * TDD: RED - 型定義の存在と構造を検証するテスト
 */

import { describe, expect, it } from 'vitest';

describe('Content Data Types', () => {
  describe('Phase type', () => {
    it('should have required properties', async () => {
      const { isPhase } = await import('../../../spa/src/data/types');

      const validPhase = {
        id: 'requirements',
        title: 'Requirements',
        description: '要件定義フェーズ',
        outputs: ['requirements.md'],
        icon: '📋',
      };

      expect(isPhase(validPhase)).toBe(true);
    });

    it('should reject invalid Phase objects', async () => {
      const { isPhase } = await import('../../../spa/src/data/types');

      const invalidPhase = {
        id: 'requirements',
        // missing title, description, outputs, icon
      };

      expect(isPhase(invalidPhase)).toBe(false);
    });
  });

  describe('Parameter type', () => {
    it('should have required properties', async () => {
      const { isParameter } = await import('../../../spa/src/data/types');

      const validParameter = {
        name: 'feature-name',
        type: 'string',
        required: true,
        description: '機能名を指定',
      };

      expect(isParameter(validParameter)).toBe(true);
    });

    it('should reject invalid Parameter objects', async () => {
      const { isParameter } = await import('../../../spa/src/data/types');

      const invalidParameter = {
        name: 'feature-name',
        // missing type, required, description
      };

      expect(isParameter(invalidParameter)).toBe(false);
    });
  });

  describe('CodeExample type', () => {
    it('should have required properties', async () => {
      const { isCodeExample } = await import('../../../spa/src/data/types');

      const validExample = {
        title: '基本的な使用例',
        code: '/kiro-spec-init "feature"',
        language: 'bash',
      };

      expect(isCodeExample(validExample)).toBe(true);
    });

    it('should reject invalid CodeExample objects', async () => {
      const { isCodeExample } = await import('../../../spa/src/data/types');

      const invalidExample = {
        title: '基本的な使用例',
        // missing code, language
      };

      expect(isCodeExample(invalidExample)).toBe(false);
    });
  });

  describe('Command type', () => {
    it('should have required properties', async () => {
      const { isCommand } = await import('../../../spa/src/data/types');

      const validCommand = {
        id: 'spec-init',
        name: '/kiro-spec-init',
        description: '新しい仕様を初期化',
        syntax: '/kiro-spec-init "description"',
        parameters: [
          {
            name: 'description',
            type: 'string',
            required: true,
            description: '機能の説明',
          },
        ],
        examples: [
          {
            title: '基本的な使用例',
            code: '/kiro-spec-init "ユーザー認証機能"',
            language: 'bash',
          },
        ],
      };

      expect(isCommand(validCommand)).toBe(true);
    });

    it('should require at least one example', async () => {
      const { isCommand } = await import('../../../spa/src/data/types');

      const commandWithNoExamples = {
        id: 'spec-init',
        name: '/kiro-spec-init',
        description: '新しい仕様を初期化',
        syntax: '/kiro-spec-init "description"',
        parameters: [],
        examples: [], // Business rule: must have at least one example
      };

      expect(isCommand(commandWithNoExamples)).toBe(false);
    });
  });

  describe('EarsPattern type', () => {
    it('should have required properties', async () => {
      const { isEarsPattern } = await import('../../../spa/src/data/types');

      const validPattern = {
        id: 'event-driven',
        name: 'Event-Driven',
        pattern: 'WHEN <trigger>, the <system> SHALL <action>.',
        description: 'イベント発生時の動作を定義',
        examples: ['ユーザーがログインボタンをクリックしたとき'],
      };

      expect(isEarsPattern(validPattern)).toBe(true);
    });

    it('should reject invalid EarsPattern objects', async () => {
      const { isEarsPattern } = await import('../../../spa/src/data/types');

      const invalidPattern = {
        id: 'event-driven',
        name: 'Event-Driven',
        // missing pattern, description, examples
      };

      expect(isEarsPattern(invalidPattern)).toBe(false);
    });
  });

  describe('Section type', () => {
    it('should have required properties', async () => {
      const { isSection } = await import('../../../spa/src/data/types');

      const validSection = {
        id: 'workflow',
        title: 'ワークフロー',
      };

      expect(isSection(validSection)).toBe(true);
    });

    it('should allow optional icon property', async () => {
      const { isSection } = await import('../../../spa/src/data/types');

      const sectionWithIcon = {
        id: 'workflow',
        title: 'ワークフロー',
        icon: '🔄',
      };

      expect(isSection(sectionWithIcon)).toBe(true);
    });

    it('should reject invalid Section objects', async () => {
      const { isSection } = await import('../../../spa/src/data/types');

      const invalidSection = {
        id: 'workflow',
        // missing title
      };

      expect(isSection(invalidSection)).toBe(false);
    });
  });
});

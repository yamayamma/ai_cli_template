/**
 * Task 2.5: Steering/Specs概念説明データのテスト
 * TDD: RED - SteeringとSpecsの概念データの存在と構造を検証するテスト
 */

import { describe, expect, it } from 'vitest';

describe('Steering and Specs Concepts Content Data', () => {
  describe('steering concept', () => {
    it('should export steering concept with required properties', async () => {
      const { steeringConcept } = await import('../../../spa/src/data/concepts');

      expect(steeringConcept).toBeDefined();
      expect(steeringConcept.id).toBe('steering');
      expect(steeringConcept.title).toBeTruthy();
      expect(steeringConcept.description).toBeTruthy();
      expect(steeringConcept.path).toBe('.kiro/steering/');
      expect(Array.isArray(steeringConcept.purposes)).toBe(true);
      expect(steeringConcept.purposes.length).toBeGreaterThanOrEqual(1);
    });

    it('should explain that steering is for project-wide rules and context', async () => {
      const { steeringConcept } = await import('../../../spa/src/data/concepts');

      // Description or purposes should mention project-wide scope
      const combinedText = steeringConcept.description + steeringConcept.purposes.join(' ');
      expect(combinedText).toMatch(/プロジェクト|全体|ルール|コンテキスト/);
    });
  });

  describe('specs concept', () => {
    it('should export specs concept with required properties', async () => {
      const { specsConcept } = await import('../../../spa/src/data/concepts');

      expect(specsConcept).toBeDefined();
      expect(specsConcept.id).toBe('specs');
      expect(specsConcept.title).toBeTruthy();
      expect(specsConcept.description).toBeTruthy();
      expect(specsConcept.path).toBe('.kiro/specs/');
      expect(Array.isArray(specsConcept.purposes)).toBe(true);
      expect(specsConcept.purposes.length).toBeGreaterThanOrEqual(1);
    });

    it('should explain that specs is for individual feature development process', async () => {
      const { specsConcept } = await import('../../../spa/src/data/concepts');

      // Description or purposes should mention individual features
      const combinedText = specsConcept.description + specsConcept.purposes.join(' ');
      expect(combinedText).toMatch(/機能|個別|開発プロセス|形式化/);
    });
  });

  describe('comparison table data', () => {
    it('should export comparison items for table display', async () => {
      const { comparisonItems } = await import('../../../spa/src/data/concepts');

      expect(Array.isArray(comparisonItems)).toBe(true);
      expect(comparisonItems.length).toBeGreaterThanOrEqual(3);
    });

    it('should have required structure for each comparison item', async () => {
      const { comparisonItems } = await import('../../../spa/src/data/concepts');

      for (const item of comparisonItems) {
        expect(item.aspect).toBeTruthy();
        expect(item.steering).toBeTruthy();
        expect(item.specs).toBeTruthy();
      }
    });

    it('should include key comparison aspects', async () => {
      const { comparisonItems } = await import('../../../spa/src/data/concepts');

      const aspects = comparisonItems.map((item: { aspect: string }) => item.aspect);

      // Should cover scope, files, and usage
      expect(aspects.some((a: string) => a.match(/スコープ|範囲|対象/))).toBe(true);
      expect(aspects.some((a: string) => a.match(/ファイル|構成/))).toBe(true);
    });
  });

  describe('Concept type structure', () => {
    it('should have isConcept type guard function', async () => {
      const { isConcept } = await import('../../../spa/src/data/concepts');

      expect(typeof isConcept).toBe('function');

      const validConcept = {
        id: 'test',
        title: 'Test',
        description: 'Test description',
        path: '/test/',
        purposes: ['purpose1'],
      };

      expect(isConcept(validConcept)).toBe(true);

      const invalidConcept = {
        id: 'test',
        // missing other fields
      };

      expect(isConcept(invalidConcept)).toBe(false);
    });
  });
});

/**
 * Task 2.4: EARSパターンデータのテスト
 * TDD: RED - EARSパターンデータの存在と構造を検証するテスト
 */

import { describe, expect, it } from 'vitest';
import type { EarsPattern } from '../../../spa/src/data/types';
import { isEarsPattern } from '../../../spa/src/data/types';

describe('EARS Patterns Content Data', () => {
  describe('ears patterns data structure', () => {
    it('should export earsPatterns array with exactly 5 patterns', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      expect(Array.isArray(earsPatterns)).toBe(true);
      expect(earsPatterns).toHaveLength(5);
    });

    it('should have all patterns conform to EarsPattern type', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      for (const pattern of earsPatterns) {
        expect(isEarsPattern(pattern)).toBe(true);
      }
    });

    it('should have unique IDs for all patterns', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const ids = earsPatterns.map((p: EarsPattern) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(earsPatterns.length);
    });

    it('should have at least one example for each pattern', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      for (const pattern of earsPatterns) {
        expect(pattern.examples.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('Event-Driven pattern', () => {
    it('should exist with correct structure', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const eventDriven = earsPatterns.find((p: EarsPattern) => p.id === 'event-driven');
      expect(eventDriven).toBeDefined();
      expect(eventDriven?.name).toBe('Event-Driven');
      expect(eventDriven?.pattern).toContain('WHEN');
      expect(eventDriven?.description).toBeTruthy();
      expect(eventDriven?.examples.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('State-Driven pattern', () => {
    it('should exist with correct structure', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const stateDriven = earsPatterns.find((p: EarsPattern) => p.id === 'state-driven');
      expect(stateDriven).toBeDefined();
      expect(stateDriven?.name).toBe('State-Driven');
      expect(stateDriven?.pattern).toContain('WHILE');
      expect(stateDriven?.description).toBeTruthy();
    });
  });

  describe('Unwanted Behavior pattern', () => {
    it('should exist with correct structure', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const unwanted = earsPatterns.find((p: EarsPattern) => p.id === 'unwanted-behavior');
      expect(unwanted).toBeDefined();
      expect(unwanted?.name).toBe('Unwanted Behavior');
      expect(unwanted?.pattern).toContain('IF');
      expect(unwanted?.description).toBeTruthy();
    });
  });

  describe('Optional Feature pattern', () => {
    it('should exist with correct structure', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const optional = earsPatterns.find((p: EarsPattern) => p.id === 'optional-feature');
      expect(optional).toBeDefined();
      expect(optional?.name).toBe('Optional Feature');
      expect(optional?.pattern).toContain('WHERE');
      expect(optional?.description).toBeTruthy();
    });
  });

  describe('Ubiquitous pattern', () => {
    it('should exist with correct structure', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      const ubiquitous = earsPatterns.find((p: EarsPattern) => p.id === 'ubiquitous');
      expect(ubiquitous).toBeDefined();
      expect(ubiquitous?.name).toBe('Ubiquitous');
      expect(ubiquitous?.pattern).toContain('SHALL');
      expect(ubiquitous?.description).toBeTruthy();
    });
  });

  describe('pattern templates', () => {
    it('should have valid template patterns with placeholders', async () => {
      const { earsPatterns } = await import('../../../spa/src/data/ears-patterns');

      for (const pattern of earsPatterns) {
        // Each pattern should contain angle bracket placeholders
        expect(pattern.pattern).toMatch(/<[^>]+>/);
      }
    });
  });
});

/**
 * Task 2.2: SDDフェーズコンテンツデータのテスト
 * TDD: RED - フェーズデータの存在と構造を検証するテスト
 */

import { describe, expect, it } from 'vitest';
import type { Phase } from '../../../spa/src/data/types';
import { isPhase } from '../../../spa/src/data/types';

describe('SDD Phases Content Data', () => {
  describe('phases data structure', () => {
    it('should export phases array with exactly 3 phases', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      expect(Array.isArray(phases)).toBe(true);
      expect(phases).toHaveLength(3);
    });

    it('should have all phases conform to Phase type', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      for (const phase of phases) {
        expect(isPhase(phase)).toBe(true);
      }
    });

    it('should have unique IDs for all phases', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      const ids = phases.map((p: Phase) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(phases.length);
    });
  });

  describe('Requirements phase', () => {
    it('should exist with correct structure', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      const requirementsPhase = phases.find((p: Phase) => p.id === 'requirements');
      expect(requirementsPhase).toBeDefined();
      expect(requirementsPhase?.title).toBe('Requirements');
      expect(requirementsPhase?.description).toBeTruthy();
      expect(requirementsPhase?.outputs).toContain('requirements.md');
      expect(requirementsPhase?.icon).toBeTruthy();
    });
  });

  describe('Design phase', () => {
    it('should exist with correct structure', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      const designPhase = phases.find((p: Phase) => p.id === 'design');
      expect(designPhase).toBeDefined();
      expect(designPhase?.title).toBe('Design');
      expect(designPhase?.description).toBeTruthy();
      expect(designPhase?.outputs).toContain('design.md');
      expect(designPhase?.icon).toBeTruthy();
    });
  });

  describe('Tasks phase', () => {
    it('should exist with correct structure', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      const tasksPhase = phases.find((p: Phase) => p.id === 'tasks');
      expect(tasksPhase).toBeDefined();
      expect(tasksPhase?.title).toBe('Tasks');
      expect(tasksPhase?.description).toBeTruthy();
      expect(tasksPhase?.outputs).toContain('tasks.md');
      expect(tasksPhase?.icon).toBeTruthy();
    });
  });

  describe('phase order', () => {
    it('should be in correct order: requirements -> design -> tasks', async () => {
      const { phases } = await import('../../../spa/src/data/phases');

      expect(phases[0]?.id).toBe('requirements');
      expect(phases[1]?.id).toBe('design');
      expect(phases[2]?.id).toBe('tasks');
    });
  });
});

/**
 * Task 2.3: Spec Kitコマンドリファレンスデータのテスト
 * TDD: RED - コマンドデータの存在と構造を検証するテスト
 */

import { describe, expect, it } from 'vitest';
import type { Command } from '../../../spa/src/data/types';
import { isCommand } from '../../../spa/src/data/types';

describe('Spec Kit Commands Content Data', () => {
  describe('commands data structure', () => {
    it('should export commands array with at least 5 main commands', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      expect(Array.isArray(commands)).toBe(true);
      expect(commands.length).toBeGreaterThanOrEqual(5);
    });

    it('should have all commands conform to Command type', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      for (const command of commands) {
        expect(isCommand(command)).toBe(true);
      }
    });

    it('should have unique IDs for all commands', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const ids = commands.map((c: Command) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(commands.length);
    });

    it('should have at least one example for each command (business rule)', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      for (const command of commands) {
        expect(command.examples.length).toBeGreaterThanOrEqual(1);
      }
    });
  });

  describe('/kiro-spec-init command', () => {
    it('should exist with correct structure', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const initCommand = commands.find((c: Command) => c.id === 'spec-init');
      expect(initCommand).toBeDefined();
      expect(initCommand?.name).toBe('/kiro-spec-init');
      expect(initCommand?.description).toBeTruthy();
      expect(initCommand?.syntax).toContain('kiro-spec-init');
      expect(initCommand?.examples.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('/kiro-spec-requirements command', () => {
    it('should exist with correct structure', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const reqCommand = commands.find((c: Command) => c.id === 'spec-requirements');
      expect(reqCommand).toBeDefined();
      expect(reqCommand?.name).toBe('/kiro-spec-requirements');
      expect(reqCommand?.description).toBeTruthy();
      expect(reqCommand?.syntax).toContain('kiro-spec-requirements');
    });
  });

  describe('/kiro-spec-design command', () => {
    it('should exist with correct structure', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const designCommand = commands.find((c: Command) => c.id === 'spec-design');
      expect(designCommand).toBeDefined();
      expect(designCommand?.name).toBe('/kiro-spec-design');
      expect(designCommand?.description).toBeTruthy();
      expect(designCommand?.syntax).toContain('kiro-spec-design');
    });
  });

  describe('/kiro-spec-tasks command', () => {
    it('should exist with correct structure', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const tasksCommand = commands.find((c: Command) => c.id === 'spec-tasks');
      expect(tasksCommand).toBeDefined();
      expect(tasksCommand?.name).toBe('/kiro-spec-tasks');
      expect(tasksCommand?.description).toBeTruthy();
      expect(tasksCommand?.syntax).toContain('kiro-spec-tasks');
    });
  });

  describe('/kiro-spec-impl command', () => {
    it('should exist with correct structure', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      const implCommand = commands.find((c: Command) => c.id === 'spec-impl');
      expect(implCommand).toBeDefined();
      expect(implCommand?.name).toBe('/kiro-spec-impl');
      expect(implCommand?.description).toBeTruthy();
      expect(implCommand?.syntax).toContain('kiro-spec-impl');
    });
  });

  describe('command parameters', () => {
    it('should have valid parameter definitions', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      for (const command of commands) {
        for (const param of command.parameters) {
          expect(param.name).toBeTruthy();
          expect(param.type).toBeTruthy();
          expect(typeof param.required).toBe('boolean');
          expect(param.description).toBeTruthy();
        }
      }
    });
  });

  describe('command examples', () => {
    it('should have valid code examples', async () => {
      const { commands } = await import('../../../spa/src/data/commands');

      for (const command of commands) {
        for (const example of command.examples) {
          expect(example.title).toBeTruthy();
          expect(example.code).toBeTruthy();
          expect(example.language).toBeTruthy();
        }
      }
    });
  });
});

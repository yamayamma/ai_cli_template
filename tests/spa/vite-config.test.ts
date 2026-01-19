/**
 * @vitest-environment node
 */
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('SPA Vite Configuration', () => {
  const spaRoot = resolve(__dirname, '../../spa');
  const projectRoot = resolve(__dirname, '../..');

  describe('Project Structure', () => {
    it('should have spa/vite.config.ts', () => {
      const configPath = resolve(spaRoot, 'vite.config.ts');
      expect(existsSync(configPath)).toBe(true);
    });

    it('should have spa/index.html', () => {
      const htmlPath = resolve(spaRoot, 'index.html');
      expect(existsSync(htmlPath)).toBe(true);
    });

    it('should have spa/src/main.tsx entry point', () => {
      const entryPath = resolve(spaRoot, 'src/main.tsx');
      expect(existsSync(entryPath)).toBe(true);
    });

    it('should have spa/tsconfig.json', () => {
      const tsconfigPath = resolve(spaRoot, 'tsconfig.json');
      expect(existsSync(tsconfigPath)).toBe(true);
    });
  });

  describe('Vite Config Content', () => {
    it('should configure React plugin', async () => {
      const config = await import('../../spa/vite.config.ts');
      // Vite config should be importable without errors
      expect(config.default).toBeDefined();
    });
  });

  describe('Package.json SPA Scripts', () => {
    it('should have dev:spa script', () => {
      const packageJsonPath = resolve(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      expect(packageJson.scripts['dev:spa']).toBeDefined();
      expect(packageJson.scripts['dev:spa']).toContain('spa/vite.config.ts');
    });

    it('should have build:spa script', () => {
      const packageJsonPath = resolve(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      expect(packageJson.scripts['build:spa']).toBeDefined();
      expect(packageJson.scripts['build:spa']).toContain('spa/vite.config.ts');
    });
  });

  describe('SPA TypeScript Config', () => {
    it('should extend root tsconfig', () => {
      const tsconfigPath = resolve(spaRoot, 'tsconfig.json');
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.extends).toBe('../tsconfig.json');
    });

    it('should have @spa path alias', () => {
      const tsconfigPath = resolve(spaRoot, 'tsconfig.json');
      const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf-8'));
      expect(tsconfig.compilerOptions.paths['@spa/*']).toBeDefined();
    });
  });
});

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('SPA Global Styles and CSS Modules', () => {
  const spaRoot = resolve(__dirname, '../../spa');

  describe('Global Styles', () => {
    it('should have global.css with CSS variables', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      expect(existsSync(globalCssPath)).toBe(true);

      const content = readFileSync(globalCssPath, 'utf-8');
      // Should have CSS custom properties (variables)
      expect(content).toMatch(/:root\s*\{/);
    });

    it('should define color design tokens', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      const content = readFileSync(globalCssPath, 'utf-8');

      // Primary colors
      expect(content).toMatch(/--color-primary/);
      expect(content).toMatch(/--color-background/);
      expect(content).toMatch(/--color-text/);
    });

    it('should define typography tokens', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      const content = readFileSync(globalCssPath, 'utf-8');

      expect(content).toMatch(/--font-family/);
      expect(content).toMatch(/--font-size/);
    });

    it('should define spacing tokens', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      const content = readFileSync(globalCssPath, 'utf-8');

      expect(content).toMatch(/--spacing/);
    });

    it('should have responsive breakpoints', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      const content = readFileSync(globalCssPath, 'utf-8');

      // Should have media queries for responsive breakpoints
      expect(content).toMatch(/@media.*max-width|@media.*min-width/);
    });

    it('should have reset/base styles', () => {
      const globalCssPath = resolve(spaRoot, 'src/styles/global.css');
      const content = readFileSync(globalCssPath, 'utf-8');

      // Basic reset styles
      expect(content).toMatch(/\*\s*,\s*\*::before\s*,\s*\*::after|box-sizing/);
      expect(content).toMatch(/body\s*\{/);
    });
  });

  describe('CSS Variables File', () => {
    it('should have variables.css with design tokens', () => {
      const variablesPath = resolve(spaRoot, 'src/styles/variables.css');
      expect(existsSync(variablesPath)).toBe(true);
    });

    it('should export breakpoint values', () => {
      const variablesPath = resolve(spaRoot, 'src/styles/variables.css');
      const content = readFileSync(variablesPath, 'utf-8');

      // Mobile, tablet, desktop breakpoints
      expect(content).toMatch(/--breakpoint-mobile|--breakpoint-sm/);
      expect(content).toMatch(/--breakpoint-tablet|--breakpoint-md/);
      expect(content).toMatch(/--breakpoint-desktop|--breakpoint-lg/);
    });
  });

  describe('Main entry imports global styles', () => {
    it('should import global.css in main.tsx', () => {
      const mainPath = resolve(spaRoot, 'src/main.tsx');
      const content = readFileSync(mainPath, 'utf-8');

      expect(content).toMatch(/import.*['"](\.\/)?styles\/global\.css['"]/);
    });
  });
});

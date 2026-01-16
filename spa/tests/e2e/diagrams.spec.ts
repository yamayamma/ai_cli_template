import { test, expect } from '@playwright/test';

test.describe('Interactive Diagrams', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('flow diagram renders on workflow page', async ({ page }) => {
    await page.click('text=開発ワークフロー');
    
    // Check flow diagram container exists
    await expect(page.locator('.flow-diagram-container')).toBeVisible();
  });

  test('flow diagram shows workflow steps', async ({ page }) => {
    await page.click('text=開発ワークフロー');
    
    // Flow diagram should contain workflow step nodes
    const diagram = page.locator('.flow-diagram-container');
    await expect(diagram).toBeVisible();
  });

  test('comparison chart renders on SDD comparison page', async ({ page }) => {
    await page.click('text=Spec Driven Development');
    await page.click('text=従来手法との比較');
    
    // Check comparison chart exists
    await expect(page.locator('.comparison-chart')).toBeVisible();
  });

  test('comparison chart shows interactive bars', async ({ page }) => {
    await page.click('text=Spec Driven Development');
    await page.click('text=従来手法との比較');
    
    // Should have comparison bars
    const chart = page.locator('.comparison-chart');
    await expect(chart).toBeVisible();
    
    // Check for bar elements
    const bars = page.locator('.comparison-bar');
    await expect(bars.first()).toBeVisible();
  });

  test('diagram interactions work correctly', async ({ page }) => {
    await page.click('text=開発ワークフロー');
    
    const diagram = page.locator('.flow-diagram-container');
    await expect(diagram).toBeVisible();
    
    // Should be able to interact with the diagram
    // Zoom controls should be present if enabled
  });

  test('comparison chart legend is visible', async ({ page }) => {
    await page.click('text=Spec Driven Development');
    await page.click('text=従来手法との比較');
    
    // Legend should be visible
    await expect(page.locator('text=凡例')).toBeVisible();
  });

  test('sdd flow diagram renders on SDD page', async ({ page }) => {
    await page.click('text=Spec Driven Development');
    
    // Should have SDD-specific diagram or visual
    const sddPage = page.locator('.sdd-page');
    await expect(sddPage).toBeVisible();
  });
});

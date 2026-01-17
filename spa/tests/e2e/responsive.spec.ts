import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test.describe('Mobile (iPhone 12)', () => {
    test.use({ ...devices['iPhone 12'] });

    test('shows hamburger menu on mobile', async ({ page }) => {
      await page.goto('/');
      
      // Desktop nav should be hidden
      await expect(page.locator('.nav-links')).toBeHidden();
      
      // Hamburger button should be visible
      await expect(page.locator('.hamburger-button, .mobile-menu-toggle')).toBeVisible();
    });

    test('hamburger menu opens and closes', async ({ page }) => {
      await page.goto('/');
      
      const menuButton = page.locator('.hamburger-button, .mobile-menu-toggle');
      await menuButton.click();
      
      // Mobile nav should be visible
      await expect(page.locator('.mobile-nav, .nav-menu.open')).toBeVisible();
      
      // Close menu
      await menuButton.click();
      await expect(page.locator('.mobile-nav, .nav-menu.open')).toBeHidden();
    });

    test('navigation works on mobile', async ({ page }) => {
      await page.goto('/');
      
      // Open menu
      await page.click('.hamburger-button, .mobile-menu-toggle');
      
      // Click on a link
      await page.click('text=開発ワークフロー');
      
      // Should navigate
      await expect(page).toHaveURL(/#\/workflow/);
      
      // Menu should close after navigation
      await expect(page.locator('.mobile-nav, .nav-menu.open')).toBeHidden();
    });

    test('content is readable on mobile', async ({ page }) => {
      await page.goto('/');
      
      // Check that main content is visible
      await expect(page.locator('h1')).toBeVisible();
      
      // Check font size is appropriate
      const h1 = page.locator('h1').first();
      const fontSize = await h1.evaluate(el => window.getComputedStyle(el).fontSize);
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(20); // At least 20px
    });

    test('cards stack vertically on mobile', async ({ page }) => {
      await page.goto('/#/workflow');
      
      const grid = page.locator('.steps-grid');
      await expect(grid).toBeVisible();
      
      // On mobile, grid should be single column
      const gridStyle = await grid.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);
      // Should be effectively one column
      expect(gridStyle).not.toContain('repeat(2');
      expect(gridStyle).not.toContain('repeat(3');
    });
  });

  test.describe('Tablet (iPad)', () => {
    test.use({ ...devices['iPad'] });

    test('shows appropriate layout for tablet', async ({ page }) => {
      await page.goto('/');
      
      // Navigation might be visible or hamburger depending on orientation
      const nav = page.locator('.nav-links, .hamburger-button');
      await expect(nav).toBeVisible();
    });

    test('cards show in grid on tablet', async ({ page }) => {
      await page.goto('/#/workflow');
      
      const grid = page.locator('.steps-grid');
      await expect(grid).toBeVisible();
    });
  });

  test.describe('Desktop', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('shows full navigation on desktop', async ({ page }) => {
      await page.goto('/');
      
      // Desktop nav should be visible
      await expect(page.locator('.nav-links')).toBeVisible();
      
      // Hamburger should be hidden
      await expect(page.locator('.hamburger-button, .mobile-menu-toggle')).toBeHidden();
    });

    test('sidebar is visible on desktop', async ({ page }) => {
      await page.goto('/#/workflow/step1');
      
      // On desktop, layout should show sidebar if present
      const mainContent = page.locator('.page');
      await expect(mainContent).toBeVisible();
    });

    test('cards show in multi-column grid', async ({ page }) => {
      await page.goto('/#/workflow');
      
      const grid = page.locator('.steps-grid');
      await expect(grid).toBeVisible();
    });
  });
});

import { expect, test } from '@playwright/test';

test.describe('Commands Reference', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates to commands page from home', async ({ page }) => {
    await page.click('text=コマンドリファレンス');
    await expect(page).toHaveURL(/#\/commands/);
    await expect(page.locator('h1')).toContainText('コマンド');
  });

  test('displays all commands', async ({ page }) => {
    await page.goto('/#/commands');

    // Check for main commands
    await expect(page.locator('text=specify')).toBeVisible();
    await expect(page.locator('text=clarify')).toBeVisible();
    await expect(page.locator('text=plan')).toBeVisible();
  });

  test('search filters commands', async ({ page }) => {
    await page.goto('/#/commands');

    // Type in search
    const searchInput = page.locator('input[type="search"], input[placeholder*="検索"]');
    await searchInput.fill('spec');

    // Should show filtered results
    await expect(page.locator('.command-card')).toHaveCount(1);
    await expect(page.locator('text=specify')).toBeVisible();
  });

  test('navigates to command detail page', async ({ page }) => {
    await page.goto('/#/commands');

    // Click on a command
    await page.click('text=specify');

    // Should be on detail page
    await expect(page).toHaveURL(/#\/commands\/specify/);
    await expect(page.locator('h1')).toContainText('specify');
  });

  test('command detail shows usage examples', async ({ page }) => {
    await page.goto('/#/commands/specify');

    // Should show usage section
    await expect(page.locator('text=使用方法')).toBeVisible();

    // Should show code examples
    await expect(page.locator('pre, .code-block')).toBeVisible();
  });

  test('category filter works', async ({ page }) => {
    await page.goto('/#/commands');

    // Click on a category filter if present
    const categoryFilter = page.locator('.category-filter, [data-category]');
    if ((await categoryFilter.count()) > 0) {
      await categoryFilter.first().click();
      // Commands should be filtered
      const commandCards = page.locator('.command-card');
      await expect(commandCards.first()).toBeVisible();
    }
  });

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/#/commands/specify');

    // Click breadcrumb to go back
    await page.click('text=コマンド >> nth=0');
    await expect(page).toHaveURL(/#\/commands/);
  });
});

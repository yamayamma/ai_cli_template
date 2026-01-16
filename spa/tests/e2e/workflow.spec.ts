import { test, expect } from '@playwright/test'

test.describe('Workflow Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to workflow page from home', async ({ page }) => {
    await page.click('text=開発フロー')
    await expect(page).toHaveURL('/#/workflow')
    await expect(page.locator('h1')).toContainText('開発フロー')
  })

  test('should display all 5 workflow steps', async ({ page }) => {
    await page.goto('/#/workflow')
    
    const steps = ['Specify', 'Clarify', 'Plan', 'Execute', 'Verify']
    for (const step of steps) {
      await expect(page.getByText(step)).toBeVisible()
    }
  })

  test('should navigate to individual step pages', async ({ page }) => {
    await page.goto('/#/workflow')
    
    await page.click('text=Specify')
    await expect(page).toHaveURL('/#/workflow/specify')
    await expect(page.locator('h1')).toContainText('Specify')
  })

  test('should navigate between steps using prev/next buttons', async ({ page }) => {
    await page.goto('/#/workflow/specify')
    
    // Should not have "前へ" button on first step
    await expect(page.getByRole('link', { name: '前へ' })).not.toBeVisible()
    
    // Click "次へ" to go to clarify
    await page.click('text=次へ')
    await expect(page).toHaveURL('/#/workflow/clarify')
    
    // Should have both buttons on middle step
    await expect(page.getByRole('link', { name: '前へ' })).toBeVisible()
    await expect(page.getByRole('link', { name: '次へ' })).toBeVisible()
  })

  test('should display breadcrumbs on step pages', async ({ page }) => {
    await page.goto('/#/workflow/specify')
    
    await expect(page.getByRole('link', { name: 'ホーム' })).toBeVisible()
    await expect(page.getByRole('link', { name: '開発フロー' })).toBeVisible()
    await expect(page.getByText('Specify')).toBeVisible()
  })
})

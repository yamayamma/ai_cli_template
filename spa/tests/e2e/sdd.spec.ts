import { test, expect } from '@playwright/test'

test.describe('SDD Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to SDD page from home', async ({ page }) => {
    await page.click('text=Spec Driven Development')
    await expect(page).toHaveURL('/#/sdd')
    await expect(page.locator('h1')).toContainText('Spec Driven Development')
  })

  test('should display SDD subsections', async ({ page }) => {
    await page.goto('/#/sdd')
    
    await expect(page.getByText('基本概念')).toBeVisible()
    await expect(page.getByText('他手法との比較')).toBeVisible()
    await expect(page.getByText('メリット・デメリット')).toBeVisible()
  })

  test('should navigate to concepts page', async ({ page }) => {
    await page.goto('/#/sdd')
    await page.click('text=基本概念')
    await expect(page).toHaveURL('/#/sdd/concepts')
  })

  test('should navigate to comparison page', async ({ page }) => {
    await page.goto('/#/sdd')
    await page.click('text=他手法との比較')
    await expect(page).toHaveURL('/#/sdd/comparison')
  })

  test('should display comparison table', async ({ page }) => {
    await page.goto('/#/sdd/comparison')
    
    await expect(page.getByText('アジャイル')).toBeVisible()
    await expect(page.getByText('ウォーターフォール')).toBeVisible()
  })
})

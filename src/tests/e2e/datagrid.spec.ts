import { test, expect } from '@playwright/test';

test.describe('Data Grid E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.data-grid', { timeout: 10000 });
  });

  test('should load and display data grid', async ({ page }) => {
    const grid = page.locator('.data-grid');
    await expect(grid).toBeVisible();
    
    const headers = page.locator('.data-grid-header th');
    await expect(headers).toHaveCount(6);
  });

  test('should filter data by search text', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('Laptop');
    
    await page.waitForTimeout(500);
    
    const statsBar = page.locator('.stats-bar');
    await expect(statsBar).toContainText('Filtered Items:');
  });

  test('should filter by category', async ({ page }) => {
    const categorySelect = page.locator('#category-select');
    await categorySelect.selectOption('Electronics');
    
    await page.waitForTimeout(300);
    
    const statsBar = page.locator('.stats-bar');
    await expect(statsBar).toBeVisible();
  });

  test('should sort data by clicking column header', async ({ page }) => {
    const priceHeader = page.locator('.data-grid-header th').filter({ hasText: 'Price' });
    await priceHeader.click();
    
    await page.waitForTimeout(200);
    
    await expect(priceHeader).toContainText('↑');
  });

  test('should handle smooth scrolling', async ({ page }) => {
    const gridContainer = page.locator('.data-grid-container');
    
    await gridContainer.evaluate((el) => {
      el.scrollTop = 1000;
    });
    
    await page.waitForTimeout(100);
    
    const scrollTop = await gridContainer.evaluate((el) => el.scrollTop);
    expect(scrollTop).toBeGreaterThan(0);
  });

  test('should reset filters', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('Test');
    
    const resetButton = page.locator('.reset-button');
    await resetButton.click();
    
    await expect(searchInput).toHaveValue('');
  });
});

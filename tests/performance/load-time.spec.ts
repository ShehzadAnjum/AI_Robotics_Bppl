import { test, expect } from '@playwright/test';

/**
 * Performance tests validating SC-012: <2s page load for 95th percentile
 */

test.describe('Page Load Performance (SC-012)', () => {
  test('homepage loads in under 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000); // SC-012: <2s for 95% of users
  });

  test('chapter page loads in under 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/docs/intro');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    expect(loadTime).toBeLessThan(2000);
  });
});

import { test, expect } from '@playwright/test';

/**
 * Navigation tests validating SC-014: <30s topic discovery
 */

test.describe('Search and Navigation (SC-014)', () => {
  test('search functionality is accessible', async ({ page }) => {
    await page.goto('/');

    // Check if search button/input exists
    const searchButton = page.getByPlaceholder(/search/i);
    await expect(searchButton).toBeVisible();
  });

  test.skip('can find topic via search in under 30 seconds', async ({ page }) => {
    // Skip until content is created
    await page.goto('/');

    const startTime = Date.now();

    // Search for a topic
    await page.getByPlaceholder(/search/i).click();
    await page.getByPlaceholder(/search/i).fill('ROS2');

    // Wait for search results
    await page.waitForSelector('[data-testid="search-results"]', { timeout: 30000 });

    const searchTime = Date.now() - startTime;
    expect(searchTime).toBeLessThan(30000); // SC-014: <30s topic discovery
  });
});

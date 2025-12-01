import { test, expect } from '@playwright/test';

/**
 * Responsive design tests validating SC-013: mobile/tablet/desktop functionality
 */

test.describe('Responsive Design (SC-013)', () => {
  test('homepage is responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');

    await expect(page).toHaveTitle(/Physical AI & Humanoid Robotics/i);

    // Check that navigation is accessible (hamburger menu on mobile)
    const navButton = page.getByRole('button', { name: /menu|navigation/i });
    await expect(navButton).toBeVisible();
  });

  test('homepage is responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto('/');

    await expect(page).toHaveTitle(/Physical AI & Humanoid Robotics/i);
  });

  test('homepage is responsive on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
    await page.goto('/');

    await expect(page).toHaveTitle(/Physical AI & Humanoid Robotics/i);
  });
});

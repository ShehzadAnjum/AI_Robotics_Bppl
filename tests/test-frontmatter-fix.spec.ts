/**
 * Verify frontmatter is NOT showing in rendered content
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/AI_Robotics_Bppl';

test('Chapter 3: Frontmatter should not be visible', async ({ page }) => {
  await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);

  // Get main content
  const mainContent = await page.locator('article').first().textContent();

  // Check frontmatter is NOT visible
  const hasSidebarPosition = mainContent?.includes('sidebar_position:');
  const hasDescription = mainContent?.includes('description:');

  console.log('\n🔍 Checking frontmatter visibility...');
  console.log(`❌ sidebar_position visible: ${hasSidebarPosition}`);
  console.log(`❌ description visible (in content): ${hasDescription}`);

  // Frontmatter should NOT be in main content
  expect(hasSidebarPosition).toBe(false);

  // Check that actual content IS visible
  const hasTitle = mainContent?.includes('Chapter 3: Programming Basics');
  const hasPythonContent = mainContent?.includes('Python');
  const hasROS2Content = mainContent?.includes('ROS2');

  console.log(`\n✅ Title visible: ${hasTitle}`);
  console.log(`✅ Python content visible: ${hasPythonContent}`);
  console.log(`✅ ROS2 content visible: ${hasROS2Content}`);

  expect(hasTitle).toBe(true);
  expect(hasPythonContent).toBe(true);
  expect(hasROS2Content).toBe(true);

  // Screenshot
  await page.screenshot({ path: '/tmp/chapter3-frontmatter-fix.png', fullPage: false });

  console.log('\n✅ Frontmatter is properly hidden!');
  console.log('📸 Screenshot: /tmp/chapter3-frontmatter-fix.png');
});

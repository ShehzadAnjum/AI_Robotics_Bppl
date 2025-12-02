/**
 * Simple focused test for Chapter 3
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/AI_Robotics_Bppl';

test('Chapter 3 renders and displays content', async ({ page }) => {
  // Navigate to Chapter 3
  await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000); // Wait for React components and Mermaid

  // Take screenshot
  await page.screenshot({ path: '/tmp/chapter3-test.png', fullPage: true });

  // Check title
  const title = await page.title();
  console.log(`📄 Page title: ${title}`);
  expect(title).toContain('Programming Basics');

  // Check for main heading
  const h1 = await page.locator('h1').first().textContent();
  console.log(`📝 Main heading: ${h1}`);
  expect(h1).toContain('Programming Basics');

  // Count all headings
  const headingCount = await page.locator('h1, h2, h3, h4').count();
  console.log(`📊 Total headings: ${headingCount}`);
  expect(headingCount).toBeGreaterThan(30);

  // Count code blocks
  const codeBlocks = await page.locator('pre code').count();
  console.log(`💻 Code blocks: ${codeBlocks}`);
  expect(codeBlocks).toBeGreaterThan(20);

  // Check for specific Python/ROS2 content
  const bodyText = await page.locator('article').first().textContent();
  console.log(`✅ Contains 'rclpy': ${bodyText?.includes('rclpy')}`);
  console.log(`✅ Contains 'Node': ${bodyText?.includes('Node')}`);
  console.log(`✅ Contains 'publisher': ${bodyText?.includes('publisher')}`);
  console.log(`✅ Contains 'subscriber': ${bodyText?.includes('subscriber')}`);

  expect(bodyText).toContain('rclpy');
  expect(bodyText).toContain('Publisher');
  expect(bodyText).toContain('Subscriber');

  // Check for Mermaid diagrams (look for SVG)
  await page.waitForTimeout(2000); // Extra time for Mermaid to render
  const svgs = await page.locator('svg').count();
  console.log(`📊 SVG elements (diagrams): ${svgs}`);

  // Check for interactive components
  const details = await page.locator('details').count();
  console.log(`❓ Self-evaluation questions: ${details}`);
  expect(details).toBeGreaterThan(3);

  // Check for external links
  const externalLinks = await page.locator('a[href^="http"]').count();
  console.log(`🔗 External links (sources): ${externalLinks}`);
  expect(externalLinks).toBeGreaterThan(15);

  console.log('\n✅ Chapter 3 test PASSED - All content renders correctly!');
});

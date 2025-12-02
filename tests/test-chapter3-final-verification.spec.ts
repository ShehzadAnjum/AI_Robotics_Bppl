/**
 * Final verification test for Chapter 3 after Mermaid fix
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/AI_Robotics_Bppl';

test('Chapter 3: Final verification - No errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });

  // Navigate to Chapter 3
  console.log('\n🔍 Testing Chapter 3...');
  await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Take screenshot
  await page.screenshot({ path: '/tmp/chapter3-final.png', fullPage: true });

  // Check page loads
  const title = await page.title();
  console.log(`✅ Page title: ${title}`);
  expect(title).toContain('Programming Basics');

  // Check content
  const headings = await page.locator('h1, h2, h3').count();
  const codeBlocks = await page.locator('pre code').count();
  const svgs = await page.locator('svg').count();

  console.log(`✅ Headings: ${headings}`);
  console.log(`✅ Code blocks: ${codeBlocks}`);
  console.log(`✅ SVG elements (diagrams): ${svgs}`);

  expect(headings).toBeGreaterThan(30);
  expect(codeBlocks).toBeGreaterThan(20);
  expect(svgs).toBeGreaterThan(3); // At least 3 Mermaid diagrams

  // Filter critical errors (exclude known non-critical ones)
  const criticalErrors = consoleErrors.filter(
    err => !err.includes('Failed to load resource') && !err.includes('PwaReloadPopup')
  );

  const criticalPageErrors = pageErrors.filter(
    err => !err.includes('Failed to load resource')
  );

  console.log(`\n📊 Console errors: ${criticalErrors.length}`);
  console.log(`📊 Page errors: ${criticalPageErrors.length}`);
  console.log(`📊 Console warnings: ${consoleWarnings.length}`);

  if (criticalErrors.length > 0) {
    console.log('\n❌ Critical errors found:');
    criticalErrors.forEach((err, i) => {
      console.log(`   ${i+1}. ${err.substring(0, 200)}`);
    });
  }

  if (criticalPageErrors.length > 0) {
    console.log('\n❌ Page errors found:');
    criticalPageErrors.forEach((err, i) => {
      console.log(`   ${i+1}. ${err.substring(0, 200)}`);
    });
  }

  // Expect no critical errors
  expect(criticalErrors.length).toBe(0);
  expect(criticalPageErrors.length).toBe(0);

  console.log('\n✅ Chapter 3 VERIFICATION PASSED - Zero errors!');
  console.log('📸 Screenshot saved: /tmp/chapter3-final.png');
});

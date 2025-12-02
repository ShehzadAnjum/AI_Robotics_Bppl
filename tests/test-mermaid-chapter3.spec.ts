/**
 * Test Mermaid diagrams in Chapter 3 specifically
 */

import { test } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/AI_Robotics_Bppl';

test('Capture Mermaid errors in Chapter 3', async ({ page }) => {
  const consoleErrors: string[] = [];
  const consoleWarnings: string[] = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.log('❌ ERROR:', text.substring(0, 200));
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(text);
      console.log('⚠️  WARNING:', text.substring(0, 200));
    }
  });

  page.on('pageerror', error => {
    console.log('💥 PAGE ERROR:', error.message.substring(0, 200));
  });

  // Navigate to Chapter 3
  await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  console.log('\n📊 Total console errors:', consoleErrors.length);
  console.log('📊 Total console warnings:', consoleWarnings.length);

  // Check Mermaid diagrams
  const mermaidDivs = await page.locator('.mermaid').count();
  const svgs = await page.locator('.mermaid svg').count();

  console.log('\n🎨 Mermaid code blocks found:', mermaidDivs);
  console.log('🎨 Mermaid SVGs rendered:', svgs);

  // Look for specific error patterns
  const mermaidErrors = consoleErrors.filter(e =>
    e.includes('Mermaid') || e.includes('mermaid') || e.includes('diagram')
  );

  if (mermaidErrors.length > 0) {
    console.log('\n🔍 Mermaid-specific errors:');
    mermaidErrors.forEach((err, i) => {
      console.log(`   ${i+1}. ${err.substring(0, 300)}`);
    });
  }

  // Take screenshot
  await page.screenshot({ path: '/tmp/chapter3-mermaid-debug.png', fullPage: true });
  console.log('\n📸 Screenshot saved to /tmp/chapter3-mermaid-debug.png');
});

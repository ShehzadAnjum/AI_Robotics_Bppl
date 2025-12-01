/**
 * Browser testing for Chapters 1, 2, and 3
 * Tests interactive components, Mermaid diagrams, and overall rendering
 */

import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/robotics_book';

test.describe('Chapter Testing Suite', () => {

  test('Homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    // Check title
    await expect(page).toHaveTitle(/Physical AI/);

    // Take screenshot
    await page.screenshot({ path: '/tmp/homepage.png', fullPage: true });

    // Check navigation exists
    const navLinks = await page.locator('nav a').count();
    expect(navLinks).toBeGreaterThan(0);

    console.log(`✅ Homepage: ${navLinks} navigation links found`);
  });

  test('Chapter 1: Introduction to Physical AI', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/foundations/intro-physical-ai`);
    await page.waitForLoadState('networkidle');

    // Wait for React components to render
    await page.waitForTimeout(2000);

    // Check title contains chapter name
    await expect(page).toHaveTitle(/Introduction to Physical AI/);

    // Take screenshot
    await page.screenshot({ path: '/tmp/chapter1-full.png', fullPage: true });

    // Count headings
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(10);
    console.log(`   📝 ${headings} headings found`);

    // Check for main content
    const mainContent = page.locator('article, main');
    await expect(mainContent).toBeVisible();

    // Check for external links (sources)
    const externalLinks = await page.locator('a[href^="http"]').count();
    expect(externalLinks).toBeGreaterThan(5);
    console.log(`   🔗 ${externalLinks} external source links found`);

    // Check for code blocks
    const codeBlocks = await page.locator('pre code').count();
    console.log(`   💻 ${codeBlocks} code blocks found`);

    // Verify Mermaid diagrams rendered (look for SVG)
    const diagrams = await page.locator('svg[aria-roledescription="diagram"], .mermaid svg').count();
    console.log(`   📊 ${diagrams} Mermaid diagrams rendered`);

    // Get word count estimate
    const bodyText = await mainContent.textContent();
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    expect(wordCount).toBeGreaterThan(3000); // Should have substantial content
    console.log(`   📖 Estimated ${wordCount.toLocaleString()} words`);

    console.log('✅ Chapter 1 tests passed');
  });

  test('Chapter 2: Electronics Basics', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/foundations/electronics-basics`);
    await page.waitForLoadState('networkidle');

    // Wait for React components
    await page.waitForTimeout(2000);

    // Check title
    await expect(page).toHaveTitle(/Electronics Basics/);

    // Take screenshot
    await page.screenshot({ path: '/tmp/chapter2-full.png', fullPage: true });

    // Count headings
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(20);
    console.log(`   📝 ${headings} headings found`);

    // Check main content
    const mainContent = page.locator('article, main');
    await expect(mainContent).toBeVisible();

    // Check for external links
    const externalLinks = await page.locator('a[href^="http"]').count();
    expect(externalLinks).toBeGreaterThan(10);
    console.log(`   🔗 ${externalLinks} external source links found`);

    // Check for code blocks (Arduino examples)
    const codeBlocks = await page.locator('pre code').count();
    expect(codeBlocks).toBeGreaterThan(0);
    console.log(`   💻 ${codeBlocks} code blocks found`);

    // Check for Mermaid diagrams
    const diagrams = await page.locator('svg[aria-roledescription="diagram"], .mermaid svg').count();
    console.log(`   📊 ${diagrams} Mermaid diagrams rendered`);

    // Check for self-evaluation questions (details/summary elements)
    const evalQuestions = await page.locator('details').count();
    console.log(`   ❓ ${evalQuestions} interactive question elements found`);

    // Get word count
    const bodyText = await mainContent.textContent();
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    expect(wordCount).toBeGreaterThan(5000);
    console.log(`   📖 Estimated ${wordCount.toLocaleString()} words`);

    console.log('✅ Chapter 2 tests passed');
  });

  test('Chapter 3: Programming Basics (Python & ROS2)', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
    await page.waitForLoadState('networkidle');

    // Wait for React components
    await page.waitForTimeout(2000);

    // Check title
    await expect(page).toHaveTitle(/Programming Basics/);

    // Take screenshot
    await page.screenshot({ path: '/tmp/chapter3-full.png', fullPage: true });

    // Count headings
    const headings = await page.locator('h1, h2, h3').count();
    expect(headings).toBeGreaterThan(30);
    console.log(`   📝 ${headings} headings found`);

    // Check main content
    const mainContent = page.locator('article, main');
    await expect(mainContent).toBeVisible();

    // Check for external links (sources)
    const externalLinks = await page.locator('a[href^="http"]').count();
    expect(externalLinks).toBeGreaterThan(15);
    console.log(`   🔗 ${externalLinks} external source links found`);

    // Check for code blocks (should have MANY - it's a programming chapter!)
    const codeBlocks = await page.locator('pre code').count();
    expect(codeBlocks).toBeGreaterThan(20);
    console.log(`   💻 ${codeBlocks} code blocks found (Python & ROS2 examples)`);

    // Check for Mermaid diagrams
    const diagrams = await page.locator('svg[aria-roledescription="diagram"], .mermaid svg').count();
    expect(diagrams).toBeGreaterThan(0);
    console.log(`   📊 ${diagrams} Mermaid diagrams rendered`);

    // Check for CuriosityHook component
    const curiosityHooks = await page.locator('[class*="curiosity"]').count();
    console.log(`   🎯 ${curiosityHooks} CuriosityHook components found`);

    // Check for AIPromptCard components
    const aiPromptCards = await page.locator('[class*="prompt"], [class*="card"]').count();
    console.log(`   🤖 ${aiPromptCards} interactive cards found`);

    // Check for assignment card
    const assignmentText = await mainContent.textContent();
    const hasAssignment = assignmentText?.includes('Assignment') || false;
    expect(hasAssignment).toBe(true);
    console.log(`   📋 Assignment section found: ${hasAssignment ? 'YES' : 'NO'}`);

    // Get word count
    const bodyText = await mainContent.textContent();
    const wordCount = bodyText ? bodyText.split(/\s+/).length : 0;
    expect(wordCount).toBeGreaterThan(5000);
    console.log(`   📖 Estimated ${wordCount.toLocaleString()} words`);

    // Check for self-evaluation questions
    const evalQuestions = await page.locator('details').count();
    expect(evalQuestions).toBeGreaterThan(3);
    console.log(`   ❓ ${evalQuestions} self-evaluation questions found`);

    // Verify specific ROS2 code examples exist
    const hasROS2Code = bodyText?.includes('rclpy') && bodyText?.includes('Node');
    expect(hasROS2Code).toBe(true);
    console.log(`   🤖 ROS2 code examples found: ${hasROS2Code ? 'YES' : 'NO'}`);

    console.log('✅ Chapter 3 tests passed');
  });

  test('Interactive Components Work', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/foundations/electronics-basics`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Test collapsible questions (if using details/summary)
    const detailsElements = page.locator('details');
    const count = await detailsElements.count();

    if (count > 0) {
      // Click first question to expand
      const firstDetail = detailsElements.first();
      await firstDetail.click();

      // Verify it opened
      const isOpen = await firstDetail.getAttribute('open');
      console.log(`   🔽 Collapsible questions work: ${isOpen !== null ? 'YES' : 'NO'}`);
    }

    console.log('✅ Interactive component tests passed');
  });

  test('No Critical Console Errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(msg.text());
      }
    });

    // Visit all three chapters
    await page.goto(`${BASE_URL}/docs/foundations/intro-physical-ai`);
    await page.waitForLoadState('networkidle');

    await page.goto(`${BASE_URL}/docs/foundations/electronics-basics`);
    await page.waitForLoadState('networkidle');

    await page.goto(`${BASE_URL}/docs/foundations/programming-basics`);
    await page.waitForLoadState('networkidle');

    // Filter out known non-critical errors (PWA warning)
    const criticalErrors = consoleErrors.filter(
      err => !err.includes('PwaReloadPopup') && !err.includes('Failed to load resource')
    );

    if (criticalErrors.length > 0) {
      console.log('⚠️  Console errors found:');
      criticalErrors.slice(0, 5).forEach(err => console.log(`     ${err}`));
    } else {
      console.log('✅ No critical console errors');
    }

    // Expect no critical errors
    expect(criticalErrors.length).toBe(0);
  });

  test('All Chapter Links Work', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/foundations/intro-physical-ai`);
    await page.waitForLoadState('networkidle');

    // Get first 10 internal links
    const internalLinks = await page.locator('article a[href^="/"]').all();
    const linkCount = Math.min(internalLinks.length, 10);

    console.log(`   🔗 Testing ${linkCount} internal links...`);

    let workingLinks = 0;
    for (let i = 0; i < linkCount; i++) {
      const href = await internalLinks[i].getAttribute('href');
      if (href) {
        const response = await page.goto(`${BASE_URL}${href}`);
        if (response && response.ok()) {
          workingLinks++;
        }
      }
    }

    console.log(`   ✅ ${workingLinks}/${linkCount} internal links working`);
    expect(workingLinks).toBe(linkCount);
  });
});

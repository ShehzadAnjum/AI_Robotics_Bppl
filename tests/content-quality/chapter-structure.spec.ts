import { test, expect } from '@playwright/test';

/**
 * Test suite for validating 12-element chapter structure (FR-003)
 * Each chapter MUST include all 12 structural elements
 */

const CHAPTER_ELEMENTS = [
  { name: 'Attention-Seeker Hook', selector: '[data-testid="curiosity-hook"]' },
  { name: 'Driving Question', selector: '[data-testid="driving-question"]' },
  { name: 'Real-World Example', selector: '[data-testid="example-section"]' },
  { name: 'Use Case', selector: '[data-testid="use-case"]' },
  { name: 'Concept Teaching', selector: '[data-testid="teaching-content"]' },
  { name: 'Visual Diagrams', selector: 'img, [data-testid="diagram"]' },
  { name: 'Expert Insights', selector: '[data-testid="expert-insight"]' },
  { name: 'AI Learning Prompts', selector: '[data-testid="ai-prompt"]' },
  { name: 'Hands-On Practice', selector: '[data-testid="practice-exercise"]' },
  { name: 'Self-Evaluation Questions', selector: '[data-testid="self-eval"]' },
  { name: 'Assignment', selector: '[data-testid="assignment"]' },
  { name: 'Curiosity Hook (Next Chapter)', selector: '[data-testid="next-chapter-hook"]' },
];

test.describe('Chapter Structure Validation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Physical AI & Humanoid Robotics/i);
  });

  test.skip('Chapter 1 has all 12 structural elements', async ({ page }) => {
    // Skip until Chapter 1 is created
    await page.goto('/docs/foundations/intro-physical-ai');

    for (const element of CHAPTER_ELEMENTS) {
      await test.step(`Verify ${element.name} is present`, async () => {
        const elementExists = await page.locator(element.selector).count() > 0;
        expect(elementExists, `${element.name} must be present`).toBeTruthy();
      });
    }
  });
});

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Sidebar configuration
 * Phase A2: Using autogeneration until content is created in Phase B
 * Phase B+: Will switch to structured sidebar based on chapter-index.md
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'how-to-use-search',
    'intro',
    {
      type: 'category',
      label: 'Foundations',
      items: [
        'foundations/intro-physical-ai',
        'foundations/electronics-basics',
        'foundations/programming-basics',
      ],
      collapsible: true,
      collapsed: false,
    },
  ],
};

export default sidebars;

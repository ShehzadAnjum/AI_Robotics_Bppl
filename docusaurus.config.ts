import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Interactive educational book for learning robotics from scratch',
  favicon: 'img/favicon.ico',

  url: 'https://ShehzadAnjum.github.io',
  baseUrl: '/AI_Robotics_Bppl/',

  organizationName: 'ShehzadAnjum',
  projectName: 'AI_Robotics_Bppl',

  onBrokenLinks: 'warn', // Changed to 'warn' for Phase A2 (no content yet)
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'], // Future: add 'ur' for Urdu (Phase 3)
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false, // Disable blog feature
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Local Search Plugin - Provides search functionality with keyboard shortcuts
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Index all content: docs, pages, and blog
        hashed: true,

        // Language settings
        language: ['en'],

        // Search bar customization
        indexDocs: true,
        indexBlog: false,
        indexPages: true,

        // Search results configuration
        docsRouteBasePath: '/docs',

        // Highlight search terms in results
        highlightSearchTermsOnTargetPage: true,

        // Search context length
        searchResultContextMaxLength: 50,

        // Enable keyboard shortcuts: Ctrl+K or Cmd+K
        // Also supports Ctrl+F override (configured in theme)
        searchBarShortcutHint: true,

        // Search everything: titles, headings, content
        explicitSearchResultPath: true,

        // Search in current page or whole book
        searchResultLimits: 8,

        // Include tags and keywords in search
        ignoreFiles: [],

        // Remove search index from production build
        removeDefaultStopWordFilter: false,
      },
    ],

    // PWA plugin temporarily disabled for testing - re-enable in production
    // [
    //   '@docusaurus/plugin-pwa',
    //   {
    //     debug: false,
    //     offlineModeActivationStrategies: [
    //       'appInstalled',
    //       'standalone',
    //       'queryString',
    //     ],
    //     pwaHead: [
    //       {
    //         tagName: 'link',
    //         rel: 'icon',
    //         href: '/img/logo.png',
    //       },
    //       {
    //         tagName: 'link',
    //         rel: 'manifest',
    //         href: '/manifest.json',
    //       },
    //       {
    //         tagName: 'meta',
    //         name: 'theme-color',
    //         content: '#1877f2',
    //       },
    //     ],
    //   },
    // ],
  ],

  scripts: [
    // AI Chat Widget
    {
      src: '/AI_Robotics_Bppl/chat-widget.js',
      async: true,
    },
  ],

  stylesheets: [
    // AI Chat Widget CSS
    '/AI_Robotics_Bppl/chat-widget.css',
  ],

  themeConfig: {
    image: 'img/social-card.png',
    navbar: {
      title: 'Physical AI & Robotics',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Learn',
        },
        {
          href: 'https://github.com/ShehzadAnjum/AI_Robotics_Bppl',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            {
              label: 'Start Learning',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/ShehzadAnjum/AI_Robotics_Bppl/discussions',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Robotics Book Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash', 'yaml'],
    },
    // Using local search plugin instead of Algolia for better offline support
  } satisfies Preset.ThemeConfig,
};

export default config;

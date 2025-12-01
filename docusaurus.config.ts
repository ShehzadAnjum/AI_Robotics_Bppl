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
    algolia: undefined, // TODO: Configure Algolia search in future
  } satisfies Preset.ThemeConfig,
};

export default config;

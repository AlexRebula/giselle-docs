import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as Plugin from '@docusaurus/types/src/plugin';

const config: Config = {
  title: 'Giselle Docs',
  tagline: 'Developer documentation for the @alexrebula/giselle-* packages',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://giselle-docs.vercel.app',
  baseUrl: '/',

  organizationName: 'AlexRebula',
  projectName: 'giselle-docs',

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // Disable the default docs plugin — we use multi-instance below
        docs: false,
        // Disable the blog — not needed for package docs
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'giselle-mui',
        path: '../giselle-mui/docs',
        routeBasePath: 'giselle-mui',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/AlexRebula/giselle-docs/edit/main/',
      } satisfies Plugin.PluginOptions,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'giselle-sections-sdk',
        path: '../giselle-sections-sdk/docs',
        routeBasePath: 'giselle-sections-sdk',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/AlexRebula/giselle-docs/edit/main/',
      } satisfies Plugin.PluginOptions,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'giselle-ui',
        path: '../giselle-ui/docs',
        routeBasePath: 'giselle-ui',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/AlexRebula/giselle-docs/edit/main/',
      } satisfies Plugin.PluginOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Giselle Docs',
      logo: {
        alt: 'Giselle Docs',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          docsPluginId: 'giselle-mui',
          position: 'left',
          label: 'giselle-mui',
        },
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          docsPluginId: 'giselle-sections-sdk',
          position: 'left',
          label: 'giselle-sections-sdk',
        },
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          docsPluginId: 'giselle-ui',
          position: 'left',
          label: 'giselle-ui',
        },
        {
          href: 'https://github.com/AlexRebula/giselle-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Packages',
          items: [
            { label: 'giselle-mui', to: '/giselle-mui/' },
            { label: 'giselle-sections-sdk', to: '/giselle-sections-sdk/' },
            { label: 'giselle-ui', to: '/giselle-ui/' },
          ],
        },
        {
          title: 'Links',
          items: [
            { label: 'npm — giselle-mui', href: 'https://www.npmjs.com/package/@alexrebula/giselle-mui' },
            { label: 'GitHub', href: 'https://github.com/AlexRebula' },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

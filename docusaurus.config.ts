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
        path: '../giselle-mui',
        include: ['README.md', 'docs/**/*.md', 'docs/**/*.mdx'],
        exclude: ['docs/README.md'],
        routeBasePath: 'giselle-mui',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/AlexRebula/giselle-docs/edit/main/',
      } satisfies Plugin.PluginOptions,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'giselle-sections-sdk',
        path: '../giselle-sections-sdk',
        include: ['README.md', 'docs/**/*.md', 'docs/**/*.mdx'],
        exclude: ['docs/README.md'],
        routeBasePath: 'giselle-sections-sdk',
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/AlexRebula/giselle-docs/edit/main/',
      } satisfies Plugin.PluginOptions,
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'giselle-ui',
        path: '../giselle-ui',
        include: ['README.md', 'docs/**/*.md', 'docs/**/*.mdx'],
        exclude: ['docs/README.md'],
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
          label: 'Giselle MUI',
        },
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          docsPluginId: 'giselle-sections-sdk',
          position: 'left',
          label: 'Giselle Sections SDK',
        },
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          docsPluginId: 'giselle-ui',
          position: 'left',
          label: 'Giselle UI',
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
            { label: 'Giselle MUI', to: '/giselle-mui/' },
            { label: 'Giselle Sections SDK', to: '/giselle-sections-sdk/' },
            { label: 'Giselle UI', to: '/giselle-ui/' },
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
            { label: 'Portfolio', href: 'https://alexrebula.com' },
            { label: 'GitHub — AlexRebula', href: 'https://github.com/AlexRebula' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Alex Rebula. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

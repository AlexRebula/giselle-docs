import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type PackageItem = {
  id: string;
  name: string;
  route: string;
  description: string;
  badge: string;
};

const packages: PackageItem[] = [
  {
    id: 'giselle-mui',
    name: '@alexrebula/giselle-mui',
    route: '/giselle-mui/',
    description:
      'React component library built on top of MUI v7 (CSS variables mode). Encodes non-obvious accessibility and design decisions so consumers never have to rediscover them.',
    badge: 'MUI v7 · React 18+',
  },
  {
    id: 'giselle-sections-sdk',
    name: '@alexrebula/giselle-sections-sdk',
    route: '/giselle-sections-sdk/',
    description:
      'Framework-agnostic TypeScript data SDK for the sections-api pattern. Pure types, factory utilities, and generic sample data — no JSX, no UI framework dependency.',
    badge: 'TypeScript · Framework-agnostic',
  },
  {
    id: 'giselle-ui',
    name: '@alexrebula/giselle-ui',
    route: '/giselle-ui/',
    description:
      'Standalone React UI component library themed via CSS Custom Properties. Independent of MUI. Designed to be publishable and composable without an external theme provider.',
    badge: 'React 19 · CSS Custom Properties',
  },
];

function PackageCard({name, route, description, badge}: Omit<PackageItem, 'id'>) {
  return (
    <div className={clsx('col col--4', styles.packageCol)}>
      <div className={styles.card}>
        <div className={styles.cardBadge}>{badge}</div>
        <Heading as="h3" className={styles.cardTitle}>
          {name}
        </Heading>
        <p className={styles.cardDescription}>{description}</p>
        <Link className="button button--primary button--sm" to={route}>
          View docs →
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Developer documentation for the @alexrebula/giselle-* open-source packages.">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        <section className={styles.packages}>
          <div className="container">
            <div className="row">
              {packages.map((pkg) => (
                <PackageCard key={pkg.id} {...pkg} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Navigation from './Navigation';
import './AppLayout.css';

interface AppLayoutProps {
  children: ReactNode;
}

function getBreadcrumbs(pathname: string) {
  const breadcrumbs = [{ label: 'ホーム', path: '/' }];

  if (pathname === '/') return breadcrumbs;

  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] === 'workflow') {
    breadcrumbs.push({ label: '開発フロー', path: '/workflow' });
    if (segments[1]) {
      const stepNames: Record<string, string> = {
        specify: 'Specify',
        clarify: 'Clarify',
        plan: 'Plan',
        execute: 'Execute',
        verify: 'Verify',
      };
      breadcrumbs.push({
        label: stepNames[segments[1]] || segments[1],
        path: `/workflow/${segments[1]}`,
      });
    }
  } else if (segments[0] === 'sdd') {
    breadcrumbs.push({ label: 'Spec Driven Development', path: '/sdd' });
    if (segments[1]) {
      const subNames: Record<string, string> = {
        concepts: '基本概念',
        comparison: '比較',
        benefits: 'メリット・デメリット',
      };
      breadcrumbs.push({
        label: subNames[segments[1]] || segments[1],
        path: `/sdd/${segments[1]}`,
      });
    }
  } else if (segments[0] === 'commands') {
    breadcrumbs.push({ label: 'コマンドリファレンス', path: '/commands' });
    if (segments[1]) {
      breadcrumbs.push({
        label: `/speckit.${segments[1]}`,
        path: `/commands/${segments[1]}`,
      });
    }
  }

  return breadcrumbs;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const breadcrumbs = getBreadcrumbs(location.pathname);
  const showBreadcrumbs = location.pathname !== '/';

  return (
    <div className="app-layout">
      <Navigation currentPath={location.pathname} />
      <main className="main-content">
        {showBreadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>SpecKit Documentation © 2026</p>
        </div>
      </footer>
    </div>
  );
}

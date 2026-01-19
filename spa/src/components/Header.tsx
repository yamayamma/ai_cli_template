/**
 * Header Component
 * 固定ヘッダーとナビゲーションのコンテナ
 * Requirements: 5.1, 5.3
 */
import { useCallback, useState } from 'react';
import styles from './Header.module.css';

/**
 * ナビゲーションリンクの定義
 */
const navLinks = [
  { id: 'workflow', label: 'ワークフロー' },
  { id: 'commands', label: 'コマンド' },
  { id: 'approval', label: '承認' },
  { id: 'concepts', label: '概念' },
  { id: 'ears', label: 'EARS' },
] as const;

/**
 * Header - 固定ヘッダーコンポーネント
 * モバイル時のハンバーガーメニューを含む
 */
export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Spec Kit</span>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={toggleMobileMenu}
          aria-label="メニュー"
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-nav"
        >
          <span className={styles.menuIcon} aria-hidden="true">
            {isMobileMenuOpen ? '✕' : '☰'}
          </span>
        </button>

        <nav
          id="main-nav"
          className={`${styles.nav} ${isMobileMenuOpen ? styles.active : ''}`.trim()}
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.id} className={styles.navItem}>
                <a href={`#${link.id}`} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

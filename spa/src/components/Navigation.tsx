/**
 * Navigation Component
 * セクションナビゲーションとアクティブ状態表示
 * Requirements: 1.3, 5.1, 5.2, 5.3
 */
import { useCallback } from 'react';
import styles from './Navigation.module.css';

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
 * NavigationコンポーネントのProps
 */
interface NavigationProps {
  /** モバイルメニューの開閉状態 */
  isOpen: boolean;
  /** メニューを閉じるコールバック */
  onClose: () => void;
  /** アクティブなセクションID（オプション） */
  activeSection?: string;
  /** ナビゲーション時のコールバック（オプション） */
  onNavigate?: (sectionId: string) => void;
}

/**
 * Navigation - セクションナビゲーションコンポーネント
 * アクティブセクションのハイライトとスムーズスクロール連携
 */
export function Navigation({ isOpen, onClose, activeSection, onNavigate }: NavigationProps) {
  // デフォルトで最初のセクションをアクティブに
  const currentActive = activeSection ?? navLinks[0].id;

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      onNavigate?.(sectionId);
      onClose();
    },
    [onNavigate, onClose]
  );

  return (
    <nav
      className={`${styles.nav} ${isOpen ? styles.open : ''}`.trim()}
      aria-label="メインナビゲーション"
    >
      <ul className={styles.navList}>
        {navLinks.map((link) => {
          const isActive = link.id === currentActive;
          return (
            <li key={link.id} className={styles.navItem}>
              <a
                href={`#${link.id}`}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`.trim()}
                onClick={(e) => handleLinkClick(e, link.id)}
                aria-current={isActive ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

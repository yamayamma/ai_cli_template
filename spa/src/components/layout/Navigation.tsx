import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sections } from '../../data/sections';
import './Navigation.css';

interface NavigationProps {
  currentPath: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const navSections = sections.filter((s) => s.id !== 'home');

  return (
    <header className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📋</span>
          <span className="logo-text">SpecKit</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger" />
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-list">
            {navSections.map((section) => (
              <li key={section.id} className="nav-item">
                <Link
                  to={`/${section.id}`}
                  className={`nav-link ${isActive(`/${section.id}`) ? 'is-active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="nav-icon">{section.icon}</span>
                  <span className="nav-label">{section.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

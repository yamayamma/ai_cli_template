import { useState, useEffect } from 'react';
import './CommandSearch.css';

export interface CommandSearchProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  categories?: string[];
  onCategoryChange?: (category: string | null) => void;
}

export function CommandSearch({
  onSearch,
  initialValue = '',
  placeholder = 'コマンドを検索...',
  categories,
  onCategoryChange,
}: CommandSearchProps) {
  const [value, setValue] = useState(initialValue);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  const handleCategoryClick = (category: string) => {
    const newCategory = activeCategory === category ? null : category;
    setActiveCategory(newCategory);
    onCategoryChange?.(newCategory);
  };

  return (
    <div className="command-search">
      <div className="command-search-input-wrapper">
        <svg
          className="command-search-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="search"
          className="command-search-input"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="コマンドを検索"
        />
        {value && (
          <button
            type="button"
            className="command-search-clear"
            onClick={handleClear}
            aria-label="クリア"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      {categories && categories.length > 0 && (
        <div className="command-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-button ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      <p className="command-search-hint">
        コマンド名、説明、またはカテゴリで検索できます
      </p>
    </div>
  );
}

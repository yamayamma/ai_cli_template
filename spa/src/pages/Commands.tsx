import { useMemo, useState } from 'react';
import { CommandSearch } from '../components/interactive/CommandSearch';
import { CommandCard } from '../components/ui/CommandCard';
import { commands, filterCommands, getCategories } from '../data/commands';
import './Commands.css';

export default function Commands() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(() => getCategories(), []);

  const filteredCommands = useMemo(() => {
    let result = commands;

    if (searchQuery) {
      result = filterCommands(searchQuery);
    }

    if (activeCategory) {
      result = result.filter((cmd) => cmd.category === activeCategory);
    }

    return result;
  }, [searchQuery, activeCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  return (
    <div className="page commands-page">
      <div className="container">
        <header className="commands-header">
          <h1>コマンドリファレンス</h1>
          <p className="commands-intro">
            SpecKitで利用可能なすべてのコマンドの一覧です。
            各コマンドをクリックすると詳細な使用方法を確認できます。
          </p>
        </header>

        <section className="commands-search-section">
          <CommandSearch
            onSearch={handleSearch}
            categories={categories}
            onCategoryChange={handleCategoryChange}
          />
        </section>

        {filteredCommands.length > 0 ? (
          <>
            <p className="results-count">{filteredCommands.length}件のコマンドが見つかりました</p>
            <div className="commands-grid">
              {filteredCommands.map((command) => (
                <CommandCard key={command.id} command={command} />
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <p>該当するコマンドが見つかりませんでした</p>
          </div>
        )}
      </div>
    </div>
  );
}

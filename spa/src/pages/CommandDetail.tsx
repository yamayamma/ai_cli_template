import { useParams, Link, Navigate } from 'react-router-dom';
import { getCommandById, commands } from '../data/commands';
import { CodeBlock } from '../components/ui/CodeBlock';
import './CommandDetail.css';

export default function CommandDetail() {
  const { commandId } = useParams<{ commandId: string }>();
  const command = commandId ? getCommandById(commandId) : undefined;

  if (!command) {
    return <Navigate to="/commands" replace />;
  }

  // Get related commands (same step or category)
  const relatedCommands = commands.filter(
    cmd => cmd.id !== command.id && (cmd.step === command.step || cmd.category === command.category)
  ).slice(0, 4);

  // Get previous and next commands
  const currentIndex = commands.findIndex(cmd => cmd.id === command.id);
  const prevCommand = currentIndex > 0 ? commands[currentIndex - 1] : null;
  const nextCommand = currentIndex < commands.length - 1 ? commands[currentIndex + 1] : null;

  return (
    <div className="page command-detail-page">
      <div className="container">
        <header className="command-detail-header">
          <div className="command-title-row">
            <h1 className="command-title">{command.name}</h1>
            {command.alias && (
              <span className="command-detail-alias">alias: {command.alias}</span>
            )}
          </div>
          <p className="command-detail-description">{command.description}</p>
          <div className="command-detail-meta">
            <span className="meta-item">
              <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              {command.category}
            </span>
            <span className="meta-item">
              <svg className="meta-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Step {command.step}
            </span>
          </div>
        </header>

        <section className="command-section">
          <h2>使用方法</h2>
          <div className="usage-syntax">
            <code>{command.syntax || `speckit ${command.name} [options]`}</code>
          </div>
          
          {command.options && command.options.length > 0 && (
            <>
              <h3>オプション</h3>
              <table className="options-table">
                <thead>
                  <tr>
                    <th>オプション</th>
                    <th>説明</th>
                    <th>デフォルト</th>
                  </tr>
                </thead>
                <tbody>
                  {command.options.map(option => (
                    <tr key={option.name}>
                      <td>
                        <span className="option-name">{option.name}</span>
                        {option.required && <span className="option-required">必須</span>}
                      </td>
                      <td>{option.description}</td>
                      <td>{option.default || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>

        {command.examples && command.examples.length > 0 && (
          <section className="command-section">
            <h2>例</h2>
            <div className="examples-list">
              {command.examples.map((example, index) => (
                <div key={index} className="example-item">
                  <div className="example-title">{example.title}</div>
                  {example.description && (
                    <p className="example-description">{example.description}</p>
                  )}
                  <CodeBlock
                    code={example.code}
                    language="bash"
                    variant="terminal"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {relatedCommands.length > 0 && (
          <section className="command-section">
            <h2>関連コマンド</h2>
            <div className="related-commands">
              {relatedCommands.map(cmd => (
                <Link key={cmd.id} to={`/commands/${cmd.id}`} className="related-command-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="4 17 10 11 4 5" />
                    <line x1="12" y1="19" x2="20" y2="19" />
                  </svg>
                  {cmd.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        <nav className="command-nav">
          {prevCommand ? (
            <Link to={`/commands/${prevCommand.id}`} className="nav-link">
              ← {prevCommand.name}
            </Link>
          ) : (
            <span />
          )}
          {nextCommand && (
            <Link to={`/commands/${nextCommand.id}`} className="nav-link">
              {nextCommand.name} →
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}

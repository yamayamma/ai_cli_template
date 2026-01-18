import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page page container">
      <div className="not-found-content">
        <span className="not-found-icon">🔍</span>
        <h1>404</h1>
        <h2>ページが見つかりません</h2>
        <p className="not-found-description">
          お探しのページは存在しないか、移動した可能性があります。
        </p>

        <div className="not-found-suggestions">
          <h3>お探しの内容は？</h3>
          <ul className="suggestions-list">
            <li>
              <Link to="/workflow">
                <span className="suggestion-icon">🔄</span>
                <span>開発フローを確認する</span>
              </Link>
            </li>
            <li>
              <Link to="/sdd">
                <span className="suggestion-icon">📋</span>
                <span>SDDについて学ぶ</span>
              </Link>
            </li>
            <li>
              <Link to="/commands">
                <span className="suggestion-icon">⌨️</span>
                <span>コマンドリファレンスを見る</span>
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/" className="btn btn-primary not-found-home">
          ホームに戻る
        </Link>
      </div>
    </div>
  );
}

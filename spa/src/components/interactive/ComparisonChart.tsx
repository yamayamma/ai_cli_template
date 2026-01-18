import { useState } from 'react';
import './ComparisonChart.css';

interface ComparisonData {
  category: string;
  traditional: {
    value: number;
    label: string;
    tooltip: string;
  };
  sdd: {
    value: number;
    label: string;
    tooltip: string;
  };
}

const comparisonData: ComparisonData[] = [
  {
    category: '仕様書の明確さ',
    traditional: {
      value: 40,
      label: '曖昧',
      tooltip: '自然言語で記述、解釈の余地あり',
    },
    sdd: {
      value: 95,
      label: '明確',
      tooltip: '構造化された仕様、機械検証可能',
    },
  },
  {
    category: '実装との整合性',
    traditional: {
      value: 35,
      label: '乖離リスク',
      tooltip: '仕様と実装が分離、ドリフトしやすい',
    },
    sdd: {
      value: 90,
      label: '常に同期',
      tooltip: '仕様から自動生成、常に最新状態',
    },
  },
  {
    category: 'テストカバレッジ',
    traditional: {
      value: 50,
      label: '手動作成',
      tooltip: 'テストは後から追加、漏れが発生',
    },
    sdd: {
      value: 85,
      label: '自動生成',
      tooltip: '仕様からテストケース自動生成',
    },
  },
  {
    category: 'AI活用効率',
    traditional: {
      value: 30,
      label: '限定的',
      tooltip: 'コンテキスト不足で生成品質低下',
    },
    sdd: {
      value: 90,
      label: '最大化',
      tooltip: '構造化コンテキストで高品質生成',
    },
  },
  {
    category: '変更への適応',
    traditional: {
      value: 25,
      label: '困難',
      tooltip: '影響範囲の特定が難しい',
    },
    sdd: {
      value: 85,
      label: '容易',
      tooltip: '依存関係が明確、影響を自動検出',
    },
  },
];

export interface ComparisonChartProps {
  title?: string;
  className?: string;
}

export function ComparisonChart({
  title = '従来手法 vs SDD 比較',
  className = '',
}: ComparisonChartProps) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const maxValue = 100;

  return (
    <div className={`comparison-chart ${className}`} role="region" aria-label="比較チャート">
      {title && <h3 className="comparison-chart-title">{title}</h3>}

      <div className="comparison-rows">
        {comparisonData.map((item) => (
          <div key={item.category} className="comparison-row">
            <span className="comparison-category">{item.category}</span>
            <div className="comparison-bars">
              <div
                className={`comparison-bar traditional ${hoveredBar === `${item.category}-traditional` ? 'hovered' : ''}`}
                style={{ width: `${(item.traditional.value / maxValue) * 100}%`, minWidth: '80px' }}
                onMouseEnter={() => setHoveredBar(`${item.category}-traditional`)}
                onMouseLeave={() => setHoveredBar(null)}
                role="img"
                aria-label={`従来手法: ${item.traditional.label} (${item.traditional.value}%)`}
              >
                <span className="bar-label">{item.traditional.label}</span>
                <span className="bar-value">{item.traditional.value}%</span>
                <div className="bar-tooltip">{item.traditional.tooltip}</div>
              </div>
              <div
                className={`comparison-bar sdd ${hoveredBar === `${item.category}-sdd` ? 'hovered' : ''}`}
                style={{ width: `${(item.sdd.value / maxValue) * 100}%`, minWidth: '80px' }}
                onMouseEnter={() => setHoveredBar(`${item.category}-sdd`)}
                onMouseLeave={() => setHoveredBar(null)}
                role="img"
                aria-label={`SDD: ${item.sdd.label} (${item.sdd.value}%)`}
              >
                <span className="bar-label">{item.sdd.label}</span>
                <span className="bar-value">{item.sdd.value}%</span>
                <div className="bar-tooltip">{item.sdd.tooltip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-legend">
        <span className="legend-item">
          <span className="legend-color traditional" />
          <span>凡例: 従来手法</span>
        </span>
        <span className="legend-item">
          <span className="legend-color sdd" />
          <span>SDD</span>
        </span>
      </div>
    </div>
  );
}

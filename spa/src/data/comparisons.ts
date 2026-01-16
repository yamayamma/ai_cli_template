import type { Comparison, Methodology } from '../types'

export const methodologies: Methodology[] = [
  {
    id: 'sdd',
    name: 'Spec Driven Development',
    description:
      '仕様書を起点として開発を進める手法。AIとの協調により、仕様の明確化から実装まで一貫したプロセスで進行。',
    pros: [
      '仕様の曖昧さを早期に解消',
      'AIによる自動化で生産性向上',
      'テスト駆動で品質担保',
      'ドキュメントと実装の一貫性',
    ],
    cons: [
      '初期学習コストがある',
      'AI依存のリスク',
      '小規模プロジェクトではオーバーヘッド',
    ],
    bestFor: [
      '中〜大規模プロジェクト',
      'AIを活用した開発',
      '品質重視のプロジェクト',
    ],
  },
  {
    id: 'agile',
    name: 'アジャイル開発',
    description:
      '短いイテレーションで機能を小さく分割して開発。顧客フィードバックを重視し、変化に適応。',
    pros: ['変更に柔軟', '顧客フィードバック重視', 'チームコラボレーション'],
    cons: ['スコープクリープのリスク', 'ドキュメント不足になりがち', '経験豊富なチームが必要'],
    bestFor: ['変化の多いプロジェクト', 'スタートアップ', '顧客密着型開発'],
  },
  {
    id: 'waterfall',
    name: 'ウォーターフォール',
    description:
      '要件定義→設計→実装→テストの順に進む伝統的な手法。各フェーズを完了してから次へ。',
    pros: ['明確なマイルストーン', 'ドキュメントが充実', '進捗管理が容易'],
    cons: ['変更に弱い', '後戻りコストが高い', '顧客フィードバックが遅い'],
    bestFor: ['要件が明確なプロジェクト', '規制産業', '大規模なエンタープライズ'],
  },
]

export const comparison: Comparison = {
  id: 'development-methodologies',
  methodologies,
  dimensions: [
    {
      name: '要件定義',
      values: {
        sdd: '仕様書ファースト、AIが補助',
        agile: 'ユーザーストーリー、継続的に更新',
        waterfall: '詳細な要件定義書、事前に完成',
      },
    },
    {
      name: '変更への対応',
      values: {
        sdd: '仕様更新→自動で影響分析',
        agile: 'イテレーションごとに柔軟に対応',
        waterfall: '変更管理プロセスが必要',
      },
    },
    {
      name: 'テスト戦略',
      values: {
        sdd: 'TDD、仕様からテスト自動生成',
        agile: 'CI/CD、自動テスト重視',
        waterfall: 'フェーズ後のテストフェーズ',
      },
    },
    {
      name: 'ドキュメント',
      values: {
        sdd: '仕様書が常に最新、コードと同期',
        agile: '最小限、動くソフトウェア重視',
        waterfall: '詳細、ただし陳腐化しやすい',
      },
    },
    {
      name: 'AI活用',
      values: {
        sdd: 'コア要素、全フェーズで活用',
        agile: '補助的、チームの判断が中心',
        waterfall: '限定的、自動化ツールとして',
      },
    },
  ],
}

export function getMethodologyById(id: string): Methodology | undefined {
  return methodologies.find((m) => m.id === id)
}

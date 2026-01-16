import type { Section } from '../types'

export const sections: Section[] = [
  {
    id: 'home',
    title: 'ホーム',
    description: 'SpecKitの概要と学習パス',
    icon: '🏠',
    order: 0,
  },
  {
    id: 'workflow',
    title: '開発フロー',
    description: '5ステップの開発フロー（specify, clarify, plan, execute, verify）',
    icon: '🔄',
    order: 1,
    subsections: [
      { id: 'specify', title: 'Specify（仕様作成）', path: '/workflow/specify' },
      { id: 'clarify', title: 'Clarify（明確化）', path: '/workflow/clarify' },
      { id: 'plan', title: 'Plan（計画）', path: '/workflow/plan' },
      { id: 'execute', title: 'Execute（実行）', path: '/workflow/execute' },
      { id: 'verify', title: 'Verify（検証）', path: '/workflow/verify' },
    ],
  },
  {
    id: 'sdd',
    title: 'Spec Driven Development',
    description: 'SDDの概念と従来手法との比較',
    icon: '📋',
    order: 2,
    subsections: [
      { id: 'concepts', title: '基本概念', path: '/sdd/concepts' },
      { id: 'comparison', title: '他手法との比較', path: '/sdd/comparison' },
      { id: 'benefits', title: 'メリット・デメリット', path: '/sdd/benefits' },
    ],
  },
  {
    id: 'commands',
    title: 'コマンドリファレンス',
    description: 'SpecKitのCLIコマンド一覧と詳細',
    icon: '⌨️',
    order: 3,
    subsections: [
      { id: 'specify', title: '/speckit.specify', path: '/commands/specify' },
      { id: 'clarify', title: '/speckit.clarify', path: '/commands/clarify' },
      { id: 'plan', title: '/speckit.plan', path: '/commands/plan' },
      { id: 'execute', title: '/speckit.execute', path: '/commands/execute' },
      { id: 'verify', title: '/speckit.verify', path: '/commands/verify' },
    ],
  },
]

export function getSectionById(id: string): Section | undefined {
  return sections.find((section) => section.id === id)
}

# Tasks: SpecKit Documentation SPA

**Input**: Design documents from `/specs/001-speckit-docs-spa/`
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: This project uses TDD per constitution. Tests are included for each user story.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## User Story Summary

| Story | Title | Priority | Description |
|-------|-------|----------|-------------|
| US1 | SpecKitの開発フローを学ぶ | P1 | 5ステップの開発フロー説明 |
| US2 | Spec Driven Developmentの概念を理解する | P1 | SDD概念と比較情報 |
| US3 | SpecKitコマンドリファレンスを参照する | P2 | コマンド一覧と検索機能 |
| US4 | SPAをレスポンシブに閲覧する | P2 | レスポンシブデザイン |
| US5 | インタラクティブな図表で学ぶ | P1 | React Flowによる図表 |

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: プロジェクト初期化と基本構造の作成

- [X] T001 Create spa/ directory structure per plan.md in spa/
- [X] T002 Initialize Vite + React + TypeScript project with `pnpm create vite` in spa/
- [X] T003 Install core dependencies (react-router-dom, @mdx-js/rollup, @xyflow/react) in spa/package.json
- [X] T004 [P] Configure TypeScript strict mode in spa/tsconfig.json
- [X] T005 [P] Configure Vite with MDX plugin in spa/vite.config.ts
- [X] T006 [P] Setup Biome for linting and formatting in spa/biome.json
- [X] T007 [P] Configure Vitest for unit testing in spa/vitest.config.ts
- [X] T008 [P] Setup Playwright for E2E testing in spa/playwright.config.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 全てのユーザーストーリーが依存するコア基盤

**⚠️ CRITICAL**: このフェーズが完了するまで、ユーザーストーリーの作業は開始できません

- [X] T009 Create TypeScript type definitions in spa/src/types/index.ts
- [X] T010 [P] Create Section data in spa/src/data/sections.ts
- [X] T011 [P] Create Step data in spa/src/data/steps.ts
- [X] T012 [P] Create Command data in spa/src/data/commands.ts
- [X] T013 [P] Create Comparison data in spa/src/data/comparisons.ts
- [X] T014 Configure HashRouter and routes in spa/src/App.tsx
- [X] T015 Create base CSS with CSS variables in spa/src/index.css
- [X] T016 Setup main entry point in spa/src/main.tsx

**Checkpoint**: 基盤完了 - ユーザーストーリーの実装を並行して開始可能

---

## Phase 3: User Story 1 - SpecKitの開発フローを学ぶ (Priority: P1) 🎯 MVP

**Goal**: ユーザーが5ステップの開発フロー（specify, clarify, plan, execute, verify）を理解できる

**Independent Test**: ホームページから開発フローセクションにアクセスし、各ステップの詳細を閲覧できる

### Tests for User Story 1

- [X] T017 [P] [US1] E2E test for workflow navigation in spa/tests/e2e/workflow.spec.ts
- [X] T018 [P] [US1] Unit test for Workflow page in spa/tests/unit/pages/Workflow.test.tsx
- [X] T019 [P] [US1] Unit test for WorkflowStep page in spa/tests/unit/pages/WorkflowStep.test.tsx

### Implementation for User Story 1

- [X] T020 [P] [US1] Create AppLayout component in spa/src/components/layout/AppLayout.tsx
- [X] T021 [P] [US1] Create Navigation component in spa/src/components/layout/Navigation.tsx
- [X] T022 [P] [US1] Create Breadcrumbs component in spa/src/components/layout/Breadcrumbs.tsx
- [X] T023 [P] [US1] Create StepCard component in spa/src/components/ui/StepCard.tsx
- [X] T024 [US1] Create Workflow page in spa/src/pages/Workflow.tsx
- [X] T025 [US1] Create WorkflowStep page in spa/src/pages/WorkflowStep.tsx
- [X] T026 [P] [US1] Create workflow index MDX in spa/src/content/workflow/index.mdx
- [X] T027 [P] [US1] Create specify step MDX in spa/src/content/workflow/specify.mdx
- [X] T028 [P] [US1] Create clarify step MDX in spa/src/content/workflow/clarify.mdx
- [X] T029 [P] [US1] Create plan step MDX in spa/src/content/workflow/plan.mdx
- [X] T030 [P] [US1] Create execute step MDX in spa/src/content/workflow/execute.mdx
- [X] T031 [P] [US1] Create verify step MDX in spa/src/content/workflow/verify.mdx
- [X] T032 [US1] Add step navigation (prev/next) in spa/src/pages/WorkflowStep.tsx
- [X] T033 [US1] Create Home page with learning path in spa/src/pages/Home.tsx
- [X] T034 [P] [US1] Create home MDX content in spa/src/content/home.mdx

**Checkpoint**: User Story 1完了 - 開発フローを独立してテスト可能

---

## Phase 4: User Story 2 - Spec Driven Developmentの概念を理解する (Priority: P1)

**Goal**: ユーザーがSDDの概念と従来手法との違いを理解できる

**Independent Test**: SDDセクションにアクセスし、概念説明と比較表を閲覧できる

### Tests for User Story 2

- [ ] T035 [P] [US2] E2E test for SDD navigation in spa/tests/e2e/sdd.spec.ts
- [ ] T036 [P] [US2] Unit test for SDD page in spa/tests/unit/pages/SDD.test.tsx
- [ ] T037 [P] [US2] Unit test for SDDComparison page in spa/tests/unit/pages/SDDComparison.test.tsx

### Implementation for User Story 2

- [ ] T038 [US2] Create SDD page in spa/src/pages/SDD.tsx
- [ ] T039 [US2] Create SDDConcepts page in spa/src/pages/SDDConcepts.tsx
- [ ] T040 [US2] Create SDDComparison page in spa/src/pages/SDDComparison.tsx
- [ ] T041 [US2] Create SDDBenefits page in spa/src/pages/SDDBenefits.tsx
- [ ] T042 [P] [US2] Create SDD index MDX in spa/src/content/sdd/index.mdx
- [ ] T043 [P] [US2] Create SDD concepts MDX in spa/src/content/sdd/concepts.mdx
- [ ] T044 [P] [US2] Create SDD comparison MDX in spa/src/content/sdd/comparison.mdx
- [ ] T045 [P] [US2] Create SDD benefits MDX in spa/src/content/sdd/benefits.mdx

**Checkpoint**: User Story 2完了 - SDDセクションを独立してテスト可能

---

## Phase 5: User Story 5 - インタラクティブな図表で学ぶ (Priority: P1)

**Goal**: ユーザーがインタラクティブな図表で開発フローとSDDを視覚的に理解できる

**Independent Test**: 図表にホバー/クリックで追加情報が表示される

### Tests for User Story 5

- [ ] T046 [P] [US5] Unit test for FlowDiagram in spa/tests/unit/components/FlowDiagram.test.tsx
- [ ] T047 [P] [US5] Unit test for ComparisonChart in spa/tests/unit/components/ComparisonChart.test.tsx
- [ ] T048 [P] [US5] E2E test for interactive diagrams in spa/tests/e2e/diagrams.spec.ts

### Implementation for User Story 5

- [ ] T049 [P] [US5] Create Tooltip component in spa/src/components/ui/Tooltip.tsx
- [ ] T050 [P] [US5] Create Modal component in spa/src/components/ui/Modal.tsx
- [ ] T051 [US5] Create FlowDiagram component with React Flow in spa/src/components/interactive/FlowDiagram.tsx
- [ ] T052 [US5] Create ComparisonChart component in spa/src/components/interactive/ComparisonChart.tsx
- [ ] T053 [US5] Integrate FlowDiagram into Workflow page in spa/src/pages/Workflow.tsx
- [ ] T054 [US5] Integrate ComparisonChart into SDDComparison page in spa/src/pages/SDDComparison.tsx

**Checkpoint**: User Story 5完了 - インタラクティブ図表を独立してテスト可能

---

## Phase 6: User Story 3 - SpecKitコマンドリファレンスを参照する (Priority: P2)

**Goal**: ユーザーがコマンドを検索し、詳細情報を確認できる

**Independent Test**: コマンドリファレンスにアクセスし、検索とフィルタリングができる

### Tests for User Story 3

- [ ] T055 [P] [US3] E2E test for commands navigation in spa/tests/e2e/commands.spec.ts
- [ ] T056 [P] [US3] Unit test for Commands page in spa/tests/unit/pages/Commands.test.tsx
- [ ] T057 [P] [US3] Unit test for CommandSearch in spa/tests/unit/components/CommandSearch.test.tsx

### Implementation for User Story 3

- [ ] T058 [P] [US3] Create CommandCard component in spa/src/components/ui/CommandCard.tsx
- [ ] T059 [P] [US3] Create CodeBlock component in spa/src/components/ui/CodeBlock.tsx
- [ ] T060 [US3] Create CommandSearch component in spa/src/components/interactive/CommandSearch.tsx
- [ ] T061 [US3] Create Commands page with search in spa/src/pages/Commands.tsx
- [ ] T062 [US3] Create CommandDetail page in spa/src/pages/CommandDetail.tsx
- [ ] T063 [P] [US3] Create commands index MDX in spa/src/content/commands/index.mdx
- [ ] T064 [P] [US3] Create specify command MDX in spa/src/content/commands/specify.mdx
- [ ] T065 [P] [US3] Create clarify command MDX in spa/src/content/commands/clarify.mdx
- [ ] T066 [P] [US3] Create plan command MDX in spa/src/content/commands/plan.mdx
- [ ] T067 [P] [US3] Create execute command MDX in spa/src/content/commands/execute.mdx
- [ ] T068 [P] [US3] Create verify command MDX in spa/src/content/commands/verify.mdx

**Checkpoint**: User Story 3完了 - コマンドリファレンスを独立してテスト可能

---

## Phase 7: User Story 4 - SPAをレスポンシブに閲覧する (Priority: P2)

**Goal**: ユーザーがあらゆるデバイスで快適にSPAを閲覧できる

**Independent Test**: モバイル/タブレット/デスクトップでレイアウトが適切に調整される

### Tests for User Story 4

- [ ] T069 [P] [US4] E2E test for responsive layout in spa/tests/e2e/responsive.spec.ts
- [ ] T070 [P] [US4] Unit test for mobile navigation in spa/tests/unit/components/Navigation.test.tsx

### Implementation for User Story 4

- [ ] T071 [US4] Add responsive styles to Navigation in spa/src/components/layout/Navigation.tsx
- [ ] T072 [US4] Implement hamburger menu for mobile in spa/src/components/layout/Navigation.tsx
- [ ] T073 [US4] Add responsive breakpoints to AppLayout in spa/src/components/layout/AppLayout.tsx
- [ ] T074 [US4] Update all pages for responsive design in spa/src/pages/*.tsx
- [ ] T075 [US4] Add touch-friendly interactions for mobile in spa/src/components/interactive/*.tsx

**Checkpoint**: User Story 4完了 - レスポンシブデザインを全デバイスでテスト可能

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: 複数のユーザーストーリーに影響する改善

- [ ] T076 Create NotFound (404) page in spa/src/pages/NotFound.tsx
- [ ] T077 [P] Configure vite-plugin-pwa in spa/vite.config.ts
- [ ] T078 [P] Create PWA manifest and icons in spa/public/
- [ ] T079 Create Service Worker configuration for offline cache in spa/vite.config.ts
- [ ] T080 [P] Create GitHub Actions deploy workflow in .github/workflows/deploy-spa.yml
- [ ] T081 [P] Add Lighthouse CI check to workflow in .github/workflows/deploy-spa.yml
- [ ] T082 Run final E2E test suite for all user stories
- [ ] T083 Validate quickstart.md instructions are accurate
- [ ] T084 Update README with SPA documentation

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup)
    ↓
Phase 2 (Foundational) ← BLOCKS all user stories
    ↓
┌───────────────────────────────────────────────────┐
│  User Stories can proceed in PARALLEL after P2   │
│                                                   │
│  Phase 3 (US1) ─┐                                 │
│  Phase 4 (US2) ─┼──→ Phase 8 (Polish)            │
│  Phase 5 (US5) ─┤                                 │
│  Phase 6 (US3) ─┤                                 │
│  Phase 7 (US4) ─┘                                 │
└───────────────────────────────────────────────────┘
```

### User Story Dependencies

| Story | Depends On | Can Parallelize With |
|-------|------------|----------------------|
| US1 | Phase 2 | US2, US3, US4, US5 |
| US2 | Phase 2 | US1, US3, US4, US5 |
| US3 | Phase 2 | US1, US2, US4, US5 |
| US4 | Phase 2, layout components from US1 | US2, US3, US5 |
| US5 | Phase 2 | US1, US2, US3, US4 |

### Within Each User Story

1. Tests MUST be written and FAIL before implementation
2. UI components before page components
3. Page implementation before MDX content
4. Integration and polish last

---

## Parallel Execution Examples

### Example: Phase 2 (Foundational)

```bash
# All [P] tasks in Phase 2 can run in parallel:
T010: Create Section data
T011: Create Step data
T012: Create Command data
T013: Create Comparison data
```

### Example: User Story 1 Tests

```bash
# All tests can be created in parallel:
T017: E2E test for workflow navigation
T018: Unit test for Workflow page
T019: Unit test for WorkflowStep page
```

### Example: User Story 1 Components

```bash
# All [P] components can be created in parallel:
T020: AppLayout component
T021: Navigation component
T022: Breadcrumbs component
T023: StepCard component
```

### Example: User Story 1 MDX Content

```bash
# All [P] MDX files can be created in parallel:
T026-T031: All workflow step MDX files
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: 開発フローが独立して動作することを確認
5. Deploy/Demo if ready

### Recommended Order (P1 Stories First)

1. Setup + Foundational → 基盤完了
2. US1 (開発フロー) → Test → MVP Ready!
3. US2 (SDD概念) → Test → Deploy
4. US5 (インタラクティブ図表) → Test → Deploy
5. US3 (コマンドリファレンス) → Test → Deploy
6. US4 (レスポンシブ) → Test → Deploy
7. Polish → Final Release

---

## Notes

- [P] tasks = 異なるファイル、依存関係なし
- [Story] ラベル = 特定のユーザーストーリーへのマッピング
- 各ユーザーストーリーは独立して完了・テスト可能
- テストが失敗することを確認してから実装
- 各タスクまたは論理グループの後にコミット
- チェックポイントで停止してストーリーを独立して検証可能

---

## Task Count Summary

| Phase | Task Count |
|-------|------------|
| Phase 1: Setup | 8 |
| Phase 2: Foundational | 8 |
| Phase 3: US1 (P1) | 18 |
| Phase 4: US2 (P1) | 11 |
| Phase 5: US5 (P1) | 9 |
| Phase 6: US3 (P2) | 14 |
| Phase 7: US4 (P2) | 7 |
| Phase 8: Polish | 9 |
| **Total** | **84** |

### Per User Story

| User Story | Tasks | Parallel Tasks |
|------------|-------|----------------|
| US1 | 18 | 13 |
| US2 | 11 | 7 |
| US3 | 14 | 10 |
| US4 | 7 | 2 |
| US5 | 9 | 5 |

### MVP Scope (Recommended)

- Phase 1 + Phase 2 + Phase 3 (US1) = **34 tasks**
- 独立してテスト可能な最小の価値ある製品

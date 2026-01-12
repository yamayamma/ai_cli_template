# Research: CI/CD and Documentation Enhancement

**Date**: 2026-01-11  
**Purpose**: Validate technical choices and identify blockers before implementation  
**Status**: ✅ Complete - No blockers identified

## Summary

All technical approaches validated. No blockers found. Ready to proceed with implementation.

**Key Findings**:
- ✅ pnpm caching: Official action + setup-node built-in cache
- ✅ Semantic-release: Minimal config without npm publish
- ✅ Coverage badges: Shields.io static badges (no external service required)
- ✅ TypeDoc: Fully compatible with Vite + current tsconfig

---

## 1. GitHub Actions pnpm Caching

### Question
What's the optimal caching strategy for pnpm in GitHub Actions?

### Answer
**Use official pnpm action + setup-node's built-in cache feature**

### Implementation
```yaml
steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
    with:
      version: 9
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: 'pnpm'  # Automatic caching
  - run: pnpm install
```

### Benefits
- **Official maintenance**: pnpm team maintains the action
- **Zero configuration**: setup-node automatically uses pnpm-lock.yaml as cache key
- **Fast**: Typical cache hit restores in < 5 seconds
- **Reliable**: Handles cache misses gracefully

### References
- [pnpm CI Documentation](https://pnpm.io/continuous-integration#github-actions)
- [pnpm/action-setup](https://github.com/pnpm/action-setup)
- [actions/setup-node cache](https://github.com/actions/setup-node#caching-global-packages-data)

---

## 2. Semantic-Release Configuration

### Question
Which semantic-release plugins are needed for GitHub-only releases (no npm publish)?

### Answer
**Minimal plugin set: 6 plugins**

### Configuration (.releaserc.json)
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", {
      "npmPublish": false
    }],
    "@semantic-release/github",
    ["@semantic-release/git", {
      "assets": ["package.json", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }]
  ]
}
```

### Required Dependencies
```json
{
  "devDependencies": {
    "semantic-release": "^24.2.0",
    "@semantic-release/changelog": "^6.0.3",
    "@semantic-release/git": "^10.0.1"
  }
}
```

**Note**: `@semantic-release/commit-analyzer`, `@semantic-release/release-notes-generator`, `@semantic-release/npm`, and `@semantic-release/github` are bundled with semantic-release core.

### Why This Works
1. **@semantic-release/commit-analyzer**: Determines version bump from commits
2. **@semantic-release/release-notes-generator**: Creates release notes
3. **@semantic-release/changelog**: Updates CHANGELOG.md
4. **@semantic-release/npm**: Updates package.json version (npmPublish: false skips registry publish)
5. **@semantic-release/github**: Creates GitHub Release
6. **@semantic-release/git**: Commits version changes back to repo

### Conventional Commit Examples
```bash
feat: add new feature        # → minor bump (1.0.0 → 1.1.0)
fix: resolve bug             # → patch bump (1.1.0 → 1.1.1)
feat!: breaking change       # → major bump (1.1.1 → 2.0.0)
chore: update docs           # → no release
```

### References
- [semantic-release Configuration](https://semantic-release.gitbook.io/semantic-release/usage/configuration)
- [Skip npm publish example](https://github.com/semantic-release/semantic-release/blob/master/docs/support/FAQ.md#can-i-skip-the-release-to-the-npm-registry)

---

## 3. Coverage Badge Integration

### Question
Can we use Shields.io with GitHub Actions artifacts, or do we need Codecov?

### Answer
**Start with Shields.io static badges; optionally add Codecov later**

### Option A: Shields.io Static Badge (Recommended for MVP)
```markdown
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
```

**Pros**:
- No external service dependency
- No tokens required
- Instant updates (manual)
- Zero cost

**Cons**:
- Manual update when coverage changes
- No historical tracking

### Option B: Codecov (Optional Enhancement)
```yaml
# In CI workflow
- uses: codecov/codecov-action@v4
  with:
    token: ${{ secrets.CODECOV_TOKEN }}
    files: ./coverage/coverage-final.json
```

```markdown
![Coverage](https://codecov.io/gh/yamayamma/ai_cli_template/branch/main/graph/badge.svg)
```

**Pros**:
- Automatic updates
- Historical trends
- PR comments with coverage diff
- Free for open source

**Cons**:
- External service dependency
- Requires token configuration
- Additional complexity

### Recommendation
**Start with static badge** for simplicity. Add Codecov later if:
- Need automatic updates
- Want coverage trends
- Project has many contributors

### Implementation for Static Badge
```yaml
# In CI workflow
- run: pnpm test:coverage
- run: |
    COVERAGE=$(cat coverage/coverage-summary.json | jq -r '.total.lines.pct')
    echo "Coverage: $COVERAGE%"
```

Then manually update README badge color based on thresholds:
- 80%+: brightgreen
- 60-79%: yellow
- <60%: red

### References
- [Shields.io](https://shields.io/)
- [Codecov GitHub Action](https://github.com/codecov/codecov-action)

---

## 4. TypeDoc Integration with Vite

### Question
Does TypeDoc require special configuration for Vite projects?

### Answer
**✅ No special configuration required - fully compatible**

### Compatibility Verified
- ✅ `moduleResolution: bundler` → Supported in TypeDoc 0.25+
- ✅ `noEmit: true` → No conflict (TypeDoc has independent TS compiler)
- ✅ Vite dev server → No interference
- ✅ Path aliases (`@/*`) → Resolved from tsconfig.json

### Recommended typedoc.json
```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs/api",
  "excludePrivate": true,
  "excludeProtected": false,
  "excludeInternal": true,
  "includeVersion": true,
  "readme": "README.md",
  "plugin": [],
  "cleanOutputDir": true,
  "name": "ai_cli_template API Documentation",
  "navigationLinks": {
    "GitHub": "https://github.com/yamayamma/ai_cli_template"
  }
}
```

### package.json Scripts
```json
{
  "scripts": {
    "docs": "typedoc",
    "docs:watch": "typedoc --watch",
    "docs:json": "typedoc --json docs/api.json"
  }
}
```

### Verification Steps
1. ✅ Test run completed successfully: `pnpm typedoc`
2. ✅ Output generated in `docs/api/index.html`
3. ✅ All exports from src/index.ts documented
4. ✅ No conflicts with Vite configuration

### Common Issues (None Found)
No issues encountered with current setup.

### References
- [TypeDoc Documentation](https://typedoc.org/)
- [TypeDoc GitHub](https://github.com/TypeStrong/typedoc)
- [TypeDoc Options](https://typedoc.org/options/)

---

## Risk Assessment Update

### Original Risks
All original high/medium risks **mitigated**:

| Risk | Status | Mitigation |
|------|--------|------------|
| GitHub Actions permissions for fork PRs | ✅ Documented | Will note limitations in CONTRIBUTING.md |
| Semantic-release learning curve | ✅ Mitigated | Clear examples + conventional commit reference |
| Badge caching (5 min delay) | ✅ Acceptable | Static badge = no caching issues |
| TypeDoc output size | ✅ Non-issue | Current output < 1MB, will gitignore |

### New Findings
**No new blockers identified**

---

## Recommended Technology Choices (Final)

| Component | Choice | Rationale |
|-----------|--------|-----------|
| **CI Caching** | pnpm/action-setup@v4 + setup-node cache | Official, zero-config, fast |
| **Semantic Release** | Core + changelog + git plugins | Minimal, no npm publish |
| **Coverage Badge** | Shields.io static → Codecov (later) | Simple first, enhance later |
| **API Docs** | TypeDoc with standard config | Zero friction, works out-of-box |
| **Node Version** | 22.x (matrix: false) | Match devcontainer, no multi-version testing |
| **Trigger** | push to main + pull_request to main | Standard practice |

---

## Next Steps

### Phase 1: Design & Contracts
1. Create `contracts/ci-workflow.yml` - Exact CI workflow structure
2. Create `contracts/release-workflow.yml` - Exact release workflow structure
3. Create `contracts/badges.md` - Badge URLs and specifications
4. Create `contracts/contributing-outline.md` - CONTRIBUTING.md structure
5. Create `quickstart.md` - Local testing guide

### Estimated Time
- Phase 1: ~1 hour
- Implementation (Phase 2): ~6-9 hours total (split across 3 iterations)

### Dependencies to Install (Phase 2)
```bash
pnpm add -D semantic-release @semantic-release/changelog @semantic-release/git
```

---

**Research Completed**: 2026-01-11  
**Blockers**: None  
**Recommendations**: All approaches validated, proceed to Phase 1

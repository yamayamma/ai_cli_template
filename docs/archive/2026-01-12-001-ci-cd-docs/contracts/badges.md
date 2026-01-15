# README Badges Specification

**Purpose**: Define exact badge URLs and rendering specifications for README.md  
**Location**: Top of README.md, immediately after title

## Badge Layout

```markdown
# TypeScript Web App Development Template

[![CI](https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github)](https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=vitest)](https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/yamayamma/ai_cli_template?logo=github)](https://github.com/yamayamma/ai_cli_template/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)](https://pnpm.io/)
```

---

## Badge Specifications

### 1. CI Status Badge

**Purpose**: Show current build status of main branch

**URL**:
```
https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github
```

**Link Target**:
```
https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml
```

**Dynamic Data**:
- ✅ Status: `passing` (green) or `failing` (red)
- Source: GitHub Actions workflow status
- Update: Automatic on every CI run

**Format**:
- Label: "CI"
- Logo: GitHub mark
- Color: Green (passing) / Red (failing)

---

### 2. Coverage Badge

**Purpose**: Show test coverage percentage

**URL (MVP - Static)**:
```
https://img.shields.io/badge/coverage-100%25-brightgreen?logo=vitest
```

**Link Target**:
```
https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml
```

**Static Data** (for MVP):
- Coverage: 100%
- Color: brightgreen
- Logo: Vitest

**Color Thresholds**:
| Coverage | Color | Hex |
|----------|-------|-----|
| 80-100% | brightgreen | #4c1 |
| 60-79% | yellow | #fe7d37 |
| < 60% | red | #e05d44 |

**Manual Update Process**:
1. Run `pnpm test:coverage`
2. Check coverage percentage
3. Update badge URL with new percentage
4. Update color based on threshold

**Future Enhancement** (Optional - Codecov):
```
https://codecov.io/gh/yamayamma/ai_cli_template/branch/main/graph/badge.svg
```
- Automatic updates
- No manual maintenance required

---

### 3. Release Version Badge

**Purpose**: Show latest GitHub Release version

**URL**:
```
https://img.shields.io/github/v/release/yamayamma/ai_cli_template?logo=github
```

**Link Target**:
```
https://github.com/yamayamma/ai_cli_template/releases
```

**Dynamic Data**:
- ✅ Version: Latest GitHub Release tag (e.g., v1.2.3)
- Source: GitHub Releases API
- Update: Automatic on every release

**Format**:
- Label: "release"
- Value: vX.Y.Z
- Logo: GitHub mark
- Color: Blue

---

### 4. License Badge

**Purpose**: Show project license

**URL**:
```
https://img.shields.io/badge/license-MIT-blue.svg
```

**Link Target**:
```
LICENSE
```
(Relative link to LICENSE file in repo)

**Static Data**:
- License: MIT
- Color: Blue
- No logo

---

### 5. Node Version Badge

**Purpose**: Show required Node.js version

**URL**:
```
https://img.shields.io/badge/node-22.x-brightgreen?logo=node.js
```

**Link Target**:
```
https://nodejs.org/
```

**Static Data**:
- Node Version: 22.x
- Color: brightgreen (Node.js brand color)
- Logo: Node.js logo

**Update Trigger**:
- Manual update when Node.js version requirement changes
- Should match:
  - devcontainer.json node feature version
  - .github/workflows/*.yml node-version
  - package.json engines.node

---

### 6. pnpm Version Badge

**Purpose**: Show required pnpm version

**URL**:
```
https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm
```

**Link Target**:
```
https://pnpm.io/
```

**Static Data**:
- pnpm Version: 9.x
- Color: orange (pnpm brand color)
- Logo: pnpm logo

**Update Trigger**:
- Manual update when pnpm version changes
- Should match:
  - package.json packageManager field
  - .github/workflows/*.yml pnpm/action-setup version

---

## Badge Ordering Rationale

1. **CI** - Most important (is it working?)
2. **Coverage** - Quality indicator
3. **Release** - Version information
4. **License** - Legal/usage info
5. **Node** - Technical requirement
6. **pnpm** - Technical requirement

---

## Shields.io Parameters

### Common Parameters Used

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `label` | Left side text | `label=CI` |
| `logo` | Logo icon | `logo=github` |
| `color` | Badge color | `color=brightgreen` |
| `style` | Badge style | `style=flat` (default) |

### Available Styles
- `flat` (default) - Modern flat design
- `flat-square` - Flat with square edges
- `plastic` - Plastic/glossy look
- `for-the-badge` - Large rectangular
- `social` - Social media style

**Choice**: Use default `flat` style for consistency

---

## Badge Behavior

### Caching
- **Shields.io**: Caches badges for ~5 minutes
- **GitHub Actions**: Status updates immediately after workflow completes
- **Result**: Badge may show stale data for up to 5 minutes

### Loading
- **Speed**: < 500ms per badge (parallel loading)
- **Fallback**: Alt text shown if image fails to load
- **Accessibility**: All badges have descriptive alt text

### Clicking
- All badges are clickable
- Open relevant page (CI runs, releases, etc.)
- Target: Same tab (GitHub) / New tab (external)

---

## Validation Checklist

Before merging to README:
- [ ] All URLs use correct repository (`yamayamma/ai_cli_template`)
- [ ] CI workflow file exists (`.github/workflows/ci.yml`)
- [ ] License file exists (`LICENSE`)
- [ ] Node version matches devcontainer (22.x)
- [ ] pnpm version matches package.json (9.x)
- [ ] All badges render correctly in GitHub preview
- [ ] All links resolve (no 404s)

---

## Testing Badges Locally

### Preview in VS Code
1. Open README.md in VS Code
2. Press `Cmd+Shift+V` (Mac) or `Ctrl+Shift+V` (Windows/Linux)
3. Verify all badges render

### Test Links
```bash
# Check if URLs return 200
curl -I "https://img.shields.io/badge/license-MIT-blue.svg"
# Expected: HTTP/2 200
```

### Verify Dynamic Badges
1. Push to main branch
2. Wait for CI to complete
3. Check if CI badge turns green
4. Create a release
5. Check if Release badge shows new version

---

## Badge Maintenance

### When to Update

| Badge | Trigger | Frequency |
|-------|---------|-----------|
| CI | Automatic | Every push |
| Coverage | Manual (MVP) / Automatic (Codecov) | After test changes |
| Release | Automatic | Every release |
| License | Manual | Rarely |
| Node | Manual | When Node requirement changes |
| pnpm | Manual | When pnpm requirement changes |

### How to Update Static Badges

**Coverage Badge** (MVP):
1. Run `pnpm test:coverage`
2. Note coverage percentage
3. Update URL: `coverage-{percentage}%25-{color}`
4. Commit and push

**Node/pnpm Version**:
1. Update version in URL
2. Ensure consistency across:
   - devcontainer.json
   - package.json
   - CI workflows
3. Commit and push

---

## Alternative Badge Providers

### Current: Shields.io
- ✅ Free
- ✅ Fast
- ✅ No account required
- ✅ Widely used

### Alternatives (Not Recommended)
- **Badgen**: Similar to Shields.io (less features)
- **Custom SVG**: Full control (high maintenance)
- **Codecov**: Coverage only (requires account)

**Decision**: Stick with Shields.io for consistency

---

## Example README Section

```markdown
# TypeScript Web App Development Template

[![CI](https://img.shields.io/github/actions/workflow/status/yamayamma/ai_cli_template/ci.yml?branch=main&label=CI&logo=github)](https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?logo=vitest)](https://github.com/yamayamma/ai_cli_template/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/yamayamma/ai_cli_template?logo=github)](https://github.com/yamayamma/ai_cli_template/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?logo=pnpm)](https://pnpm.io/)

TypeScript + GitHub Copilot を使用したWebアプリケーション開発のためのdevcontainerテンプレートです。

## Quick Start
...
```

---

**Contract Version**: 1.0  
**Last Updated**: 2026-01-12  
**Status**: ✅ Ready for Implementation

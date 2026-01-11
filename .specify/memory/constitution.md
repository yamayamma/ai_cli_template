<!--
Sync Impact Report - Constitution Update
=========================================
Version Change: (new) → 1.0.0
Type: MAJOR - Initial constitution ratification

Modified Principles:
- [NEW] I. Test-First Development (NON-NEGOTIABLE)
- [NEW] II. TypeScript Strict Mode
- [NEW] III. ESM-First Architecture
- [NEW] IV. Quality Gates
- [NEW] V. Documentation Through Tests

Added Sections:
- Technology Stack (mandatory technologies and tools)
- Development Workflow (TDD cycle, review process, archival policy)

Templates Requiring Updates:
✅ plan-template.md - Constitution Check section aligned
✅ spec-template.md - User scenarios support independent testing
✅ tasks-template.md - Task organization by testable user stories

Follow-up TODOs:
- None (all placeholders filled)

Note: This is the initial ratification of the constitution for the TypeScript Web App development environment.
=========================================
-->

# TypeScript Web App Constitution

## Core Principles

### I. Test-First Development (NON-NEGOTIABLE)

**TDD Mandatory**: Tests MUST be written before implementation in the following cycle:

1. Write test describing expected behavior
2. User reviews and approves test
3. Verify test fails (Red)
4. Implement minimal code to pass (Green)
5. Refactor while keeping tests green

**Rationale**: Tests serve as executable specifications and living documentation. User approval of tests ensures shared understanding before implementation begins.

### II. TypeScript Strict Mode

**Strict Type Safety Required**:
- `strict: true` in tsconfig.json is MANDATORY
- All type-checking flags MUST be enabled (noImplicitAny, strictNullChecks, etc.)
- `any` type usage requires explicit justification in code review
- Type assertions (`as`) require comment explaining why necessary

**Rationale**: Strict typing catches errors at compile time, provides better IDE support, and serves as inline documentation.

### III. ESM-First Architecture

**Module System**:
- ES Modules (ESM) is the ONLY module system (`"type": "module"` in package.json)
- Use `.ts` extensions with `allowImportingTsExtensions` enabled
- No CommonJS (require/module.exports) allowed
- All imports MUST use explicit file extensions

**Rationale**: ESM is the JavaScript standard. Consistent module system prevents interop issues and aligns with modern tooling.

### IV. Quality Gates

**Coverage Requirements**:
- Minimum 80% code coverage MANDATORY for all PRs
- Critical paths (auth, payments, data mutations) require 100% coverage
- Coverage reports generated automatically in CI

**Performance Standards**:
- Build time: < 30 seconds for full production build
- Test suite: < 5 seconds for unit tests
- Linting: < 2 seconds for full codebase

**Rationale**: Measurable quality standards prevent technical debt accumulation and ensure consistent developer experience.

### V. Documentation Through Tests

**Living Documentation Policy**:
- Tests ARE the primary documentation of expected behavior
- Test names MUST read as specifications (describe/it pattern)
- Working documents (design notes, discussion) archived to `docs/archive/` on PR merge
- README MUST be kept current with setup/usage instructions only

**Rationale**: Code and tests co-evolve, reducing documentation drift. Archived artifacts maintain decision history without cluttering active docs.

## Technology Stack

**Mandated Technologies** (NON-NEGOTIABLE):

| Category | Tool | Version | Justification |
|----------|------|---------|---------------|
| Language | TypeScript | 5.x | Strict typing, modern features |
| Runtime | Node.js | 22.x LTS | Latest stable, ESM support |
| Package Manager | pnpm | 9.x | Fast, disk-efficient, monorepo-ready |
| Bundler | Vite | 6.x | Fast HMR, ESM-native |
| Test Framework | Vitest | 2.x | Vite-native, fast, ESM support |
| Linter/Formatter | Biome | 1.9.x | Single tool, Rust-based speed |
| Module System | ESM | Standard | Future-proof, standard |

**Rationale**: Single path for all decisions. Tools chosen for speed, ESM-first design, and TypeScript optimization.

## Development Workflow

### TDD Cycle

1. **Test Creation**: Developer writes test in `tests/` directory
2. **User Review**: User approves test as correct specification
3. **Red Phase**: Verify test fails with clear error message
4. **Green Phase**: Implement minimal code to pass test
5. **Refactor Phase**: Clean up while maintaining green tests
6. **Coverage Check**: Verify 80%+ coverage before commit

### Code Review Process

**Review Authority**: User performs all code reviews

**Review Checklist**:
- [ ] All tests pass (`pnpm test:run`)
- [ ] Coverage ≥ 80% (`pnpm test:coverage`)
- [ ] Linting passes (`pnpm check`)
- [ ] Builds successfully (`pnpm build`)
- [ ] Tests clearly specify expected behavior
- [ ] No unexplained `any` types or type assertions

### Documentation Archival

**On PR Merge**:
- Move design notes, discussion docs to `docs/archive/YYYY-MM-DD-feature-name/`
- Update README if setup/usage changed
- Ensure tests are self-documenting

**Rationale**: Keep active workspace clean. Historical context preserved but not in the way.

## Governance

**Constitution Supremacy**: This constitution supersedes all other development practices and guidelines.

**Amendment Process**:
1. Propose amendment with rationale
2. Document impact on existing code/workflows
3. User approval required
4. Update version following semantic versioning:
   - **MAJOR**: Backward-incompatible principle changes
   - **MINOR**: New principle additions or expansions
   - **PATCH**: Clarifications, wording fixes
5. Update dependent templates and documentation

**Compliance Verification**:
- All PRs MUST pass constitution checks before merge
- CI enforces quality gates automatically
- Manual review verifies principle adherence

**Living Document**: This constitution evolves with project needs while maintaining stability through versioning and migration planning.

**Version**: 1.0.0 | **Ratified**: 2026-01-11 | **Last Amended**: 2026-01-11

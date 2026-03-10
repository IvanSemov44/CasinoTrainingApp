# Workflow: Testing Strategy

Updated: 2026-03-10
Owner: @ivans

## Purpose
Run the right test level for each change and keep feedback fast without skipping critical coverage.

## Test Pyramid for This Repo
- **Unit tests**: Default for hooks, slices, selectors, services, utilities.
- **Component tests**: Component rendering with mocked Redux state.
- **Integration tests**: Feature workflows and multiple components together.

## What to Run by Change Type
1. **Redux slice / selector / hook change**:
   - Run targeted unit tests first.
   - Run full suite before merge.

2. **Component change**:
   - Run component unit tests.
   - Run feature integration tests if behavior crosses components.

3. **Service / utility change**:
   - Run service unit tests.
   - Run affected feature tests before merge.

4. **Cross-cutting (auth, settings, storage) changes**:
   - Run full test suite focusing on affected slices.
   - Re-run component tests for any screen that uses that state.

## Commands

### Jest Unit & Component Tests
```bash
npm test                    # Watch mode
npm test -- --run            # Single run
npm test -- --coverage       # With coverage report
npm test -- <pattern>        # Filtered tests
```

### CI/Pre-commit
```bash
npm run test:ci              # Full run with coverage
npm run lint                 # ESLint check
```

## Test Structure
- Slice tests: `src/store/__tests__/` or `src/features/<feature>/__tests__/slices/`
- Component tests: `src/components/<component>/__tests__/` or `src/features/<feature>/components/__tests__/`
- Hook tests: `src/hooks/__tests__/`
- Service tests: `src/services/__tests__/`
- Fixtures/builders: `src/test-utils/fixtures.ts`, `src/test-utils/builders.ts`

## Coverage Guidance
- Prioritize behavior and failure paths over chasing synthetic 100% line coverage.
- Every bug fix should include at least one regression test.
- Prefer deterministic tests over flaky async/timing dependencies.
- Mock Redux state in component tests; use real reducers in slice tests.

## Real Code References
- Test config: [jest.config.js](../../jest.config.js)
- Test setup: [jest.setup.js](../../jest.setup.js), [jest.setupAfterEnv.js](../../jest.setupAfterEnv.js)
- Unit tests: `src/__tests__/`, `src/store/__tests__/`
- Component tests: `src/components/__tests__/`
- Test utilities: `src/test-utils/`
- Feature tests: `src/features/<feature>/__tests__/`

## Common Failure Modes
- Running full suite too early instead of targeted tests first.
- Merging behavior changes without regression tests.
- Treating flaky async tests as acceptable instead of fixing root cause.
- Forgetting to mock Redux in component tests (results in undefined state).

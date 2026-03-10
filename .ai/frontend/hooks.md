# React Native Hooks Standard

Updated: 2026-03-10
Owner: @ivans

## Purpose
Use custom hooks to encapsulate Redux selectors and reduce component complexity.

## Core Rules
1. Custom hooks wrap Redux selectors and present a clean API to components.
2. Each hook has one clear responsibility.
3. Type hook return values strictly (no loose bags of values).
4. Side effects (like async storage access) are explicit in AsyncThunk, not hooks.
5. Hooks should be testable in isolation.

## Hook Patterns
- **Selector hooks**: Wrap createSelector and simplify component usage.
  - Example: `useDrillState()` wraps multiple roulette selectors.
- **Styled hooks**: Provide themed styles.
  - Example: `useThemedStyles()` returns style objects.
- **Feature hooks**: Encapsulate feature logic and Redux interaction.
  - Example: May wrap selectors, dispatch actions, compute derived state.

## Real Code References
- Selector hook: `src/hooks/useDrillState.ts`
- Themed styles hook: `src/hooks/useThemedStyles.ts`
- Modal state hook: `src/hooks/useModalState.ts`
- Feature hooks: `src/features/<feature>/hooks/` (if present)

## Practical Guidance
- Prefer one selector per hook; return memoized data.
- Return stable action dispatchers using `useCallback`.
- Avoid side effects in hooks; dispatch thunks from components or effects.
- Test hooks directly with mocked Redux store.

## Common Mistakes
- Mixing unrelated selectors in one hook.
- Returning non-memoized derived state (causes unnecessary renders).
- Hiding async logic in hooks instead of thunks.
- Not typing hook return values.

## Checklist
- [ ] Hook has one clear responsibility.
- [ ] Return value is typed and complete.
- [ ] Selectors are memoized (createSelector).
- [ ] Side effects delegated to thunks or component effects.
- [ ] Hook is testable in isolation.

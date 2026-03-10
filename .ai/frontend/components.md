# React Native Components Standard

Updated: 2026-03-10
Owner: @ivans

## Purpose
Keep components focused, composable, and easy to test.

## Core Rules
1. Components are functional and handle rendering only.
2. All state pulled from Redux via custom hooks; no local state for domain logic.
3. Props are minimal and strongly typed; complex logic lives in hooks/slices.
4. Shared components in `src/components/shared`; feature components in feature folders.
5. Error boundaries wrap feature/screen containers.

## File Organization
- `src/components/shared/`: Domain-agnostic (Button, Card, ChipSelector, PlayingCard).
- `src/components/`: Specific components (ErrorBoundary, SkeletonLoader, etc.).
- `src/features/<feature>/components/`: Feature-specific UI.

## Real Code References
- Shared component: `src/components/shared/ChipSelector/`
- Feature component: `src/features/blackjack-training/components/`
- Styles helper: `src/hooks/useThemedStyles.ts`
- Error boundary: `src/components/withErrorBoundary/`

## Practical Guidance
- Use `useThemedStyles` or `useThemedStyles` hook for themed styling.
- Pull state via custom hooks; keep components stateless.
- Split large components into smaller, composable pieces.
- Use FeatureErrorBoundary to wrap feature trees.

## Common Mistakes
- Using `useState` for domain state (should go in Redux).
- Passing deeply nested objects as props (flatten via selectors).
- Omitting proper TypeScript prop typing.
- Rendering without error boundaries in feature trees.

## Checklist
- [ ] Component is functionally pure (same props = same render).
- [ ] All domain state pulled via custom hook.
- [ ] Props are typed and minimal.
- [ ] Shared components are reusable across features.
- [ ] Feature components are encapsulated in feature folder.

# Toy Exchange — Svelte Component Builder Memory

## Project Structure
- SvelteKit + Svelte 5 + Tailwind CSS v3 + TypeScript
- No test runner pre-installed — added Vitest + jsdom + @testing-library/svelte
- `src/lib/stores/` — Svelte 5 $state-based stores (`.svelte.ts` extension)
- `src/lib/components/` — split into bidding/, layout/, listings/, common/
- `src/lib/styles/theme.css` — CSS variables for all 3 modes (NEW)
- `src/tests/` — test directory with `vitest.config.ts` at root

## Theme System (Implemented)
- Three modes: `'default' | 'kids' | 'professional'`
- Store: `src/lib/stores/theme.svelte.ts` — `themeMode` object state, `setThemeMode()`, `useTheme()` hook
- CSS vars: `src/lib/styles/theme.css` — applied via `[data-mode="..."]` on `<html>` element
- Layout sets `data-mode` attribute on `document.documentElement` via `$effect`
- All components import `useTheme()` and use CSS variables (`var(--...)`) in inline styles/Tailwind arbitrary values
- localStorage key: `'toy-exchange-theme'`

## Styling Pattern (Option 2 hybrid — CSS Variables + conditional classes)
- CSS vars for colors/spacing: `style="color: var(--text-primary)"` or `class="text-[var(--accent)]"`
- Conditional Tailwind classes via `$derived.by()` for structural differences (padding, grid cols, border-radius)
- Professional mode: `[data-mode="professional"] * { transition-duration: 0ms !important; }` disables ALL animations
- Kids animations: defined as CSS keyframes in `theme.css`, applied via class names like `.kids-bounce`, `.kids-pulse-urgent`

## Critical Svelte 5 Patterns
- Always type `$props()` with the interface: `const { foo, bar }: Props = $props()` to avoid `any` TS errors in templates
- `$derived.by(() => {...})` for multi-line derived logic
- `$state` at module level needs `.svelte.ts` extension; use object wrapper: `$state<{current: T}>({current: val})`
- `on:click` is legacy Svelte 4 — use `onclick` in Svelte 5

## Test Setup
- `vitest.config.ts` at project root, uses jsdom environment
- `$lib` aliased in vitest config to `/Users/Linus/tmp/claude-demo/toy-exchange/src/lib`
- Tests are logic-only (no Svelte component rendering) — mirror component logic in test helper functions
- Run with `npm test`; 87 tests, 6 files, all passing

## Known Pre-existing Issues (Not ours)
- `PriceChart.svelte` has 6 TypeScript errors (implicit `any` params) — pre-existing, not introduced by us
- `CountdownTimer.svelte` has 1 Svelte warning (endTime initial capture) — pre-existing
- `CreateListingForm.svelte` has a self-closing `<textarea />` warning — pre-existing
- `listing/[id]/+page.svelte` has a data reference warning — pre-existing

## See Also
- `patterns.md` — detailed component patterns

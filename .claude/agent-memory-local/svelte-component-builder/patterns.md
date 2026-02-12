# Component Patterns — Toy Exchange

## Mode-aware Component Structure

Every mode-aware component follows this pattern:

```svelte
<script lang="ts">
  import { useTheme } from '../../stores/theme.svelte.js';
  const theme = useTheme();

  // Structural differences (not just color) computed as $derived
  const containerClass = $derived.by(() => {
    if (theme.isKids) return 'kids-classes';
    if (theme.isProfessional) return 'pro-classes';
    return 'default-classes';
  });
</script>

{#if theme.isKids}
  <!-- Kids-specific markup -->
{:else if theme.isProfessional}
  <!-- Pro-specific markup -->
{:else}
  <!-- Default markup -->
{/if}
```

## CSS Variable Usage

Always use CSS variables for colors, never hardcode theme-specific Tailwind color names
(e.g., `amber-500`) in mode-aware components. Only the Default-specific fallback (`:root`)
in `theme.css` needs the actual color values.

```svelte
<!-- Good: uses var() so theme changes instantly -->
<div style="color: var(--text-primary); background: var(--bg-surface);">

<!-- Also good: Tailwind arbitrary value with var() -->
<div class="text-[var(--accent)] border-[var(--border)]">

<!-- Avoid in mode-aware components: hardcoded -->
<div class="text-amber-400 bg-slate-900">
```

## Transition Pattern

Transitions use CSS variable `var(--transition-fast)` / `var(--transition-base)`:

```svelte
<div style="transition: border-color var(--transition-fast);">
```

Professional mode disables all transitions via the CSS rule:
```css
[data-mode="professional"] * { transition-duration: 0ms !important; }
```

So you don't need to check `theme.isProfessional` for transitions.

## Kids Animation Pattern

Kids mode animations are CSS-class based (applied as plain class strings):

```svelte
<div class="{isUrgent ? 'kids-pulse-urgent' : ''}">
```

The animation only fires in `[data-mode="kids"]` context because CSS keyframes
are scoped via `.kids-pulse-urgent` being wrapped in the `[data-mode="kids"]` selector
in `theme.css`.

## $bindable Props

For two-way bindable props, destructure with `$bindable()` default:
```svelte
let { selected = $bindable(null) } = $props();
```

## localStorage in $state (module-level)

Module-level $state needs a `.svelte.ts` file extension.
Use an object wrapper to make it mutable:
```ts
export const themeMode = $state<{ current: ThemeMode }>({ current: loadFromStorage() });
// NOT: export let themeMode = $state('default') — can't reassign exports
```

## Outside-click Dropdown Pattern

```svelte
let open = $state(false);
let containerEl: HTMLDivElement | undefined = $state(undefined);

function handleOutsideClick(e: MouseEvent) {
  if (containerEl && !containerEl.contains(e.target as Node)) {
    open = false;
  }
}

$effect(() => {
  if (open) document.addEventListener('mousedown', handleOutsideClick);
  return () => document.removeEventListener('mousedown', handleOutsideClick);
});
```

Use `mousedown` (not `click`) so the listener fires before the button's `onclick`,
preventing false positives when clicking the trigger button to close.

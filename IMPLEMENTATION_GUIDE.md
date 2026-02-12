# Toy Exchange - Implementation Guide

**Companion to DESIGN_SPEC.md**
**Focus:** Code patterns, setup instructions, and practical examples

---

## Quick Start: Theme System Setup

### Step 1: Create Theme Store

**File:** `src/lib/stores/theme.svelte.ts`

```typescript
import { writable, derived } from 'svelte/store';

export type ThemeMode = 'default' | 'kids' | 'professional';

interface ThemeState {
	mode: ThemeMode;
}

function createThemeStore() {
	// Initialize from localStorage if available
	let initialMode: ThemeMode = 'default';

	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('toy-exchange-theme-mode') as ThemeMode | null;
		if (saved && ['default', 'kids', 'professional'].includes(saved)) {
			initialMode = saved;
		}
	}

	const { subscribe, set, update } = writable<ThemeState>({ mode: initialMode });

	return {
		subscribe,
		setMode: (mode: ThemeMode) => {
			update(state => {
				if (typeof window !== 'undefined') {
					localStorage.setItem('toy-exchange-theme-mode', mode);
					// Apply mode class to HTML element
					document.documentElement.classList.remove('mode-default', 'mode-kids', 'mode-professional');
					document.documentElement.classList.add(`mode-${mode}`);
				}
				return { mode };
			});
		},
		toggleMode: () => {
			update(state => {
				const modes: ThemeMode[] = ['default', 'kids', 'professional'];
				const currentIndex = modes.indexOf(state.mode);
				const nextMode = modes[(currentIndex + 1) % modes.length];

				if (typeof window !== 'undefined') {
					localStorage.setItem('toy-exchange-theme-mode', nextMode);
					document.documentElement.classList.remove('mode-default', 'mode-kids', 'mode-professional');
					document.documentElement.classList.add(`mode-${nextMode}`);
				}

				return { mode: nextMode };
			});
		}
	};
}

export const themeStore = createThemeStore();
export const currentTheme = derived(themeStore, $state => $state.mode);
```

---

### Step 2: Update Root Layout

**File:** `src/routes/+layout.svelte`

```svelte
<script lang="ts">
	import Navbar from '../lib/components/layout/Navbar.svelte';
	import Footer from '../lib/components/layout/Footer.svelte';
	import { themeStore } from '../lib/stores/theme.svelte.js';
	import '../app.css';

	// Initialize theme from localStorage on mount
	onMount(() => {
		themeStore.loadFromStorage();
	});
</script>

<div class="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
	<Navbar />

	<main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(.mode-default) {
		--bg-primary: #0f172a;
		--bg-secondary: #111827;
		--text-primary: #ffffff;
		--accent: #f59e0b;
	}

	:global(.mode-kids) {
		--bg-primary: #eef2ff;
		--bg-secondary: #ffffff;
		--text-primary: #312e81;
		--accent: #a78bfa;
	}

	:global(.mode-professional) {
		--bg-primary: #111827;
		--bg-secondary: #1e293b;
		--text-primary: #ffffff;
		--accent: #3b82f6;
	}
</style>
```

---

### Step 3: Update Tailwind Config

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif']
			},
			colors: {
				// Custom colors accessible via CSS variables
				'theme-bg-primary': 'var(--bg-primary)',
				'theme-bg-secondary': 'var(--bg-secondary)',
				'theme-text': 'var(--text-primary)',
				'theme-accent': 'var(--accent)'
			},
			animation: {
				marquee: 'marquee 30s linear infinite',
				'kids-bounce': 'kids-bounce 0.6s ease-in-out infinite',
				'kids-sparkle': 'kids-sparkle 1.5s ease-in-out infinite'
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'kids-bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'kids-sparkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.5', transform: 'scale(1.1)' }
				}
			},
			screens: {
				xs: '320px'
			}
		}
	},
	plugins: [
		function({ addVariant, e }) {
			addVariant('kids', '.mode-kids &');
			addVariant('pro', '.mode-professional &');
			addVariant('default', '.mode-default &');
		}
	]
} satisfies Config;
```

---

## Component Implementation Examples

### Mode-Aware Component Pattern

```svelte
<script lang="ts">
	import type { ThemeMode } from '../../stores/theme.svelte.js';
	import { currentTheme } from '../../stores/theme.svelte.js';

	interface Props {
		title: string;
		// Optional override
		mode?: ThemeMode;
	}

	const { title, mode: overrideMode } = $props();
	const theme = $derived(overrideMode || $currentTheme);

	// Computed classes per theme
	const baseClasses = $derived.by(() => {
		switch (theme) {
			case 'kids':
				return 'bg-white border-2 border-indigo-200 rounded-2xl p-6';
			case 'professional':
				return 'bg-slate-800 border border-slate-700 rounded-lg p-3';
			case 'default':
			default:
				return 'bg-slate-900 border border-slate-800 rounded-xl p-4';
		}
	});

	const titleClasses = $derived.by(() => {
		switch (theme) {
			case 'kids':
				return 'text-2xl font-black text-indigo-900';
			case 'professional':
				return 'text-lg font-bold text-slate-100';
			case 'default':
			default:
				return 'text-xl font-bold text-white';
		}
	});
</script>

<div class={baseClasses}>
	<h2 class={titleClasses}>{title}</h2>
	<slot />
</div>
```

---

### Mode Switcher Component

**File:** `src/lib/components/layout/ModeSwitcher.svelte`

```svelte
<script lang="ts">
	import { themeStore, currentTheme, type ThemeMode } from '../../stores/theme.svelte.js';

	let isOpen = $state(false);
	const theme = $derived($currentTheme);

	const modes: Array<{
		id: ThemeMode;
		label: string;
		description: string;
		icon: string;
		emoji: string;
	}> = [
		{
			id: 'default',
			label: 'Professional',
			description: 'Dark, focused',
			icon: 'default',
			emoji: '🎮'
		},
		{
			id: 'kids',
			label: 'Kids Mode',
			description: 'Playful & safe',
			icon: 'kids',
			emoji: '⭐'
		},
		{
			id: 'professional',
			label: 'Pro Analytics',
			description: 'Advanced tools',
			icon: 'professional',
			emoji: '📊'
		}
	];

	function selectMode(mode: ThemeMode) {
		themeStore.setMode(mode);
		isOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<div class="relative">
	<!-- Toggle Button -->
	<button
		onclick={() => (isOpen = !isOpen)}
		onkeydown={handleKeydown}
		class="kids:p-3 kids:hover:bg-indigo-100 kids:rounded-xl kids:text-violet-500 p-2 hover:bg-slate-800 rounded-lg transition"
		aria-label="Switch interface mode"
		aria-haspopup="menu"
		aria-expanded={isOpen}
	>
		<svg class="kids:w-7 kids:h-7 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
			<!-- Icon content varies by mode -->
			{#if theme === 'kids'}
				<!-- Star icon -->
				<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
			{:else if theme === 'professional'}
				<!-- Chart icon -->
				<path d="M3 13h2v8H3zm4-8h2v16H7zm4-5h2v21h-2zm4-1h2v22h-2zm4 3h2v19h-2z" />
			{:else}
				<!-- Default icon (settings/gear) -->
				<path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.1-.62l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.48.1.62l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.1.62l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.48-.1-.62l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
			{/if}
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="kids:bg-white kids:border-2 kids:border-indigo-200 kids:rounded-2xl kids:shadow-lg kids:top-12 absolute right-0 mt-2 w-64 kids:w-72 bg-slate-800 kids:bg-white border kids:border-indigo-200 border-slate-700 rounded-lg kids:rounded-2xl shadow-lg overflow-hidden z-50"
			onclick={(e) => e.stopPropagation()}
			role="menu"
		>
			{#each modes as mode (mode.id)}
				<button
					onclick={() => selectMode(mode.id)}
					class="kids:hover:bg-indigo-50 kids:border-indigo-200 w-full px-4 kids:px-5 py-3 kids:py-4 text-left hover:bg-slate-700 transition kids:border-b kids:border-indigo-100 {theme ===
					mode.id
						? 'kids:bg-indigo-100 bg-slate-700'
						: ''}"
					role="menuitem"
				>
					<div class="flex items-center gap-3">
						<div
							class="kids:w-10 kids:h-10 w-6 h-6 rounded-lg kids:rounded-xl border-2 kids:border-3 flex items-center justify-center text-xs kids:text-lg font-bold {mode.id ===
							'kids'
								? 'kids:bg-gradient-to-br kids:from-indigo-100 kids:to-violet-200 kids:border-violet-500 bg-slate-700 border-slate-600'
								: mode.id === 'professional'
									? 'kids:bg-gradient-to-br kids:from-blue-100 kids:to-slate-200 kids:border-blue-500 bg-slate-700 border-slate-600'
									: 'kids:bg-gradient-to-br kids:from-slate-100 kids:to-gray-200 kids:border-gray-500 bg-slate-700 border-slate-600'}"
						>
							{mode.emoji}
						</div>

						<div class="flex-1">
							<p class="kids:text-indigo-900 font-medium text-white">{mode.label}</p>
							<p class="kids:text-indigo-600 text-xs text-slate-400">{mode.description}</p>
						</div>

						{#if theme === mode.id}
							<svg
								class="kids:text-violet-600 w-4 h-4 text-{mode.id === 'kids'
									? 'violet-500'
									: mode.id === 'professional'
										? 'blue-500'
										: 'amber-500'}"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
							</svg>
						{/if}
					</div>
				</button>
			{/each}

			<!-- Footer Info -->
			<div class="kids:bg-indigo-50 kids:border-t kids:border-indigo-200 px-4 kids:px-5 py-3 kids:py-4 bg-slate-900 border-t border-slate-700">
				<p class="kids:text-indigo-700 text-xs text-slate-500">
					{#if theme === 'kids'}
						Your choice is saved!
					{:else}
						Settings saved to your account
					{/if}
				</p>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Animations */
	:global(.mode-kids) button {
		transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	:global(.mode-kids) button:hover {
		transform: translateY(-2px);
	}
</style>
```

---

## Quick Styling Patterns

### Using Theme-Aware Classes

```svelte
<!-- Option 1: Custom mode variants in Tailwind -->
<div class="kids:bg-white kids:text-indigo-900 default:bg-slate-900 default:text-white pro:bg-slate-800 pro:text-slate-100">
	Content
</div>

<!-- Option 2: Derived computed classes -->
<script>
	import { currentTheme } from '../../stores/theme.svelte.js';

	const bgClass = $derived($currentTheme === 'kids' ? 'bg-white' : $currentTheme === 'professional' ? 'bg-slate-800' : 'bg-slate-900');
</script>

<div class={bgClass}>Content</div>

<!-- Option 3: CSS Variables (recommended for consistency) -->
<div class="bg-[var(--bg-primary)] text-[var(--text-primary)]">
	Content
</div>
```

---

## Common Component Updates

### Condition Badge (All Modes)

```svelte
<script lang="ts">
	import type { ConditionGrade } from '../../types/index.js';
	import type { ThemeMode } from '../../stores/theme.svelte.js';
	import { currentTheme } from '../../stores/theme.svelte.js';

	interface Props {
		condition: ConditionGrade;
		mode?: ThemeMode;
		size?: 'xs' | 'sm' | 'md' | 'lg';
	}

	const { condition, mode: overrideMode, size = 'sm' } = $props();
	const theme = $derived(overrideMode || $currentTheme);

	const gradeLabels: Record<ConditionGrade, string> = {
		A: 'Perfect',
		B: 'Great',
		C: 'Good',
		D: 'Fair',
		F: 'Needs Love'
	};

	const gradeEmoji: Record<ConditionGrade, string> = {
		A: '⭐',
		B: '💚',
		C: '💛',
		D: '🧡',
		F: '💔'
	};

	const gradeColors = $derived.by(() => {
		if (theme === 'kids') {
			return {
				A: 'bg-emerald-100 text-emerald-700 border-emerald-300',
				B: 'bg-green-100 text-green-700 border-green-300',
				C: 'bg-yellow-100 text-yellow-700 border-yellow-300',
				D: 'bg-orange-100 text-orange-700 border-orange-300',
				F: 'bg-red-100 text-red-700 border-red-300'
			};
		} else if (theme === 'professional') {
			return {
				A: 'bg-emerald-900 text-emerald-200 border-emerald-700',
				B: 'bg-slate-800 text-slate-200 border-slate-700',
				C: 'bg-slate-800 text-slate-200 border-slate-700',
				D: 'bg-slate-800 text-slate-300 border-slate-700',
				F: 'bg-red-900 text-red-200 border-red-700'
			};
		} else {
			// default
			return {
				A: 'bg-emerald-900 text-emerald-200 border-emerald-700',
				B: 'bg-slate-800 text-slate-300 border-slate-700',
				C: 'bg-slate-800 text-slate-300 border-slate-700',
				D: 'bg-slate-800 text-slate-400 border-slate-700',
				F: 'bg-red-900 text-red-300 border-red-700'
			};
		}
	});

	const sizeClasses = $derived.by(() => {
		return {
			xs: 'text-xs px-2 py-1',
			sm: 'text-xs px-2.5 py-1.5',
			md: 'text-sm px-3 py-2',
			lg: 'text-base px-4 py-2.5'
		}[size];
	});
</script>

<span class="inline-flex items-center gap-1 {gradeColors[condition]} {sizeClasses} border rounded {theme === 'kids' ? 'rounded-lg border-2' : 'border'}">
	{#if theme === 'kids'}
		<span>{gradeEmoji[condition]}</span>
		<span class="font-bold">{gradeLabels[condition]}</span>
	{:else}
		<span class="font-mono font-bold">Grade {condition}</span>
	{/if}
</span>
```

---

### Countdown Timer (Kids Mode with Animation)

```svelte
<script lang="ts">
	import type { ThemeMode } from '../../stores/theme.svelte.js';
	import { currentTheme } from '../../stores/theme.svelte.js';

	interface Props {
		endTime: number;
		mode?: ThemeMode;
	}

	const { endTime, mode: overrideMode } = $props();
	const theme = $derived(overrideMode || $currentTheme);

	let timeRemaining = $state('');
	let isEnded = $state(false);
	let isUrgent = $state(false); // < 1 hour

	function updateTimer() {
		const now = Date.now();
		const remaining = Math.max(0, endTime - now);

		if (remaining === 0) {
			isEnded = true;
			timeRemaining = 'Ended';
			isUrgent = false;
			return;
		}

		isUrgent = remaining < 3600000; // 1 hour in ms

		const hours = Math.floor(remaining / 3600000);
		const minutes = Math.floor((remaining % 3600000) / 60000);
		const seconds = Math.floor((remaining % 60000) / 1000);

		if (theme === 'kids') {
			if (hours > 0) {
				timeRemaining = `⏰ About ${hours} hour${hours > 1 ? 's' : ''}`;
			} else if (minutes > 0) {
				timeRemaining = `⏰ ${minutes} minute${minutes > 1 ? 's' : ''} left`;
			} else {
				timeRemaining = `🔥 ${seconds} second${seconds > 1 ? 's' : ''} left`;
			}
		} else if (theme === 'professional') {
			timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
		} else {
			timeRemaining = `${hours}h ${minutes}m ${seconds}s`;
		}
	}

	// Setup interval
	$effect.pre(() => {
		updateTimer();
		const interval = setInterval(updateTimer, 1000);

		return () => clearInterval(interval);
	});
</script>

<div
	class="kids:flex kids:items-center kids:gap-2 kids:p-3 kids:bg-gradient-to-r kids:from-sky-50 kids:to-indigo-50 kids:rounded-lg kids:border-2 {theme ===
	'kids' && isUrgent
		? 'kids:from-orange-50 kids:to-rose-50 kids:border-rose-400'
		: 'kids:border-sky-300'} {theme === 'professional' ? 'text-xs' : ''}"
>
	{#if isEnded}
		<p class="kids:text-rose-600 kids:font-bold {theme === 'professional' ? 'text-slate-500' : 'text-slate-400'}">
			{timeRemaining}
		</p>
	{:else if theme === 'kids' && isUrgent}
		<p class="text-orange-600 font-bold text-sm animate-pulse">
			{timeRemaining}
		</p>
	{:else}
		<p
			class="{theme === 'kids'
				? 'text-indigo-900 font-bold text-sm'
				: theme === 'professional'
					? 'text-slate-400'
					: 'text-slate-400'}"
		>
			{timeRemaining}
		</p>
	{/if}
</div>

<style>
	:global(.mode-kids) [class*='animate-pulse'] {
		animation: kids-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes kids-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
```

---

## State Management Patterns

### Using Theme in Svelte 5 Runes

```svelte
<script lang="ts">
	import { currentTheme } from '../../stores/theme.svelte.js';

	// Read current theme
	const theme = $derived($currentTheme);

	// Compute classes
	const classes = $derived.by(() => {
		switch (theme) {
			case 'kids':
				return 'bg-indigo-50 text-indigo-900';
			case 'professional':
				return 'bg-slate-800 text-slate-100';
			default:
				return 'bg-slate-900 text-white';
		}
	});

	// Conditional rendering
	const showAdvanced = $derived(theme === 'professional');
	const showEmoji = $derived(theme === 'kids');
</script>

<div class={classes}>
	{#if showAdvanced}
		<!-- Pro-only content -->
	{/if}

	{#if showEmoji}
		<!-- Kids emoji content -->
	{/if}
</div>
```

---

## Testing Checklist

### Manual Testing Per Mode

**Default Mode:**
- [ ] Dark theme displays correctly
- [ ] Amber accents visible
- [ ] Hover states work (border/text color changes)
- [ ] Mobile responsive (1 column)
- [ ] Keyboard navigation works

**Kids Mode:**
- [ ] Light, colorful theme displays
- [ ] Emoji icons show correctly
- [ ] Larger text and spacing visible
- [ ] Animations work (bouncing, sparkles)
- [ ] Touch targets are large (48px+)
- [ ] Parental controls mention visible

**Professional Mode:**
- [ ] Dark, compact theme displays
- [ ] Blue accents visible
- [ ] Data metrics show correctly
- [ ] Keyboard shortcuts work
- [ ] Analytics data displays
- [ ] Batch operations accessible

---

## Performance Optimization

### Code Splitting Per Mode

```svelte
<script lang="ts">
	import { currentTheme } from '../../stores/theme.svelte.js';

	let KidsComponent: any;
	let ProfessionalComponent: any;

	$effect.pre(async () => {
		if ($currentTheme === 'kids') {
			KidsComponent = (await import('./variants/KidsCard.svelte')).default;
		} else if ($currentTheme === 'professional') {
			ProfessionalComponent = (await import('./variants/ProCard.svelte')).default;
		}
	});
</script>

{#if $currentTheme === 'kids' && KidsComponent}
	<svelte:component this={KidsComponent} {...$$props} />
{:else if $currentTheme === 'professional' && ProfessionalComponent}
	<svelte:component this={ProfessionalComponent} {...$$props} />
{:else}
	<!-- Default component -->
{/if}
```

---

## Accessibility Verification Commands

```bash
# Check color contrast
npm install -g contrast-checker
contrast-checker "your-bg-color" "your-text-color"

# Test with axe browser extension
# Manual keyboard navigation: Tab through all interactive elements
# Screen reader: VoiceOver (Mac), NVDA (Windows), JAWS

# Common shortcuts to test:
# Cmd+M / Ctrl+M (mode switcher)
# Cmd+K / Ctrl+K (search)
# Escape (close modals)
# Enter/Space (activate buttons)
# Arrow keys (navigate dropdowns)
```

---

## Deployment Notes

1. **CSS Variables:** Ensure CSS variables are loaded before components render
2. **LocalStorage:** Requires client-side JavaScript (SSR-safe with getters)
3. **Flash of Wrong Theme:** Add theme class to HTML before hydration
4. **Keyboard Shortcuts:** Register globally in root layout
5. **Analytics:** Track mode selection for user research

---

## Troubleshooting

**Theme not persisting?**
- Check localStorage permissions
- Verify theme store is initialized in +layout.svelte
- Clear browser cache

**Colors look wrong?**
- Verify CSS variables are set in :root
- Check Tailwind color names match config
- Test with browser DevTools color picker

**Performance issues?**
- Monitor component re-renders with Svelte DevTools
- Lazy load theme-specific components
- Cache CSS classes in derived stores

---

**END OF IMPLEMENTATION GUIDE**

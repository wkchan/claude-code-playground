<script lang="ts">
	/**
	 * ThemeProvider
	 *
	 * Wrap the root of your app (or a section) with this component to ensure
	 * the data-mode attribute is applied and CSS variables are available.
	 *
	 * Also re-exports the theme store for convenience via Svelte context if needed.
	 *
	 * Usage:
	 *   <ThemeProvider>
	 *     <YourApp />
	 *   </ThemeProvider>
	 */
	import { themeMode } from '../../stores/theme.svelte.js';
	import { setContext } from 'svelte';

	// Provide the theme state via Svelte context so deeply nested
	// components can access it without prop drilling (if preferred over
	// directly importing the store).
	setContext('themeMode', themeMode);

	let { children } = $props();
</script>

<div data-mode={themeMode.current} class="contents">
	{@render children()}
</div>

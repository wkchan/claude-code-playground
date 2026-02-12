<script lang="ts">
	import '../app.css';
	import Navbar from '../lib/components/layout/Navbar.svelte';
	import Footer from '../lib/components/layout/Footer.svelte';
	import { themeMode } from '../lib/stores/theme.svelte.js';

	let { children } = $props();

	// Apply data-mode attribute to root element on every mode change.
	// This drives all CSS variable switching without any re-renders.
	$effect(() => {
		document.documentElement.setAttribute('data-mode', themeMode.current);
	});
</script>

<div class="flex flex-col min-h-screen bg-[var(--bg-page)]">
	<Navbar />
	<main class="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
		{@render children()}
	</main>
	<Footer />
</div>

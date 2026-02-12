<script lang="ts">
	import { currentUser } from '../../stores/user.svelte.js';
	import ModeSelector from './ModeSelector.svelte';

	let mobileMenuOpen = $state(false);

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav
	class="border-b sticky top-0 z-50"
	style="background-color: var(--navbar-bg); border-color: var(--navbar-border); min-height: var(--navbar-height);"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
		<div class="flex justify-between items-center" style="min-height: var(--navbar-height);">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2">
				<div
					class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
					style="background-color: var(--accent);"
				>
					<span class="text-white font-bold text-sm">TE</span>
				</div>
				<span
					class="font-bold text-lg hidden sm:inline"
					style="color: var(--text-primary);"
				>
					Toy Exchange
				</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				<a href="/" class="transition" style="color: var(--text-secondary);">Market</a>
				<a href="/create" class="transition" style="color: var(--text-secondary);">Create Listing</a>
				<a href="/dashboard" class="transition" style="color: var(--text-secondary);">Dashboard</a>
			</div>

			<!-- Right side: user + mode switcher -->
			<div class="flex items-center gap-3">
				<div class="text-right hidden sm:block">
					<p class="text-sm font-medium" style="color: var(--text-primary);">{currentUser.username}</p>
					<p class="text-xs" style="color: var(--text-muted);">Member</p>
				</div>

				<ModeSelector />

				<!-- Mobile Menu Button -->
				<button
					type="button"
					onclick={toggleMenu}
					class="md:hidden p-2 rounded-lg hover:bg-[var(--bg-elevated)] transition"
					aria-label="Toggle menu"
					aria-expanded={mobileMenuOpen}
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
						/>
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden pb-4 border-t" style="border-color: var(--border);">
				<a
					href="/"
					onclick={toggleMenu}
					class="block px-3 py-2 rounded hover:bg-[var(--bg-elevated)]"
					style="color: var(--text-secondary);"
				>
					Market
				</a>
				<a
					href="/create"
					onclick={toggleMenu}
					class="block px-3 py-2 rounded hover:bg-[var(--bg-elevated)]"
					style="color: var(--text-secondary);"
				>
					Create Listing
				</a>
				<a
					href="/dashboard"
					onclick={toggleMenu}
					class="block px-3 py-2 rounded hover:bg-[var(--bg-elevated)]"
					style="color: var(--text-secondary);"
				>
					Dashboard
				</a>
			</div>
		{/if}
	</div>
</nav>

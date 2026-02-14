<script lang="ts">
	import { useTheme } from '../lib/stores/theme.svelte.js';
	import PriceTicker from '../lib/components/ticker/PriceTicker.svelte';
	import CategoryFilter from '../lib/components/listings/CategoryFilter.svelte';
	import ListingGrid from '../lib/components/listings/ListingGrid.svelte';
	import { getListings } from '../lib/stores/listings.svelte.js';

	const theme = useTheme();

	let selectedCategory: string | null = $state(null);
	let searchQuery = $state('');
	let sortBy = $state<'newest' | 'price-high' | 'price-low' | 'ending-soon'>('newest');

	const listings = getListings();

	const filteredListings = $derived(
		listings
			.filter((l) => l.status === 'active')
			.filter((l) => selectedCategory === null || l.category === selectedCategory)
			.filter(
				(l) =>
					searchQuery === '' ||
					l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					l.description.toLowerCase().includes(searchQuery.toLowerCase())
			)
			.sort((a, b) => {
				switch (sortBy) {
					case 'price-high':
						return b.currentBid - a.currentBid;
					case 'price-low':
						return a.currentBid - b.currentBid;
					case 'ending-soon':
						return a.endTime - b.endTime;
					case 'newest':
					default:
						return b.id.localeCompare(a.id); // Proxy for creation order
				}
			})
	);
</script>

<style>
	[data-mode="kids"] input::placeholder {
		color: var(--text-placeholder);
	}
</style>

<!-- Price Ticker -->
<PriceTicker />

{#if theme.isKids}
	<!-- Kids: Hero Banner -->
	<div class="mt-6 mb-4 rounded-3xl overflow-hidden p-8 text-center"
		style="background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);">
		<h1 class="text-4xl font-black text-white mb-2">Toy Exchange</h1>
		<p class="text-lg font-bold" style="color: var(--navbar-accent);">Bid on Amazing Toys! 🎉</p>
	</div>
{/if}

<!-- Search and Filters -->
<div class="space-y-6 mt-8">
	<!-- Search Bar -->
	<div class="relative">
		<input
			type="text"
			bind:value={searchQuery}
			placeholder={theme.isKids ? 'Search for toys...' : 'Search toys...'}
			class="{theme.isKids
				? 'w-full bg-white border-2 rounded-full px-5 py-3 font-semibold focus:outline-none focus:ring-2 shadow-sm'
				: 'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500'}"
			style="{theme.isKids ? 'border-color: var(--border); color: var(--text-primary); --tw-ring-color: var(--accent);' : ''}"
		/>
		<svg
			class="absolute right-3 top-3 w-5 h-5 {theme.isKids ? '' : 'text-slate-500'}"
			style="{theme.isKids ? 'color: var(--accent);' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</div>

	<!-- Filters -->
	<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
		<div class="flex-1">
			<p class="text-sm mb-2 {theme.isKids ? 'font-black uppercase tracking-wide' : 'text-slate-400'}" style="{theme.isKids ? 'color: var(--text-primary);' : ''}">Categories</p>
			<CategoryFilter bind:selected={selectedCategory} />
		</div>

		<div class="flex flex-col sm:flex-row gap-2 md:justify-end">
			<label for="sort" class="block text-sm {theme.isKids ? 'font-black' : 'text-slate-400'}" style="{theme.isKids ? 'color: var(--text-primary);' : ''}">Sort by</label>
			<select
				id="sort"
				bind:value={sortBy}
				class="{theme.isKids
					? 'bg-white border-2 rounded-full px-4 py-2 font-bold focus:outline-none shadow-sm'
					: 'bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500'}"
				style="{theme.isKids ? 'border-color: var(--border); color: var(--text-primary);' : ''}"
			>
				<option value="newest">Newest</option>
				<option value="price-high">Price: High to Low</option>
				<option value="price-low">Price: Low to High</option>
				<option value="ending-soon">Ending Soon</option>
			</select>
		</div>
	</div>
</div>

<!-- Results Count -->
<p class="text-sm mt-6 mb-4 {theme.isKids ? 'font-semibold' : 'text-slate-400'}" style="{theme.isKids ? 'color: var(--text-muted);' : ''}">
	Showing {filteredListings.length} active listing{filteredListings.length !== 1 ? 's' : ''}
</p>

<!-- Listing Grid -->
<ListingGrid listings={filteredListings} />

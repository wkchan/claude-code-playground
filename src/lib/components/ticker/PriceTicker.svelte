<script lang="ts">
	import { formatCents } from '../../utils/format.js';
	import { getListings } from '../../stores/listings.svelte.js';
	import type { ToyListing } from '../../types/index.js';

	const listings = getListings();

	// Get top 5 active listings by bid activity
	const topListings = $derived(
		listings
			.filter((l) => l.status === 'active')
			.sort((a, b) => b.currentBid - a.currentBid)
			.slice(0, 5)
	);

	function getTrend(listing: ToyListing): { direction: 'up' | 'down'; percentage: number } {
		const change = listing.currentBid - listing.startingPrice;
		const percentage = (Math.abs(change) / listing.startingPrice) * 100;
		return {
			direction: change >= 0 ? 'up' : 'down',
			percentage: Math.round(percentage * 10) / 10
		};
	}
</script>

<div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 py-3 overflow-hidden">
	<div class="animate-marquee flex gap-8 whitespace-nowrap">
		{#each topListings as listing, i (listing.id)}
			{@const trend = getTrend(listing)}
			<div class="flex items-center gap-2">
				<span class="text-slate-400">{listing.title.slice(0, 20)}</span>
				<span class="font-mono font-bold text-amber-400">{formatCents(listing.currentBid)}</span>
				<span
					class="{trend.direction === 'up'
						? 'text-emerald-400'
						: 'text-rose-400'} flex items-center gap-1"
				>
					{#if trend.direction === 'up'}
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 11-2 0v-8H4a1 1 0 01-1-1z" />
							<path fill-rule="evenodd" d="M10 2a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 4.414V7a1 1 0 11-2 0V4.414L7.707 6.707a1 1 0 11-1.414-1.414l3-3A1 1 0 0110 2z" clip-rule="evenodd" />
						</svg>
					{:else}
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17 10a1 1 0 01-1 1H4a1 1 0 110-2h12a1 1 0 011 1z" />
							<path fill-rule="evenodd" d="M10 18a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L9 15.586V13a1 1 0 112 0v2.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 18z" clip-rule="evenodd" />
						</svg>
					{/if}
					{trend.percentage}%
				</span>
			</div>
			{#if i < topListings.length - 1}
				<span class="text-slate-600">·</span>
			{/if}
		{/each}

		<!-- Repeat for seamless loop -->
		{#each topListings as listing, i (listing.id + '-repeat')}
			{@const trend = getTrend(listing)}
			<div class="flex items-center gap-2">
				<span class="text-slate-400">{listing.title.slice(0, 20)}</span>
				<span class="font-mono font-bold text-amber-400">{formatCents(listing.currentBid)}</span>
				<span
					class="{trend.direction === 'up'
						? 'text-emerald-400'
						: 'text-rose-400'} flex items-center gap-1"
				>
					{#if trend.direction === 'up'}
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 11-2 0v-8H4a1 1 0 01-1-1z" />
							<path fill-rule="evenodd" d="M10 2a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 4.414V7a1 1 0 11-2 0V4.414L7.707 6.707a1 1 0 11-1.414-1.414l3-3A1 1 0 0110 2z" clip-rule="evenodd" />
						</svg>
					{:else}
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M17 10a1 1 0 01-1 1H4a1 1 0 110-2h12a1 1 0 011 1z" />
							<path fill-rule="evenodd" d="M10 18a1 1 0 01-.707-.293l-3-3a1 1 0 011.414 1.414L9 15.586V13a1 1 0 112 0v2.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 18z" clip-rule="evenodd" />
						</svg>
					{/if}
					{trend.percentage}%
				</span>
			</div>
			{#if i < topListings.length - 1}
				<span class="text-slate-600">·</span>
			{/if}
		{/each}
	</div>
</div>

<script lang="ts">
	import { useTheme } from '../../stores/theme.svelte.js';
	import ListingCard from './ListingCard.svelte';
	import type { ToyListing } from '../../types/index.js';

	interface Props {
		listings: ToyListing[];
	}

	const { listings } = $props();

	const theme = useTheme();

	/**
	 * Grid configuration per mode:
	 *   Default:      1 col -> 2 col (sm) -> 3 col (lg) -> 4 col (xl)  gap-6
	 *   Kids:         1 col -> 2 col (sm) -> 3 col (lg) -> 3 col (xl)  gap-6
	 *   Professional: 2 col -> 3 col (sm) -> 4 col (lg) -> 5 col (xl)  gap-2
	 */
	const gridClass = $derived.by(() => {
		if (theme.isKids) {
			return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
		}
		if (theme.isProfessional) {
			return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2';
		}
		return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
	});

	const emptyClasses = $derived.by(() => {
		if (theme.isKids) return 'text-center py-16 text-lg font-semibold';
		if (theme.isProfessional) return 'text-center py-6 text-xs font-mono';
		return 'text-center py-12';
	});
</script>

<div class={gridClass}>
	{#each listings as listing (listing.id)}
		<ListingCard {listing} />
	{/each}
</div>

{#if listings.length === 0}
	<div class={emptyClasses} style="color: var(--text-muted);">
		{#if theme.isKids}
			<p>No toys found right now. Check back soon! 🎁</p>
		{:else if theme.isProfessional}
			<p>NO_RESULTS — adjust filters to see listings</p>
		{:else}
			<p>No listings found</p>
		{/if}
	</div>
{/if}

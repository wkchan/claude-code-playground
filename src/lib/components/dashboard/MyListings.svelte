<script lang="ts">
	import { getListings } from '../../stores/listings.svelte.js';
	import { currentUser } from '../../stores/user.svelte.js';
	import ListingGrid from '../listings/ListingGrid.svelte';

	const listings = getListings();
	const userListings = $derived(listings.filter((l) => l.sellerId === currentUser.id));
</script>

<div>
	<h2 class="text-2xl font-bold text-white mb-6">My Listings</h2>

	{#if userListings.length === 0}
		<div class="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
			<p class="text-slate-400 mb-4">You haven't created any listings yet.</p>
			<a href="/create" class="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2 rounded-lg transition">
				Create Your First Listing
			</a>
		</div>
	{:else}
		<ListingGrid listings={userListings} />
	{/if}
</div>

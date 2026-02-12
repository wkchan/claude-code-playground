<script lang="ts">
	import { getListings } from '../../stores/listings.svelte.js';
	import { currentUser } from '../../stores/user.svelte.js';
	import { getWinningBidForListing } from '../../stores/bids.svelte.js';
	import { formatCents } from '../../utils/format.js';

	const listings = getListings();

	// Get all listings where user has bid
	const biddedListings = $derived(
		listings.filter((l) => l.bids.some((b) => b.bidderId === currentUser.id))
	);

	// Map to show bid status
	const bidStatus = $derived(
		biddedListings.map((l) => {
			const userBid = l.bids.filter((b) => b.bidderId === currentUser.id).sort((a, b) => b.amount - a.amount)[0];
			const winningBid = getWinningBidForListing(l.id);
			const isWinning = winningBid?.bidderId === currentUser.id;

			return {
				listing: l,
				myBid: userBid,
				isWinning,
				isOutbid: !isWinning && winningBid?.amount! > (userBid?.amount || 0)
			};
		})
	);
</script>

<div>
	<h2 class="text-2xl font-bold text-white mb-6">My Bids</h2>

	{#if bidStatus.length === 0}
		<div class="text-center py-12 bg-slate-900 border border-slate-800 rounded-xl">
			<p class="text-slate-400">You haven't placed any bids yet.</p>
		</div>
	{:else}
		<div class="space-y-4">
			{#each bidStatus as item (item.listing.id)}
				<a href="/listing/{item.listing.id}" class="block">
					<div class="bg-slate-900 border border-slate-800 hover:border-amber-500 rounded-xl p-4 transition">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<h3 class="font-semibold text-white hover:text-amber-400 transition">{item.listing.title}</h3>
								<p class="text-sm text-slate-400 mt-1">{item.listing.category}</p>
							</div>

							<div class="text-right ml-4">
								<p class="font-mono font-bold text-amber-400">{formatCents(item.myBid.amount)}</p>
								<p class="text-xs text-slate-400 mt-1">
									{#if item.isWinning}
										<span class="text-emerald-400">You're winning</span>
									{:else if item.isOutbid}
										<span class="text-rose-400">Outbid</span>
									{:else}
										<span class="text-slate-400">Bid placed</span>
									{/if}
								</p>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

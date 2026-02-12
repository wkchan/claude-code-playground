<script lang="ts">
	import ConditionBadge from '../../../lib/components/listings/ConditionBadge.svelte';
	import CountdownTimer from '../../../lib/components/bidding/CountdownTimer.svelte';
	import PriceChart from '../../../lib/components/chart/PriceChart.svelte';
	import BidForm from '../../../lib/components/bidding/BidForm.svelte';
	import BidHistory from '../../../lib/components/bidding/BidHistory.svelte';
	import { formatCents, formatRelativeTime } from '../../../lib/utils/format.js';
	import { currentUser } from '../../../lib/stores/user.svelte.js';
	import { getWinningBidForListing } from '../../../lib/stores/bids.svelte.js';

	interface Props {
		data: { listing: any };
	}

	const { data } = $props();
	const { listing } = data;

	const isCurrentUserSeller = $derived(listing.sellerId === currentUser.id);
	const winningBid = $derived(getWinningBidForListing(listing.id));
	const currentUserIsWinning = $derived(winningBid?.bidderId === currentUser.id);
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	<!-- Left Column: Image and Chart -->
	<div class="lg:col-span-2 space-y-8">
		<!-- Image -->
		<div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
			{#if listing.imageUrl}
				<img src={listing.imageUrl} alt={listing.title} class="w-full h-96 object-cover" />
			{:else}
				<div class="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
					<div class="text-slate-500 text-center">
						<svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						No Image Available
					</div>
				</div>
			{/if}
		</div>

		<!-- Price Chart -->
		<div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
			<h3 class="font-semibold text-white mb-4">Price History (30 days)</h3>
			<PriceChart history={listing.priceHistory} height={300} />
		</div>
	</div>

	<!-- Right Column: Details and Bidding -->
	<div class="space-y-6">
		<!-- Title and Category -->
		<div>
			<p class="text-xs text-slate-400 uppercase tracking-wide mb-2">{listing.category}</p>
			<h1 class="text-3xl font-bold text-white mb-4">{listing.title}</h1>

			<div class="flex items-center gap-2">
				<ConditionBadge condition={listing.condition} size="md" />
			</div>
		</div>

		<!-- Seller Info -->
		<div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
			<p class="text-xs text-slate-400 mb-1">Seller</p>
			<p class="font-semibold text-white">{listing.sellerUsername}</p>
			{#if isCurrentUserSeller}
				<p class="text-xs text-amber-400 mt-2">This is your listing</p>
			{/if}
		</div>

		<!-- Current Bid -->
		<div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
			<p class="text-xs text-slate-400 mb-1">Current Bid</p>
			<p class="text-4xl font-mono font-bold text-amber-400 mb-2">{formatCents(listing.currentBid)}</p>
			<p class="text-xs text-slate-400">{listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''} placed</p>
		</div>

		<!-- Winning Status -->
		{#if currentUserIsWinning}
			<div class="bg-emerald-900 border border-emerald-700 rounded-xl p-4">
				<p class="text-emerald-200 font-medium">You are currently winning this auction!</p>
			</div>
		{/if}

		<!-- Timer -->
		<div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
			<p class="text-xs text-slate-400 mb-3">Time Remaining</p>
			<CountdownTimer endTime={listing.endTime} />
		</div>

		<!-- Bid Form (only if not seller and listing is active) -->
		{#if !isCurrentUserSeller && listing.status === 'active'}
			<BidForm {listing} />
		{:else if isCurrentUserSeller && listing.status === 'active'}
			<div class="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-slate-400">
				You cannot bid on your own listing
			</div>
		{:else}
			<div class="bg-slate-900 border border-slate-800 rounded-xl p-4 text-center text-slate-400">
				This auction has ended
			</div>
		{/if}

		<!-- Bid History -->
		<BidHistory bids={listing.bids} />
	</div>
</div>

<!-- Description Section -->
<div class="mt-8 max-w-4xl">
	<div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
		<h2 class="font-semibold text-white mb-4">Description</h2>
		<p class="text-slate-300 leading-relaxed">{listing.description}</p>
	</div>
</div>

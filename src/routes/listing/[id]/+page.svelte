<script lang="ts">
	import ConditionBadge from '../../../lib/components/listings/ConditionBadge.svelte';
	import CountdownTimer from '../../../lib/components/bidding/CountdownTimer.svelte';
	import PriceChart from '../../../lib/components/chart/PriceChart.svelte';
	import BidForm from '../../../lib/components/bidding/BidForm.svelte';
	import BidHistory from '../../../lib/components/bidding/BidHistory.svelte';
	import { formatCents, formatRelativeTime } from '../../../lib/utils/format.js';
	import { currentUser } from '../../../lib/stores/user.svelte.js';
	import { useTheme } from '../../../lib/stores/theme.svelte.js';
	import { getWinningBidForListing } from '../../../lib/stores/bids.svelte.js';

	const theme = useTheme();

	interface Props {
		data: { listing: any };
	}

	const { data } = $props();
	const listing = $derived(data.listing);

	const isCurrentUserSeller = $derived(listing.sellerId === currentUser.id);
	const winningBid = $derived(getWinningBidForListing(listing.id));
	const currentUserIsWinning = $derived(winningBid?.bidderId === currentUser.id);

	// Panel styling helper for kids mode
	const panelClass = $derived(
		theme.isKids
			? 'bg-white border-2 border-[#e5e7eb] rounded-2xl shadow-sm'
			: 'bg-slate-900 border border-slate-800 rounded-xl'
	);
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	<!-- Left Column: Image and Chart -->
	<div class="lg:col-span-2 space-y-8">
		<!-- Image -->
		<div class="{panelClass} overflow-hidden">
			{#if theme.isKids}
				<div class="h-1.5 w-full bg-[#ea0029]"></div>
			{/if}
			{#if listing.imageUrl}
				<img src={listing.imageUrl} alt={listing.title} class="w-full h-96 object-cover" />
			{:else}
				<div class="w-full h-96 bg-gradient-to-br {theme.isKids ? 'from-[#fff5f5] to-[#ffffff]' : 'from-slate-800 to-slate-900'} flex items-center justify-center">
					<div class="{theme.isKids ? 'text-[#888888]' : 'text-slate-500'} text-center">
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
		<div class="{panelClass} p-6">
			<h3 class="font-semibold mb-4 {theme.isKids ? 'text-[#1a1a1a]' : 'text-white'}">Price History (30 days)</h3>
			<PriceChart history={listing.priceHistory} height={300} />
		</div>
	</div>

	<!-- Right Column: Details and Bidding -->
	<div class="space-y-6">
		<!-- Title and Category -->
		<div>
			<p class="text-xs mb-2 uppercase tracking-wide {theme.isKids ? 'font-black text-[#ea0029]' : 'text-slate-400'}">{listing.category}</p>
			<h1 class="text-3xl mb-4 {theme.isKids ? 'font-black text-[#1a1a1a]' : 'font-bold text-white'}">{listing.title}</h1>

			<div class="flex items-center gap-2">
				<ConditionBadge condition={listing.condition} size="md" />
			</div>
		</div>

		<!-- Seller Info -->
		<div class="{panelClass} p-4">
			<p class="text-xs mb-1 {theme.isKids ? 'font-black text-[#ea0029] uppercase tracking-wide' : 'text-slate-400'}">{theme.isKids ? 'SELLER' : 'Seller'}</p>
			<p class="font-semibold {theme.isKids ? 'text-[#1a1a1a]' : 'text-white'}">{listing.sellerUsername}</p>
			{#if isCurrentUserSeller}
				<p class="text-xs mt-2 {theme.isKids ? 'text-[#ea0029] font-bold' : 'text-amber-400'}">{theme.isKids ? '✓ Your Listing' : 'This is your listing'}</p>
			{/if}
		</div>

		<!-- Current Bid -->
		<div class="{panelClass} p-4">
			<p class="text-xs mb-1 {theme.isKids ? 'font-black text-[#ea0029] uppercase tracking-wide' : 'text-slate-400'}">{theme.isKids ? 'CURRENT BID' : 'Current Bid'}</p>
			<p class="text-4xl font-mono font-bold mb-2 {theme.isKids ? 'text-[#ea0029]' : 'text-amber-400'}">{formatCents(listing.currentBid)}</p>
			<p class="text-xs {theme.isKids ? 'text-[#555555]' : 'text-slate-400'}">{listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''} placed</p>
		</div>

		<!-- Winning Status -->
		{#if currentUserIsWinning}
			<div class="{theme.isKids ? 'bg-[#fff5f5] border-2 border-[#ea0029]' : 'bg-emerald-900 border border-emerald-700'} rounded-xl p-4">
				<p class="{theme.isKids ? 'text-[#ea0029] font-black' : 'text-emerald-200 font-medium'}">🏆 {theme.isKids ? 'You\'re Winning!' : 'You are currently winning this auction!'}</p>
			</div>
		{/if}

		<!-- Timer -->
		<div class="{panelClass} p-4">
			<p class="text-xs mb-3 {theme.isKids ? 'font-black text-[#ea0029] uppercase tracking-wide' : 'text-slate-400'}">{theme.isKids ? 'TIME LEFT' : 'Time Remaining'}</p>
			<CountdownTimer endTime={listing.endTime} />
		</div>

		<!-- Bid Form (only if not seller and listing is active) -->
		{#if !isCurrentUserSeller && listing.status === 'active'}
			<BidForm {listing} />
		{:else if isCurrentUserSeller && listing.status === 'active'}
			<div class="{panelClass} p-4 text-center {theme.isKids ? 'text-[#555555]' : 'text-slate-400'}">
				{theme.isKids ? '🚫 You can\'t bid on your own listing!' : 'You cannot bid on your own listing'}
			</div>
		{:else}
			<div class="{panelClass} p-4 text-center {theme.isKids ? 'text-[#555555]' : 'text-slate-400'}">
				{theme.isKids ? '⏰ This auction has ended' : 'This auction has ended'}
			</div>
		{/if}

		<!-- Bid History -->
		<BidHistory bids={listing.bids} />
	</div>
</div>

<!-- Description Section -->
<div class="mt-8 max-w-4xl">
	<div class="{panelClass} p-6">
		<h2 class="font-semibold mb-4 {theme.isKids ? 'text-[#1a1a1a]' : 'text-white'}">{theme.isKids ? '📖 ABOUT THIS TOY' : 'Description'}</h2>
		<p class="leading-relaxed {theme.isKids ? 'text-[#555555]' : 'text-slate-300'}">{listing.description}</p>
	</div>
</div>

<script lang="ts">
	import { formatCents, formatRelativeTime } from '../../utils/format.js';
	import type { Bid } from '../../types/index.js';

	interface Props {
		bids: Bid[];
		maxHeight?: string;
	}

	const { bids, maxHeight = '400px' } = $props();

	// Sort bids by timestamp (newest first)
	const sortedBids = $derived([...bids].sort((a, b) => b.timestamp - a.timestamp));
</script>

<div class="bg-slate-900 border border-slate-800 rounded-xl p-4">
	<h3 class="font-semibold text-white mb-4">Bid History</h3>

	{#if sortedBids.length === 0}
		<p class="text-slate-400 text-sm">No bids yet</p>
	{:else}
		<div class="overflow-y-auto space-y-3" style="max-height: {maxHeight};">
			{#each sortedBids as bid (bid.id)}
				<div class="flex items-center justify-between pb-3 border-b border-slate-800 last:border-0">
					<div>
						<p class="font-medium text-white text-sm">{bid.bidderUsername}</p>
						<p class="text-xs text-slate-400">{formatRelativeTime(bid.timestamp)}</p>
					</div>
					<p class="font-mono font-bold text-amber-400">{formatCents(bid.amount)}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>

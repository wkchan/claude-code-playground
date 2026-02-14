<script lang="ts">
	import { formatCents } from '../../utils/format.js';
	import { useTheme } from '../../stores/theme.svelte.js';
	import ConditionBadge from './ConditionBadge.svelte';
	import CountdownTimer from '../bidding/CountdownTimer.svelte';
	import type { ToyListing } from '../../types/index.js';

	interface Props {
		listing: ToyListing;
	}

	const { listing } = $props();

	const theme = useTheme();

	// Category emoji icons for Kids mode
	const categoryEmoji: Record<string, string> = {
		'Action Figures': '🦸',
		'Board Games': '🎲',
		'LEGO Sets': '🧱',
		'Plush Toys': '🧸'
	};

	const cardClasses = $derived.by(() => {
		if (theme.isKids) {
			return 'bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_8px_30px_rgba(234,0,41,0.15)] h-full flex flex-col';
		}
		if (theme.isProfessional) {
			return 'bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg overflow-hidden hover:border-[var(--border-hover)] h-full flex flex-col';
		}
		return 'bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500 transition h-full flex flex-col';
	});

	const imageHeightClass = $derived.by(() => {
		if (theme.isKids) return 'h-56';
		if (theme.isProfessional) return 'h-40';
		return 'h-48';
	});

	const paddingClass = $derived.by(() => {
		if (theme.isKids) return 'p-6';
		if (theme.isProfessional) return 'p-3';
		return 'p-4';
	});

	const titleClasses = $derived.by(() => {
		if (theme.isKids) {
			return 'font-black text-[var(--text-primary)] mb-2 line-clamp-2 text-base leading-snug group-hover:text-[var(--accent)] transition';
		}
		if (theme.isProfessional) {
			return 'font-semibold text-[var(--text-primary)] mb-1 line-clamp-1 text-xs hover:text-[var(--accent-text)]';
		}
		return 'font-semibold text-white mb-2 line-clamp-2 group-hover:text-amber-400 transition';
	});

	const bidLabelClasses = $derived.by(() => {
		if (theme.isKids) return 'text-sm font-semibold text-[var(--text-muted)] mb-1';
		if (theme.isProfessional) return 'text-xs text-[var(--text-muted)] mb-0.5';
		return 'text-xs text-slate-400 mb-1';
	});

	const bidAmountClasses = $derived.by(() => {
		if (theme.isKids) return 'text-2xl font-black font-mono text-[#ea0029]';
		if (theme.isProfessional) return 'text-sm font-mono font-bold text-[var(--accent-text)]';
		return 'text-lg font-mono font-bold text-amber-400';
	});

	const dividerClasses = $derived.by(() => {
		if (theme.isKids) return 'my-3 border-t-2 border-[#ea0029] opacity-15';
		if (theme.isProfessional) return 'my-3 border-t border-[var(--border)]';
		return 'my-3 border-t border-[var(--border)]';
	});
</script>

<a href="/listing/{listing.id}" class="block group">
	<div class="{cardClasses}" style="transition: transform var(--transition-hover), box-shadow var(--transition-hover), border-color var(--transition-hover);">
		{#if theme.isKids}
			<!-- Kids mode: red accent stripe at top -->
			<div class="h-1.5 w-full bg-[#ea0029]"></div>
		{/if}
		<!-- Image -->
		<div
			class="bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-surface)] {imageHeightClass} flex items-center justify-center overflow-hidden relative"
		>
			{#if listing.imageUrl}
				<img
					src={listing.imageUrl}
					alt={listing.title}
					class="w-full h-full object-cover {theme.isKids ? 'group-hover:scale-105' : theme.isDefault ? 'group-hover:scale-105' : ''}"
					style="transition: transform var(--transition-base);"
				/>
			{:else}
				<div class="text-center" style="color: var(--text-faint);">
					{#if theme.isKids}
						<div class="text-4xl mb-2" aria-hidden="true">
							{categoryEmoji[listing.category] ?? '🎁'}
						</div>
					{:else}
						<svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					{/if}
					<span class="text-xs">No Image</span>
				</div>
			{/if}

			<!-- Condition Badge -->
			<div class="absolute top-3 right-3">
				<ConditionBadge condition={listing.condition} size="sm" />
			</div>
		</div>

		<!-- Content -->
		<div class="{paddingClass} flex-1 flex flex-col">
			<!-- Category -->
			{#if theme.isKids}
				<p class="text-xs font-black mb-1 flex items-center gap-1.5 uppercase tracking-wide" style="color: #ea0029;">
					<span aria-hidden="true">{categoryEmoji[listing.category] ?? '🎁'}</span>
					{listing.category}
				</p>
			{:else if theme.isProfessional}
				<p class="text-xs uppercase tracking-wider mb-1" style="color: var(--text-faint);">{listing.category}</p>
			{:else}
				<p class="text-xs text-slate-400 uppercase tracking-wide mb-2">{listing.category}</p>
			{/if}

			<!-- Title -->
			<h3 class={titleClasses}>
				{listing.title}
			</h3>

			<!-- Seller -->
			{#if theme.isProfessional}
				<p class="text-xs mb-2 truncate" style="color: var(--text-faint);">{listing.sellerUsername}</p>
			{:else}
				<p class="text-xs mb-4" style="color: var(--text-muted);">by {listing.sellerUsername}</p>
			{/if}

			<!-- Divider -->
			<div class={dividerClasses}></div>

			<!-- Price -->
			{#if theme.isProfessional}
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs" style="color: var(--text-muted);">Bid</span>
					<div class="text-right">
						<span class={bidAmountClasses}>{formatCents(listing.currentBid)}</span>
						<span class="text-xs ml-1 tabular-nums" style="color: var(--text-faint);">{listing.bids.length}b</span>
					</div>
				</div>
			{:else}
				<div class="mb-4">
					<p class={bidLabelClasses}>Current Bid</p>
					<p class={bidAmountClasses}>{formatCents(listing.currentBid)}</p>
					<p class="text-xs mt-0.5" style="color: var(--text-faint);">
						{listing.bids.length} bid{listing.bids.length !== 1 ? 's' : ''}
					</p>
				</div>
			{/if}

			<!-- Timer -->
			<div class="mt-auto pt-3 border-t" style="border-color: var(--border);">
				<CountdownTimer endTime={listing.endTime} />
			</div>
		</div>
	</div>
</a>

<script lang="ts">
	import { placeBid } from '../../stores/listings.svelte.js';
	import { currentUser } from '../../stores/user.svelte.js';
	import { formatCents } from '../../utils/format.js';
	import { useTheme } from '../../stores/theme.svelte.js';
	import type { ToyListing } from '../../types/index.js';

	interface Props {
		listing: ToyListing;
	}

	const { listing } = $props();

	const theme = useTheme();

	let bidAmount = $state('');
	let message = $state<{ type: 'success' | 'error'; text: string } | null>(null);
	let celebrating = $state(false);

	const minimumBid = $derived(listing.currentBid + 100); // $1 minimum increment
	const parsedAmount = $derived(parseInt(bidAmount) || 0);
	const isValid = $derived(parsedAmount >= minimumBid && listing.status === 'active');

	function submitBid() {
		if (!isValid) return;

		const success = placeBid(listing.id, currentUser.id, currentUser.username, parsedAmount);

		if (success) {
			message = { type: 'success', text: `Bid placed for ${formatCents(parsedAmount)}!` };
			bidAmount = '';

			if (theme.isKids) {
				celebrating = true;
				setTimeout(() => (celebrating = false), 700);
			}

			setTimeout(() => (message = null), 3000);
		} else {
			message = {
				type: 'error',
				text: 'Failed to place bid. Listing may have ended.'
			};
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		// Default/Kids: Enter key submits
		// Professional: Cmd/Ctrl+Enter submits
		if (theme.isProfessional) {
			if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
				submitBid();
			}
		} else {
			if (e.key === 'Enter') {
				submitBid();
			}
		}
	}

	const inputClasses = $derived.by(() => {
		const base = 'w-full border rounded focus:outline-none';
		if (theme.isKids) {
			return `${base} bg-white border-2 border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] px-4 py-3 text-base rounded-xl focus:border-[var(--border-focus)] focus:ring-2 focus:ring-[var(--accent)]`;
		}
		if (theme.isProfessional) {
			return `${base} bg-[var(--bg-input)] border-[var(--border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] px-3 py-1.5 text-xs font-mono rounded focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--accent)]`;
		}
		return `${base} bg-slate-800 border-slate-700 text-white placeholder-slate-500 px-4 py-2 rounded-lg focus:border-amber-500 focus:ring-1 focus:ring-amber-500`;
	});

	const buttonClasses = $derived.by(() => {
		if (theme.isKids) {
			return isValid
				? 'px-8 py-3 rounded-full font-black text-base text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] hover:scale-105 shadow-lg shadow-red-200 active:scale-95'
				: 'px-8 py-3 rounded-full font-black text-base text-[var(--text-faint)] bg-[var(--bg-elevated)] cursor-not-allowed opacity-60';
		}
		if (theme.isProfessional) {
			return isValid
				? 'px-3 py-1.5 rounded text-xs font-mono text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)]'
				: 'px-3 py-1.5 rounded text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-elevated)] cursor-not-allowed opacity-60';
		}
		return isValid
			? 'px-6 py-2 rounded-lg font-medium transition bg-amber-500 hover:bg-amber-600 text-white'
			: 'px-6 py-2 rounded-lg font-medium bg-slate-700 text-slate-500 cursor-not-allowed';
	});

	const labelClasses = $derived.by(() => {
		if (theme.isKids) return 'block text-base font-bold mb-2';
		if (theme.isProfessional) return 'block text-xs font-mono mb-1';
		return 'block text-sm font-medium mb-2 text-white';
	});

	const metaClasses = $derived.by(() => {
		if (theme.isKids) return 'text-sm font-semibold space-y-1';
		if (theme.isProfessional) return 'text-xs font-mono space-y-0.5';
		return 'text-xs space-y-1';
	});
</script>

<div
	class="space-y-4"
	class:space-y-2={theme.isProfessional}
	class:space-y-6={theme.isKids}
>
	<!-- Kids: safety/helpful header -->
	{#if theme.isKids}
		<div class="bg-[#fff5f5] rounded-2xl p-4 border-2 border-[var(--accent)]">
			<p class="text-sm font-black" style="color: var(--accent);">
				🎮 Place Your Bid!
			</p>
			<p class="text-xs mt-1 font-semibold" style="color: var(--text-muted);">
				Ask a parent before bidding!
			</p>
		</div>
	{/if}

	<!-- Input row -->
	<div>
		<label for="bid-amount" class="{labelClasses}" style="color: var(--text-primary);">
			{#if theme.isKids}
				How much do you want to bid? (in cents)
			{:else if theme.isProfessional}
				BID_AMOUNT (¢)
			{:else}
				Bid Amount (cents)
			{/if}
		</label>
		<div class="flex gap-2">
			<div class="flex-1">
				<input
					id="bid-amount"
					type="number"
					bind:value={bidAmount}
					onkeydown={handleKeydown}
					placeholder={theme.isKids ? 'Enter bid (e.g. 1500 = $15.00)' : theme.isProfessional ? '0' : 'Enter bid in cents'}
					min={minimumBid}
					class={inputClasses}
					aria-label="Bid amount in cents"
					aria-describedby="bid-meta"
					style="transition: border-color var(--transition-fast);"
				/>
			</div>
			<button
				type="button"
				onclick={submitBid}
				disabled={!isValid}
				class={buttonClasses}
				class:kids-pop={theme.isKids && celebrating}
				style="transition: all var(--transition-fast);"
				aria-label={isValid ? `Place bid of ${formatCents(parsedAmount || minimumBid)}` : 'Bid amount too low'}
			>
				{#if theme.isKids}
					{isValid ? '🛒 BID NOW!' : 'BID!'}
				{:else if theme.isProfessional}
					BID
				{:else}
					Place Bid
				{/if}
			</button>
		</div>
	</div>

	<!-- Price meta info -->
	<div id="bid-meta" class="{metaClasses}" style="color: var(--text-muted);">
		<p>
			{theme.isProfessional ? 'CUR:' : 'Current Bid:'}
			<span class="font-mono" style="color: var(--accent-text);">{formatCents(listing.currentBid)}</span>
		</p>
		<p>
			{theme.isProfessional ? 'MIN:' : 'Minimum Bid:'}
			<span class="font-mono" style="color: var(--accent-text);">{formatCents(minimumBid)}</span>
		</p>
		{#if theme.isProfessional}
			<p class="text-[10px]" style="color: var(--text-faint);">Cmd/Ctrl+Enter to submit</p>
		{/if}
	</div>

	<!-- Success/error message -->
	{#if message}
		<div
			class="border rounded-lg px-4 py-2 text-sm {message.type === 'success'
				? 'border-[var(--success-border)]'
				: 'border-[var(--error-border)]'}"
			style="background-color: {message.type === 'success' ? 'var(--success-bg)' : 'var(--error-bg)'}; color: {message.type === 'success' ? 'var(--success-text)' : 'var(--error-text)'};"
			role="status"
			aria-live="polite"
		>
			{#if theme.isKids && message.type === 'success'}
				🎉 {message.text}
			{:else if theme.isKids && message.type === 'error'}
				😢 {message.text}
			{:else}
				{message.text}
			{/if}
		</div>
	{/if}
</div>

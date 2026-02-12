<script lang="ts">
	import { useTheme } from '../../stores/theme.svelte.js';

	interface Props {
		endTime: number;
	}

	const { endTime } = $props();

	const theme = useTheme();

	let remaining = $state(0);

	$effect(() => {
		remaining = Math.max(0, endTime - Date.now());
		const interval = setInterval(() => {
			remaining = Math.max(0, endTime - Date.now());
		}, 1000);
		return () => clearInterval(interval);
	});

	const days = $derived(Math.floor(remaining / 86400000));
	const hours = $derived(Math.floor((remaining % 86400000) / 3600000));
	const minutes = $derived(Math.floor((remaining % 3600000) / 60000));
	const seconds = $derived(Math.floor((remaining % 60000) / 1000));
	const isEnded = $derived(remaining === 0);

	// Under one hour remaining
	const isUrgent = $derived(remaining > 0 && remaining < 3600000);

	// Professional: compact HH:MM:SS or D+HH:MM:SS
	const compactTime = $derived(() => {
		if (isEnded) return 'ENDED';
		if (days > 0) return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	});
</script>

{#if theme.isProfessional}
	<!-- Professional: ultra-compact monospace -->
	<div class="flex items-center gap-1.5">
		{#if isEnded}
			<span class="font-mono text-xs text-red-400 font-bold">ENDED</span>
		{:else}
			<svg class="w-3 h-3 shrink-0" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span
				class="font-mono text-xs font-semibold tabular-nums {isUrgent ? 'text-red-400' : ''}"
				style="color: {isUrgent ? '' : 'var(--accent-text)'};"
				aria-label="Time remaining: {days > 0 ? days + ' days ' : ''}{hours.toString().padStart(2, '0')} hours {minutes.toString().padStart(2, '0')} minutes"
			>
				{compactTime()}
			</span>
		{/if}
	</div>

{:else if theme.isKids}
	<!-- Kids: large, colorful, playful with pulse on urgency -->
	<div class="text-center" aria-label="Time remaining">
		{#if isEnded}
			<div class="text-rose-600 font-bold text-lg">Auction Ended!</div>
		{:else}
			<div
				class="flex justify-center gap-1.5 items-center {isUrgent ? 'kids-pulse-urgent' : ''}"
				aria-live="polite"
			>
				{#if days > 0}
					<div class="text-center bg-[var(--bg-elevated)] rounded-xl px-3 py-1.5 border-2 border-[var(--border)]">
						<div class="text-2xl font-black" style="color: var(--accent);">{days}</div>
						<div class="text-xs font-semibold" style="color: var(--text-muted);">days</div>
					</div>
					<span class="text-xl font-black" style="color: var(--text-muted);">:</span>
				{/if}
				<div class="text-center bg-[var(--bg-elevated)] rounded-xl px-3 py-1.5 border-2 border-[var(--border)]">
					<div class="text-2xl font-black" style="color: {isUrgent ? '#e11d48' : 'var(--accent)'};">{hours.toString().padStart(2, '0')}</div>
					<div class="text-xs font-semibold" style="color: var(--text-muted);">hrs</div>
				</div>
				<span class="text-xl font-black" style="color: var(--text-muted);">:</span>
				<div class="text-center bg-[var(--bg-elevated)] rounded-xl px-3 py-1.5 border-2 border-[var(--border)]">
					<div class="text-2xl font-black" style="color: {isUrgent ? '#e11d48' : 'var(--accent)'};">{minutes.toString().padStart(2, '0')}</div>
					<div class="text-xs font-semibold" style="color: var(--text-muted);">min</div>
				</div>
				<span class="text-xl font-black" style="color: var(--text-muted);">:</span>
				<div class="text-center bg-[var(--bg-elevated)] rounded-xl px-3 py-1.5 border-2 border-[var(--border)]">
					<div class="text-2xl font-black" style="color: {isUrgent ? '#e11d48' : 'var(--accent)'};">{seconds.toString().padStart(2, '0')}</div>
					<div class="text-xs font-semibold" style="color: var(--text-muted);">sec</div>
				</div>
			</div>
			{#if isUrgent}
				<p class="text-xs font-bold text-rose-600 mt-1" aria-live="assertive">Hurry — ending soon!</p>
			{/if}
		{/if}
	</div>

{:else}
	<!-- Default mode: original display -->
	<div class="text-center">
		{#if isEnded}
			<div class="text-red-400 font-bold">Auction Ended</div>
		{:else}
			<div class="flex justify-center gap-2 items-center">
				<div class="text-center">
					<div class="text-xl md:text-2xl font-bold text-white">{days}</div>
					<div class="text-xs text-slate-400">days</div>
				</div>
				<span class="text-slate-500">:</span>
				<div class="text-center">
					<div class="text-xl md:text-2xl font-bold text-white">{hours.toString().padStart(2, '0')}</div>
					<div class="text-xs text-slate-400">hrs</div>
				</div>
				<span class="text-slate-500">:</span>
				<div class="text-center">
					<div class="text-xl md:text-2xl font-bold text-white">{minutes.toString().padStart(2, '0')}</div>
					<div class="text-xs text-slate-400">min</div>
				</div>
				<span class="text-slate-500">:</span>
				<div class="text-center">
					<div class="text-xl md:text-2xl font-bold text-white">{seconds.toString().padStart(2, '0')}</div>
					<div class="text-xs text-slate-400">sec</div>
				</div>
			</div>
		{/if}
	</div>
{/if}

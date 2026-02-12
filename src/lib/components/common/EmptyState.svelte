<script lang="ts">
	import { useTheme } from '../../stores/theme.svelte.js';

	interface Props {
		/** Heading shown in the empty state */
		title?: string;
		/** Supporting description */
		message?: string;
		/** Optional call-to-action label */
		actionLabel?: string;
		/** Optional call-to-action href */
		actionHref?: string;
	}

	const {
		title = 'No listings found',
		message = 'Try adjusting your filters or check back later.',
		actionLabel = '',
		actionHref = '/'
	} = $props();

	const theme = useTheme();
</script>

{#if theme.isKids}
	<!-- Kids: emoji-based ASCII art + friendly message -->
	<div class="text-center py-16 px-6">
		<div class="text-6xl mb-4 leading-none" aria-hidden="true">
			<div>🧸 🎲 🧱</div>
			<div class="text-4xl mt-1">🤔💭❓</div>
		</div>
		<h2 class="text-2xl font-black mb-3" style="color: var(--text-primary);">
			{title}
		</h2>
		<p class="text-base font-medium mb-6" style="color: var(--text-muted);">
			{message}
		</p>
		{#if actionLabel}
			<a
				href={actionHref}
				class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-black text-base text-white border-2"
				style="background-color: var(--accent); border-color: var(--accent);"
			>
				🎯 {actionLabel}
			</a>
		{/if}
	</div>

{:else if theme.isProfessional}
	<!-- Professional: data table headers placeholder -->
	<div class="py-4">
		<div class="w-full border border-[var(--border)] rounded overflow-hidden">
			<!-- Column headers -->
			<div
				class="grid grid-cols-5 border-b border-[var(--border)] px-3 py-1.5"
				style="background-color: var(--bg-elevated);"
			>
				{#each ['TITLE', 'CATEGORY', 'CONDITION', 'CURRENT_BID', 'ENDS'] as col (col)}
					<span class="text-xs font-mono font-semibold" style="color: var(--text-muted);">{col}</span>
				{/each}
			</div>
			<!-- Empty rows placeholder -->
			{#each Array(3) as _, i (i)}
				<div
					class="grid grid-cols-5 px-3 py-1.5 border-b border-[var(--border)] last:border-0"
					style="opacity: {0.4 - i * 0.1}; background-color: var(--bg-surface);"
				>
					{#each Array(5) as _, j (j)}
						<div class="h-2.5 rounded" style="background-color: var(--bg-elevated); width: {65 + j * 5}%;"></div>
					{/each}
				</div>
			{/each}
		</div>
		<div class="mt-3 text-center">
			<p class="text-xs font-mono" style="color: var(--text-muted);">NO_RESULTS — {message}</p>
			{#if actionLabel}
				<a
					href={actionHref}
					class="inline-block mt-2 text-xs font-mono underline"
					style="color: var(--accent-text);"
				>
					{actionLabel}
				</a>
			{/if}
		</div>
	</div>

{:else}
	<!-- Default: standard centered message -->
	<div class="text-center py-16 px-6">
		<div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: var(--bg-elevated);">
			<svg class="w-8 h-8" style="color: var(--text-muted);" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
			</svg>
		</div>
		<h2 class="text-lg font-semibold mb-2" style="color: var(--text-primary);">{title}</h2>
		<p class="text-sm mb-6" style="color: var(--text-muted);">{message}</p>
		{#if actionLabel}
			<a
				href={actionHref}
				class="inline-block px-6 py-2 rounded-lg font-medium text-sm text-white"
				style="background-color: var(--accent);"
			>
				{actionLabel}
			</a>
		{/if}
	</div>
{/if}

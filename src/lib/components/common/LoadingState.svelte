<script lang="ts">
	import { useTheme } from '../../stores/theme.svelte.js';

	interface Props {
		/** Number of skeleton cards/rows to render */
		count?: number;
		/** Accessible label for the loading region */
		label?: string;
	}

	const { count = 4, label = 'Loading...' } = $props();

	const theme = useTheme();

	// Professional: fake progress between 20-90 during loading
	let progress = $state(28);

	$effect(() => {
		if (!theme.isProfessional) return;
		const interval = setInterval(() => {
			progress = Math.min(90, progress + Math.random() * 8);
		}, 400);
		return () => clearInterval(interval);
	});
</script>

<div role="status" aria-label={label} aria-live="polite">
	<span class="sr-only">{label}</span>

	{#if theme.isProfessional}
		<!-- Professional: deterministic progress bar -->
		<div class="w-full space-y-1">
			<div class="flex items-center justify-between mb-1">
				<span class="text-xs font-mono" style="color: var(--text-muted);">LOADING</span>
				<span class="text-xs font-mono tabular-nums" style="color: var(--text-muted);">{Math.round(progress)}%</span>
			</div>
			<div class="w-full rounded h-1" style="background-color: var(--bg-elevated);">
				<div
					class="h-1 rounded"
					style="width: {progress}%; background-color: var(--accent); transition: width 400ms linear;"
				></div>
			</div>
			<!-- Compact table placeholder rows -->
			<div class="mt-3 space-y-1">
				{#each Array(count) as _, i (i)}
					<div class="flex gap-2 items-center">
						<div class="h-3 rounded w-1/3 opacity-30" style="background-color: var(--bg-elevated); animation: none;"></div>
						<div class="h-3 rounded w-1/4 opacity-20" style="background-color: var(--bg-elevated); animation: none;"></div>
						<div class="h-3 rounded w-1/5 opacity-25" style="background-color: var(--bg-elevated); animation: none;"></div>
					</div>
				{/each}
			</div>
		</div>

	{:else if theme.isKids}
		<!-- Kids: animated dancing skeleton with bounce -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each Array(count) as _, i (i)}
				<div
					class="bg-white border border-[var(--border)] rounded-2xl overflow-hidden"
					style="animation: kids-bounce {1.2 + i * 0.15}s ease-in-out infinite; animation-delay: {i * 0.12}s;"
				>
					<!-- Red accent stripe -->
					<div class="h-1.5 w-full bg-[var(--accent)] opacity-30"></div>
					<!-- Image placeholder -->
					<div
						class="h-56"
						style="background: linear-gradient(90deg, #fff5f5 25%, #fecaca 50%, #fff5f5 75%); background-size: 200% 100%; animation: shimmer 1.8s ease-in-out infinite;"
					></div>
					<!-- Text lines placeholder -->
					<div class="p-6 space-y-3">
						<div class="h-3 rounded-full w-1/3" style="background-color: var(--bg-elevated);"></div>
						<div class="h-4 rounded-full w-5/6" style="background-color: var(--bg-elevated);"></div>
						<div class="h-4 rounded-full w-2/3" style="background-color: var(--bg-elevated);"></div>
						<div class="h-8 rounded-xl w-1/2 mt-4" style="background-color: var(--bg-elevated);"></div>
					</div>
				</div>
			{/each}
		</div>

	{:else}
		<!-- Default: subtle shimmer skeleton -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each Array(count) as _, i (i)}
				<div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
					<!-- Image placeholder -->
					<div class="h-48 bg-slate-800 relative overflow-hidden">
						<div
							class="absolute inset-0"
							style="background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.05) 50%, transparent 75%); background-size: 200% 100%; animation: shimmer 1.6s ease-in-out infinite;"
						></div>
					</div>
					<!-- Text lines -->
					<div class="p-4 space-y-3">
						<div class="h-3 bg-slate-800 rounded w-1/4 animate-pulse"></div>
						<div class="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
						<div class="h-4 bg-slate-800 rounded w-2/3 animate-pulse"></div>
						<div class="h-6 bg-slate-800 rounded w-1/3 mt-4 animate-pulse"></div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	@keyframes shimmer {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}
</style>

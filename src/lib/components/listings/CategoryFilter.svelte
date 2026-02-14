<script lang="ts">
	import { CATEGORIES } from '../../data/categories.js';
	import { useTheme } from '../../stores/theme.svelte.js';

	interface Props {
		selected?: string | null;
	}

	let { selected = $bindable(null) } = $props();

	const theme = useTheme();

	// Emoji icons for each category (Kids mode)
	const categoryEmoji: Record<string, string> = {
		'Action Figures': '🦸',
		'Board Games': '🎲',
		'LEGO Sets': '🧱',
		'Plush Toys': '🧸'
	};

	// Professional dropdown: track open state
	let dropdownOpen = $state(false);
	let dropdownEl: HTMLDivElement | undefined = $state(undefined);

	// Kids mode: track hovered category for wiggle animation
	let hoveredCategory = $state<string | null>(null);

	function selectCategory(cat: string | null) {
		selected = cat;
		dropdownOpen = false;
	}

	function handleOutsideClick(e: MouseEvent) {
		if (dropdownEl && !dropdownEl.contains(e.target as Node)) {
			dropdownOpen = false;
		}
	}

	$effect(() => {
		if (dropdownOpen) {
			document.addEventListener('mousedown', handleOutsideClick);
		}
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	});

	const selectedLabel = $derived(selected ?? 'All Categories');
</script>

{#if theme.isProfessional}
	<!-- Professional: compact dropdown -->
	<div bind:this={dropdownEl} class="relative inline-block">
		<button
			type="button"
			onclick={() => (dropdownOpen = !dropdownOpen)}
			aria-haspopup="listbox"
			aria-expanded={dropdownOpen}
			aria-label="Filter by category"
			class="flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded border
				bg-[var(--bg-surface)] border-[var(--border)] text-[var(--text-secondary)]
				hover:border-[var(--border-hover)] min-w-[9rem]"
		>
			<svg class="w-3 h-3 shrink-0 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
			</svg>
			<span class="flex-1 text-left truncate">{selectedLabel}</span>
			<svg class="w-3 h-3 text-[var(--text-muted)]" style="transform: {dropdownOpen ? 'rotate(180deg)' : ''};" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>

		{#if dropdownOpen}
			<div
				role="listbox"
				aria-label="Category filter options"
				class="absolute left-0 mt-1 w-44 rounded border border-[var(--border)] bg-[var(--bg-surface)] shadow-lg z-40 overflow-hidden"
			>
				<button
					type="button"
					role="option"
					aria-selected={selected === null}
					onclick={() => selectCategory(null)}
					class="w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-[var(--bg-elevated)]
						{selected === null ? 'text-[var(--accent-text)] font-semibold' : 'text-[var(--text-secondary)]'}"
				>
					All Categories
				</button>
				{#each CATEGORIES as category (category)}
					<button
						type="button"
						role="option"
						aria-selected={selected === category}
						onclick={() => selectCategory(category)}
						class="w-full text-left px-3 py-1.5 text-xs font-mono hover:bg-[var(--bg-elevated)]
							{selected === category ? 'text-[var(--accent-text)] font-semibold' : 'text-[var(--text-secondary)]'}"
					>
						{category}
					</button>
				{/each}
			</div>
		{/if}
	</div>

{:else if theme.isKids}
	<!-- Kids: Mattel-style bold pill buttons with wiggle -->
	<div class="flex flex-wrap gap-3" role="group" aria-label="Filter by category">
		<button
			type="button"
			onclick={() => (selected = null)}
			onmouseenter={() => (hoveredCategory = null)}
			onmouseleave={() => (hoveredCategory = null)}
			aria-pressed={selected === null}
			class="flex items-center gap-2 rounded-full font-black border-2 px-6 py-2.5 text-sm shadow-sm
				{selected === null
					? 'bg-[#ea0029] border-[#ea0029] text-white shadow-md'
					: 'bg-white border-[#e5e7eb] text-[#1a1a1a] hover:border-[#ea0029] hover:text-[#ea0029]'}"
			class:kids-wiggle={hoveredCategory === null}
			style="transition: all var(--transition-fast);"
		>
			<span aria-hidden="true">🎯</span>
			All Toys
		</button>

		{#each CATEGORIES as category (category)}
			<button
				type="button"
				onclick={() => (selected = category)}
				onmouseenter={() => (hoveredCategory = category)}
				onmouseleave={() => (hoveredCategory = null)}
				aria-pressed={selected === category}
				class="flex items-center gap-2 rounded-full font-black border-2 px-6 py-2.5 text-sm shadow-sm
					{selected === category
						? 'bg-[#ea0029] border-[#ea0029] text-white shadow-md'
						: 'bg-white border-[#e5e7eb] text-[#1a1a1a] hover:border-[#ea0029] hover:text-[#ea0029]'}"
				class:kids-wiggle={hoveredCategory === category}
				style="transition: all var(--transition-fast);"
			>
				<span aria-hidden="true">{categoryEmoji[category] ?? '🎁'}</span>
				{category}
			</button>
		{/each}
	</div>

{:else}
	<!-- Default: chip buttons -->
	<div class="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
		<button
			type="button"
			onclick={() => (selected = null)}
			aria-pressed={selected === null}
			class="{selected === null
				? 'bg-amber-500 text-white'
				: 'bg-slate-800 text-slate-300 hover:bg-slate-700'} px-4 py-2 rounded-lg transition font-medium text-sm"
		>
			All
		</button>

		{#each CATEGORIES as category (category)}
			<button
				type="button"
				onclick={() => (selected = category)}
				aria-pressed={selected === category}
				class="{selected === category
					? 'bg-amber-500 text-white'
					: 'bg-slate-800 text-slate-300 hover:bg-slate-700'} px-4 py-2 rounded-lg transition font-medium text-sm"
			>
				{category}
			</button>
		{/each}
	</div>
{/if}

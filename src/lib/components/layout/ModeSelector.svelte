<script lang="ts">
	import { useTheme, type ThemeMode } from '../../stores/theme.svelte.js';

	const theme = useTheme();

	type ModeOption = {
		value: ThemeMode;
		label: string;
		description: string;
		icon: string;
	};

	const modes: ModeOption[] = [
		{ value: 'default', label: 'Default', description: 'Dark professional', icon: '◑' },
		{ value: 'kids', label: 'Kids', description: 'Bright & playful', icon: '🎮' },
		{ value: 'professional', label: 'Pro', description: 'Compact data', icon: '📊' }
	];

	let open = $state(false);
	let containerEl: HTMLDivElement | undefined = $state(undefined);

	function selectMode(mode: ThemeMode) {
		theme.setMode(mode);
		open = false;
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') open = false;
		if (e.key === 'ArrowDown' && !open) open = true;
	}

	function handleOutsideClick(e: MouseEvent) {
		if (containerEl && !containerEl.contains(e.target as Node)) {
			open = false;
		}
	}

	$effect(() => {
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		}
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	});

	const currentMode = $derived(modes.find((m) => m.value === theme.mode)!);
</script>

<div bind:this={containerEl} class="relative">
	<button
		type="button"
		onclick={() => (open = !open)}
		onkeydown={handleTriggerKeydown}
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-label="Switch display mode. Current: {currentMode.label}"
		class="flex items-center gap-2 px-3 text-sm font-medium
			{theme.isKids
				? 'rounded-full border border-white bg-white text-[var(--text-primary)] hover:bg-[var(--navbar-accent)] hover:border-[var(--navbar-accent)]'
				: 'rounded-lg border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] hover:border-[var(--border-hover)]'}"
		style="min-height: var(--touch-min); padding-top: var(--btn-py); padding-bottom: var(--btn-py); transition: all var(--transition-fast);"
	>
		<span aria-hidden="true" class="text-base">{currentMode.icon}</span>
		<span>{currentMode.label}</span>
		<svg
			class="w-4 h-4 text-[var(--text-muted)]"
			style="transform: {open ? 'rotate(180deg)' : 'rotate(0deg)'}; transition: transform var(--transition-fast);"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if open}
		<div
			role="listbox"
			aria-label="Display mode options"
			class="absolute right-0 mt-2 w-52 overflow-hidden shadow-xl z-50
				{theme.isKids
					? 'rounded-2xl border-2 border-[var(--accent)] bg-white'
					: 'rounded-xl border border-[var(--border)] bg-[var(--bg-surface)]'}"
		>
			{#each modes as modeOption (modeOption.value)}
				<button
					type="button"
					role="option"
					aria-selected={theme.mode === modeOption.value}
					onclick={() => selectMode(modeOption.value)}
					onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectMode(modeOption.value); }}
					class="w-full text-left flex items-center gap-3 px-4 py-3 text-sm
						hover:bg-[var(--bg-elevated)]
						{theme.mode === modeOption.value
							? 'text-[var(--accent-text)] font-semibold'
							: 'text-[var(--text-secondary)]'}"
				>
					<span class="text-base w-6 text-center" aria-hidden="true">{modeOption.icon}</span>
					<span class="flex-1">
						<span class="block font-medium">{modeOption.label}</span>
						<span class="block text-xs text-[var(--text-muted)]">{modeOption.description}</span>
					</span>
					{#if theme.mode === modeOption.value}
						<svg
							class="w-4 h-4 shrink-0 text-[var(--accent)]"
							fill="currentColor"
							viewBox="0 0 20 20"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{/if}
				</button>
			{/each}
		</div>
	{/if}
</div>

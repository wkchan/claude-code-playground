<script lang="ts">
	import { CONDITION_LABELS } from '../../data/categories.js';
	import { useTheme } from '../../stores/theme.svelte.js';
	import type { ConditionGrade } from '../../types/index.js';

	interface Props {
		condition: ConditionGrade;
		size?: 'xs' | 'sm' | 'md' | 'lg';
	}

	const { condition, size = 'md' }: Props = $props();

	const theme = useTheme();

	// Color definitions per condition grade
	const defaultColors: Record<ConditionGrade, { bg: string; text: string }> = {
		A: { bg: 'bg-emerald-900', text: 'text-emerald-300' },
		B: { bg: 'bg-blue-900', text: 'text-blue-300' },
		C: { bg: 'bg-amber-900', text: 'text-amber-300' },
		D: { bg: 'bg-orange-900', text: 'text-orange-300' },
		F: { bg: 'bg-red-900', text: 'text-red-300' }
	};

	const kidsColors: Record<ConditionGrade, { bg: string; text: string }> = {
		A: { bg: 'bg-emerald-100', text: 'text-emerald-800' },
		B: { bg: 'bg-blue-100', text: 'text-blue-800' },
		C: { bg: 'bg-amber-100', text: 'text-amber-800' },
		D: { bg: 'bg-orange-100', text: 'text-orange-800' },
		F: { bg: 'bg-red-100', text: 'text-red-800' }
	};

	// Emoji star ratings: A=5 stars, B=4, C=3, D=2, F=1
	const kidsStars: Record<ConditionGrade, string> = {
		A: '⭐⭐⭐⭐⭐',
		B: '⭐⭐⭐⭐',
		C: '⭐⭐⭐',
		D: '⭐⭐',
		F: '⭐'
	};

	const kidsStarCount: Record<ConditionGrade, number> = { A: 5, B: 4, C: 3, D: 2, F: 1 };

	const sizeClasses: Record<string, string> = {
		xs: 'px-1.5 py-0.5 text-xs',
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
		lg: 'px-4 py-2 text-base'
	};

	const kidsSizeClasses: Record<string, string> = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-base'
	};

	const color = $derived(theme.isKids ? kidsColors[condition] : defaultColors[condition]);
	const sizeClass = $derived(theme.isKids ? kidsSizeClasses[size] : sizeClasses[size]);
</script>

{#if theme.isKids}
	<!-- Kids mode: emoji stars + text label -->
	<span
		class="{color.bg} {color.text} rounded-full font-bold {sizeClass} inline-flex items-center gap-1 border-2"
		style="border-color: {condition === 'A' ? '#6ee7b7' : condition === 'B' ? '#93c5fd' : condition === 'C' ? '#fcd34d' : condition === 'D' ? '#fdba74' : '#fca5a5'};"
		title="Grade {condition} - {CONDITION_LABELS[condition]} — {kidsStarCount[condition]} out of 5 stars"
	>
		<span aria-hidden="true">{kidsStars[condition]}</span>
		<span class="sr-only">{kidsStarCount[condition]} out of 5 stars —</span>
		{CONDITION_LABELS[condition]}
	</span>
{:else if theme.isProfessional}
	<!-- Professional mode: monospace, compact -->
	<span
		class="{defaultColors[condition].bg} {defaultColors[condition].text} rounded font-mono font-semibold {sizeClasses[size]} inline-block tracking-tight"
		title="Grade {condition} - {CONDITION_LABELS[condition]}"
	>
		{condition}/{CONDITION_LABELS[condition].slice(0, 3).toUpperCase()}
	</span>
{:else}
	<!-- Default mode -->
	<span class="{color.bg} {color.text} rounded-md font-semibold {sizeClass} inline-block">
		Grade {condition} - {CONDITION_LABELS[condition]}
	</span>
{/if}

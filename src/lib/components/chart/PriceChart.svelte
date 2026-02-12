<script lang="ts">
	import type { PriceHistoryPoint } from '../../types/index.js';
	import { formatCents, formatRelativeTime } from '../../utils/format.js';

	interface Props {
		history: PriceHistoryPoint[];
		height?: number;
	}

	const { history, height = 300 } = $props();

	// Dimensions
	const width = 600;
	const padding = { top: 20, right: 20, bottom: 40, left: 60 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	// Find min/max prices
	const minPrice = $derived(Math.min(...history.map((p) => p.price)));
	const maxPrice = $derived(Math.max(...history.map((p) => p.price)));
	const priceRange = $derived(maxPrice - minPrice || 1);

	// Scale functions
	const scaleX = $derived((index: number) => {
		return padding.left + (index / (history.length - 1)) * chartWidth;
	});

	const scaleY = $derived((price: number) => {
		const normalized = (price - minPrice) / priceRange;
		return padding.top + chartHeight - normalized * chartHeight;
	});

	// Build polyline points for line
	const linePoints = $derived(history.map((p, i) => `${scaleX(i)},${scaleY(p.price)}`).join(' '));

	// Build path for area fill
	const areaPoints = $derived(
		[
			`${padding.left},${padding.top + chartHeight}`,
			...history.map((p, i) => `${scaleX(i)},${scaleY(p.price)}`),
			`${padding.left + chartWidth},${padding.top + chartHeight}`
		].join(' ')
	);

	// Y-axis ticks
	const yTicks = $derived(
		Array.from({ length: 5 }).map((_, i) => {
			const value = minPrice + (priceRange / 4) * i;
			return {
				price: value,
				y: scaleY(value)
			};
		})
	);
</script>

<div class="w-full overflow-x-auto">
	<svg {width} {height} viewBox="0 0 {width} {height}" class="mx-auto">
		<!-- Background -->
		<rect width={width} height={height} fill="none" />

		<!-- Grid lines -->
		{#each yTicks as tick}
			<line
				x1={padding.left}
				y1={tick.y}
				x2={width - padding.right}
				y2={tick.y}
				stroke="#334155"
				stroke-width="1"
				stroke-dasharray="4"
			/>
		{/each}

		<!-- Y-axis -->
		<line
			x1={padding.left}
			y1={padding.top}
			x2={padding.left}
			y2={height - padding.bottom}
			stroke="#64748b"
			stroke-width="2"
		/>

		<!-- X-axis -->
		<line
			x1={padding.left}
			y1={height - padding.bottom}
			x2={width - padding.right}
			y2={height - padding.bottom}
			stroke="#64748b"
			stroke-width="2"
		/>

		<!-- Y-axis labels -->
		{#each yTicks as tick}
			<text
				x={padding.left - 10}
				y={tick.y + 4}
				text-anchor="end"
				fill="#94a3b8"
				font-size="12"
				font-family="JetBrains Mono"
			>
				{formatCents(Math.round(tick.price))}
			</text>
		{/each}

		<!-- X-axis labels (first, middle, last) -->
		{#each [0, Math.floor((history.length - 1) / 2), history.length - 1] as index}
			{@const point = history[index]}
			<text
				x={scaleX(index)}
				y={height - padding.bottom + 20}
				text-anchor="middle"
				fill="#94a3b8"
				font-size="12"
				font-family="system-ui"
			>
				{formatRelativeTime(point.timestamp)}
			</text>
		{/each}

		<!-- Area fill (gradient) -->
		<defs>
			<linearGradient id="priceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0.3" />
				<stop offset="100%" style="stop-color:#f59e0b;stop-opacity:0.05" />
			</linearGradient>
		</defs>

		<polygon points={areaPoints} fill="url(#priceGradient)" />

		<!-- Line -->
		<polyline
			points={linePoints}
			fill="none"
			stroke="#f59e0b"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>

		<!-- Dots at each point -->
		{#each history as point, i}
			<circle
				cx={scaleX(i)}
				cy={scaleY(point.price)}
				r="3"
				fill="#f59e0b"
				stroke="#1e293b"
				stroke-width="2"
			/>
		{/each}
	</svg>
</div>

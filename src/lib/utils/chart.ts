import type { PriceHistoryPoint } from '../types/index.js';

/**
 * Generate mock price history for new listings
 */
export function generateMockPriceHistory(
	startingPrice: number,
	points: number = 12
): PriceHistoryPoint[] {
	const now = Date.now();
	const history: PriceHistoryPoint[] = [];
	const dayMs = 86400000;

	let price = startingPrice;

	for (let i = points - 1; i >= 0; i--) {
		const timestamp = now - i * (30 * dayMs) / points;
		price = Math.max(price + (Math.random() - 0.4) * (startingPrice * 0.1), startingPrice * 0.5);
		history.push({
			timestamp,
			price: Math.floor(price),
			volume: Math.floor(Math.random() * 50) + 5
		});
	}

	return history;
}

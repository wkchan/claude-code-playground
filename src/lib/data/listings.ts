import type { ToyListing } from '../types/index.js';

// Helper to generate mock price history
function generateMockPriceHistory(): Array<{ timestamp: number; price: number; volume: number }> {
	const now = Date.now();
	const points = [];
	const dayMs = 86_400_000;
	let price = Math.floor(Math.random() * 5000) + 1000; // Start between $10-60

	for (let i = 11; i >= 0; i--) {
		const timestamp = now - i * (30 * dayMs) / 12;
		price = Math.max(price + (Math.random() - 0.4) * 500, 500);
		points.push({
			timestamp,
			price: Math.floor(price),
			volume: Math.floor(Math.random() * 50) + 5
		});
	}

	return points;
}

export const MOCK_LISTINGS: ToyListing[] = [
	{
		id: 'listing-1',
		title: 'Vintage Star Wars Millennium Falcon',
		description: 'Original 1979 Kenner Millennium Falcon with vintage box. Some wear but fully functional.',
		category: 'Action Figures',
		condition: 'B',
		imageUrl: null,
		sellerId: 'user-1',
		sellerUsername: 'ToyCollector',
		startingPrice: 15000,
		currentBid: 25500,
		bids: [
			{ id: 'bid-1', listingId: 'listing-1', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 15000, timestamp: Date.now() - 172800000 },
			{ id: 'bid-2', listingId: 'listing-1', bidderId: 'user-4', bidderUsername: 'LEGOEnthusiast', amount: 18000, timestamp: Date.now() - 86400000 },
			{ id: 'bid-6', listingId: 'listing-1', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 25500, timestamp: Date.now() - 3600000 }
		],
		endTime: Date.now() + 86400000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-2',
		title: 'Complete LEGO Star Wars Millennium Falcon',
		description: 'LEGO set 75257, 100% complete with instructions and original box.',
		category: 'LEGO Sets',
		condition: 'A',
		imageUrl: null,
		sellerId: 'user-1',
		sellerUsername: 'ToyCollector',
		startingPrice: 8000,
		currentBid: 11200,
		bids: [
			{ id: 'bid-7', listingId: 'listing-2', bidderId: 'user-4', bidderUsername: 'LEGOEnthusiast', amount: 8000, timestamp: Date.now() - 259200000 },
			{ id: 'bid-14', listingId: 'listing-2', bidderId: 'user-3', bidderUsername: 'BoardGameBoss', amount: 11200, timestamp: Date.now() - 7200000 }
		],
		endTime: Date.now() + 172800000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-3',
		title: 'Rare Beanie Babies Collection (Lot of 25)',
		description: 'Vintage Beanie Babies collection including several rare editions.',
		category: 'Plush Toys',
		condition: 'C',
		imageUrl: null,
		sellerId: 'user-1',
		sellerUsername: 'ToyCollector',
		startingPrice: 5000,
		currentBid: 7500,
		bids: [
			{ id: 'bid-13', listingId: 'listing-3', bidderId: 'user-5', bidderUsername: 'PlushPerfect', amount: 5000, timestamp: Date.now() - 345600000 },
			{ id: 'bid-16', listingId: 'listing-3', bidderId: 'user-4', bidderUsername: 'LEGOEnthusiast', amount: 7500, timestamp: Date.now() - 10800000 }
		],
		endTime: Date.now() + 259200000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-4',
		title: 'G.I. Joe Cobra Commander (1983)',
		description: 'Classic G.I. Joe Cobra Commander with original accessories.',
		category: 'Action Figures',
		condition: 'B',
		imageUrl: null,
		sellerId: 'user-2',
		sellerUsername: 'ActionAce',
		startingPrice: 8000,
		currentBid: 12300,
		bids: [
			{ id: 'bid-8', listingId: 'listing-4', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 8000, timestamp: Date.now() - 172800000 },
			{ id: 'bid-11', listingId: 'listing-4', bidderId: 'user-3', bidderUsername: 'BoardGameBoss', amount: 10000, timestamp: Date.now() - 86400000 },
			{ id: 'bid-17', listingId: 'listing-4', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 12300, timestamp: Date.now() - 1800000 }
		],
		endTime: Date.now() + 129600000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-5',
		title: 'Hot Wheels Super Rare Pink Cadillac',
		description: 'Extremely rare 1968 Hot Wheels Custom Cadillac in pink.',
		category: 'Action Figures',
		condition: 'A',
		imageUrl: null,
		sellerId: 'user-2',
		sellerUsername: 'ActionAce',
		startingPrice: 12000,
		currentBid: 18500,
		bids: [
			{ id: 'bid-12', listingId: 'listing-5', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 12000, timestamp: Date.now() - 345600000 },
			{ id: 'bid-18', listingId: 'listing-5', bidderId: 'user-4', bidderUsername: 'LEGOEnthusiast', amount: 18500, timestamp: Date.now() - 5400000 }
		],
		endTime: Date.now() + 216000000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-6',
		title: 'Vintage Monopoly Game (1935 First Edition)',
		description: 'Rare first edition Monopoly board game in original box with all pieces.',
		category: 'Board Games',
		condition: 'D',
		imageUrl: null,
		sellerId: 'user-3',
		sellerUsername: 'BoardGameBoss',
		startingPrice: 20000,
		currentBid: 28000,
		bids: [
			{ id: 'bid-3', listingId: 'listing-6', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 20000, timestamp: Date.now() - 432000000 },
			{ id: 'bid-19', listingId: 'listing-6', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 28000, timestamp: Date.now() - 2700000 }
		],
		endTime: Date.now() + 64800000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-7',
		title: 'LEGO Technic Ferrari LaFerrari',
		description: 'Advanced LEGO Technic set, 100% complete with all original packaging.',
		category: 'LEGO Sets',
		condition: 'A',
		imageUrl: null,
		sellerId: 'user-4',
		sellerUsername: 'LEGOEnthusiast',
		startingPrice: 6500,
		currentBid: 9200,
		bids: [
			{ id: 'bid-9', listingId: 'listing-7', bidderId: 'user-3', bidderUsername: 'BoardGameBoss', amount: 6500, timestamp: Date.now() - 259200000 },
			{ id: 'bid-20', listingId: 'listing-7', bidderId: 'user-5', bidderUsername: 'PlushPerfect', amount: 9200, timestamp: Date.now() - 14400000 }
		],
		endTime: Date.now() + 302400000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-8',
		title: 'LEGO Harry Potter Hogwarts Castle',
		description: 'Set 71043, 6,000+ pieces, brand new sealed in box.',
		category: 'LEGO Sets',
		condition: 'A',
		imageUrl: null,
		sellerId: 'user-4',
		sellerUsername: 'LEGOEnthusiast',
		startingPrice: 7000,
		currentBid: 10500,
		bids: [
			{ id: 'bid-21', listingId: 'listing-8', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 7000, timestamp: Date.now() - 518400000 },
			{ id: 'bid-22', listingId: 'listing-8', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 10500, timestamp: Date.now() - 18000000 }
		],
		endTime: Date.now() + 388800000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-9',
		title: 'Steiff Teddy Bear (1920s)',
		description: 'Authentic Steiff teddy bear from the 1920s with button in ear. Excellent condition.',
		category: 'Plush Toys',
		condition: 'B',
		imageUrl: null,
		sellerId: 'user-5',
		sellerUsername: 'PlushPerfect',
		startingPrice: 9000,
		currentBid: 14200,
		bids: [
			{ id: 'bid-4', listingId: 'listing-9', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 9000, timestamp: Date.now() - 172800000 },
			{ id: 'bid-23', listingId: 'listing-9', bidderId: 'user-3', bidderUsername: 'BoardGameBoss', amount: 14200, timestamp: Date.now() - 11700000 }
		],
		endTime: Date.now() + 446400000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-10',
		title: 'Pokemon Base Set Booster Box (1999)',
		description: 'Sealed 1999 Pokemon Base Set booster box with original wrapping.',
		category: 'Board Games',
		condition: 'A',
		imageUrl: null,
		sellerId: 'user-5',
		sellerUsername: 'PlushPerfect',
		startingPrice: 35000,
		currentBid: 52000,
		bids: [
			{ id: 'bid-5', listingId: 'listing-10', bidderId: 'user-4', bidderUsername: 'LEGOEnthusiast', amount: 35000, timestamp: Date.now() - 604800000 },
			{ id: 'bid-24', listingId: 'listing-10', bidderId: 'user-2', bidderUsername: 'ActionAce', amount: 52000, timestamp: Date.now() - 25200000 }
		],
		endTime: Date.now() + 172800000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-11',
		title: 'Barbie #1 Ponytail Doll (1959)',
		description: 'Original #1 Barbie in black and white striped swimsuit with box.',
		category: 'Action Figures',
		condition: 'C',
		imageUrl: null,
		sellerId: 'user-3',
		sellerUsername: 'BoardGameBoss',
		startingPrice: 22000,
		currentBid: 31500,
		bids: [
			{ id: 'bid-10', listingId: 'listing-11', bidderId: 'user-5', bidderUsername: 'PlushPerfect', amount: 22000, timestamp: Date.now() - 432000000 },
			{ id: 'bid-25', listingId: 'listing-11', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 31500, timestamp: Date.now() - 8100000 }
		],
		endTime: Date.now() + 93600000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	},
	{
		id: 'listing-12',
		title: 'Furby Electronic Toy (1998 Original)',
		description: 'Original 1998 Furby in working condition. Classic retro tech collectible.',
		category: 'Plush Toys',
		condition: 'B',
		imageUrl: null,
		sellerId: 'user-2',
		sellerUsername: 'ActionAce',
		startingPrice: 3000,
		currentBid: 5400,
		bids: [
			{ id: 'bid-26', listingId: 'listing-12', bidderId: 'user-5', bidderUsername: 'PlushPerfect', amount: 3000, timestamp: Date.now() - 86400000 },
			{ id: 'bid-27', listingId: 'listing-12', bidderId: 'user-1', bidderUsername: 'ToyCollector', amount: 5400, timestamp: Date.now() - 6300000 }
		],
		endTime: Date.now() + 129600000,
		status: 'active',
		priceHistory: generateMockPriceHistory()
	}
];

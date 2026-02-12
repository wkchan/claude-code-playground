import { MOCK_LISTINGS } from '../data/listings.js';
import type { ToyListing, CreateListingInput, Bid } from '../types/index.js';
import { generateMockPriceHistory } from '../utils/chart.js';

let listings = $state<ToyListing[]>(MOCK_LISTINGS);
let nextListingId = 13;
let nextBidId = 28;

export function getListings(): ToyListing[] {
	return listings;
}

export function getListingById(id: string): ToyListing | undefined {
	return listings.find((l) => l.id === id);
}

export function placeBid(listingId: string, bidderId: string, bidderUsername: string, amount: number): boolean {
	const listing = listings.find((l) => l.id === listingId);
	if (!listing || listing.status !== 'active') return false;
	if (amount <= listing.currentBid) return false;

	// Add bid to listing
	const newBid: Bid = {
		id: `bid-${nextBidId++}`,
		listingId,
		bidderId,
		bidderUsername,
		amount,
		timestamp: Date.now()
	};

	listing.bids.push(newBid);
	listing.currentBid = amount;

	return true;
}

export function createListing(input: CreateListingInput, sellerId: string, sellerUsername: string): ToyListing {
	const newListing: ToyListing = {
		id: `listing-${nextListingId++}`,
		title: input.title,
		description: input.description,
		category: input.category,
		condition: input.condition,
		imageUrl: null,
		sellerId,
		sellerUsername,
		startingPrice: input.startingPrice,
		currentBid: input.startingPrice,
		bids: [],
		endTime: Date.now() + input.durationHours * 3600000,
		status: 'active',
		priceHistory: generateMockPriceHistory(input.startingPrice)
	};

	listings.unshift(newListing);
	return newListing;
}

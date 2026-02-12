import { getListings } from './listings.svelte.js';
import { currentUser } from './user.svelte.js';
import type { Bid } from '../types/index.js';

export function getUserBids(): Bid[] {
	const listings = getListings();
	const userBids: Bid[] = [];

	for (const listing of listings) {
		for (const bid of listing.bids) {
			if (bid.bidderId === currentUser.id) {
				userBids.push(bid);
			}
		}
	}

	return userBids.sort((a, b) => b.timestamp - a.timestamp);
}

export function getUserBidsForListing(listingId: string): Bid[] {
	const listings = getListings();
	const listing = listings.find((l) => l.id === listingId);
	if (!listing) return [];

	return listing.bids.filter((bid) => bid.bidderId === currentUser.id);
}

export function getWinningBidForListing(listingId: string): Bid | undefined {
	const listings = getListings();
	const listing = listings.find((l) => l.id === listingId);
	if (!listing || listing.bids.length === 0) return undefined;

	// The bid with the highest amount is the winning bid
	return listing.bids.reduce((max, bid) => (bid.amount > max.amount ? bid : max));
}

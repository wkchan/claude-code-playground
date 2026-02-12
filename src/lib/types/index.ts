export type ConditionGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type ListingStatus = 'active' | 'ended' | 'cancelled';

export interface PriceHistoryPoint {
	timestamp: number;
	price: number;
	volume: number;
}

export interface Bid {
	id: string;
	listingId: string;
	bidderId: string;
	bidderUsername: string;
	amount: number;
	timestamp: number;
}

export interface User {
	id: string;
	username: string;
	avatarUrl: string | null;
	listingIds: string[];
	bidIds: string[];
}

export interface ToyListing {
	id: string;
	title: string;
	description: string;
	category: string;
	condition: ConditionGrade;
	imageUrl: string | null;
	sellerId: string;
	sellerUsername: string;
	startingPrice: number;
	currentBid: number;
	bids: Bid[];
	endTime: number;
	status: ListingStatus;
	priceHistory: PriceHistoryPoint[];
}

export interface CreateListingInput {
	title: string;
	description: string;
	category: string;
	condition: ConditionGrade;
	startingPrice: number;
	durationHours: number;
}

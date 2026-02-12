import type { User } from '../types/index.js';

export const MOCK_USERS: User[] = [
	{
		id: 'user-1',
		username: 'ToyCollector',
		avatarUrl: null,
		listingIds: ['listing-1', 'listing-2', 'listing-3'],
		bidIds: ['bid-7', 'bid-15']
	},
	{
		id: 'user-2',
		username: 'ActionAce',
		avatarUrl: null,
		listingIds: ['listing-4', 'listing-5'],
		bidIds: ['bid-1', 'bid-8', 'bid-12']
	},
	{
		id: 'user-3',
		username: 'BoardGameBoss',
		avatarUrl: null,
		listingIds: ['listing-6'],
		bidIds: ['bid-3', 'bid-5', 'bid-11']
	},
	{
		id: 'user-4',
		username: 'LEGOEnthusiast',
		avatarUrl: null,
		listingIds: ['listing-7', 'listing-8'],
		bidIds: ['bid-2', 'bid-9', 'bid-13']
	},
	{
		id: 'user-5',
		username: 'PlushPerfect',
		avatarUrl: null,
		listingIds: ['listing-9'],
		bidIds: ['bid-4', 'bid-10']
	}
];

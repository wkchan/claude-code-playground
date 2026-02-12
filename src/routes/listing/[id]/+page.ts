import { error } from '@sveltejs/kit';
import { getListingById } from '$lib/stores/listings.svelte.js';

export function load({ params }) {
	const listing = getListingById(params.id);

	if (!listing) {
		error(404, 'Listing not found');
	}

	return { listing };
}

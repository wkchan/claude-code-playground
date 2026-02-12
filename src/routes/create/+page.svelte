<script lang="ts">
	import { goto } from '$app/navigation';
	import CreateListingForm from '../../lib/components/forms/CreateListingForm.svelte';

	function handleSuccess(listingId: string) {
		goto(`/listing/${listingId}`);
	}
</script>

<div class="max-w-2xl">
	<h1 class="text-4xl font-bold text-white mb-2">Create a Listing</h1>
	<p class="text-slate-400 mb-8">List a toy for auction and find your next collector.</p>

	<div class="bg-slate-900 border border-slate-800 rounded-xl p-6">
		<CreateListingForm onSuccess={handleSuccess} />
	</div>
</div>

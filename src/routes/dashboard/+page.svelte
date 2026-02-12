<script lang="ts">
	import MyListings from '../../lib/components/dashboard/MyListings.svelte';
	import MyBids from '../../lib/components/dashboard/MyBids.svelte';

	let activeTab = $state<'listings' | 'bids'>('listings');
</script>

<div>
	<h1 class="text-4xl font-bold text-white mb-8">Dashboard</h1>

	<!-- Tab Navigation -->
	<div class="flex gap-2 mb-8 border-b border-slate-800">
		<button
			onclick={() => (activeTab = 'listings')}
			class="{activeTab === 'listings'
				? 'border-b-2 border-amber-500 text-white'
				: 'text-slate-400 hover:text-white'} px-4 py-3 font-medium transition"
		>
			My Listings
		</button>
		<button
			onclick={() => (activeTab = 'bids')}
			class="{activeTab === 'bids'
				? 'border-b-2 border-amber-500 text-white'
				: 'text-slate-400 hover:text-white'} px-4 py-3 font-medium transition"
		>
			My Bids
		</button>
	</div>

	<!-- Tab Content -->
	<div>
		{#if activeTab === 'listings'}
			<MyListings />
		{:else}
			<MyBids />
		{/if}
	</div>
</div>

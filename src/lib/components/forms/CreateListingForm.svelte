<script lang="ts">
	import { CATEGORIES } from '../../data/categories.js';
	import type { ConditionGrade, CreateListingInput } from '../../types/index.js';
	import { createListing } from '../../stores/listings.svelte.js';
	import { currentUser } from '../../stores/user.svelte.js';

	interface Props {
		onSuccess?: (listingId: string) => void;
	}

	const { onSuccess } = $props();

	const conditions: ConditionGrade[] = ['A', 'B', 'C', 'D', 'F'];

	let formData = $state<Partial<CreateListingInput>>({
		title: '',
		description: '',
		category: CATEGORIES[0],
		condition: 'A',
		startingPrice: 0,
		durationHours: 24
	});

	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);

	function validateForm(): boolean {
		const newErrors: Record<string, string> = {};

		if (!formData.title?.trim()) newErrors.title = 'Title is required';
		if (!formData.description?.trim()) newErrors.description = 'Description is required';
		if (!formData.startingPrice || formData.startingPrice <= 0) newErrors.startingPrice = 'Price must be greater than 0';
		if (!formData.durationHours || formData.durationHours <= 0) newErrors.durationHours = 'Duration must be greater than 0';

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit() {
		if (!validateForm()) return;

		isSubmitting = true;

		try {
			const input: CreateListingInput = {
				title: formData.title!,
				description: formData.description!,
				category: formData.category!,
				condition: formData.condition as ConditionGrade,
				startingPrice: formData.startingPrice!,
				durationHours: formData.durationHours!
			};

			const newListing = createListing(input, currentUser.id, currentUser.username);
			onSuccess?.(newListing.id);
		} finally {
			isSubmitting = false;
		}
	}
</script>

<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
	<!-- Title -->
	<div>
		<label for="title" class="block text-sm font-medium text-white mb-2">
			Title <span class="text-red-400">*</span>
		</label>
		<input
			id="title"
			type="text"
			bind:value={formData.title}
			placeholder="e.g., Vintage Star Wars Action Figures"
			class="w-full bg-slate-800 border {errors.title
				? 'border-red-500'
				: 'border-slate-700'} rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
		/>
		{#if errors.title}
			<p class="text-red-400 text-xs mt-1">{errors.title}</p>
		{/if}
	</div>

	<!-- Description -->
	<div>
		<label for="description" class="block text-sm font-medium text-white mb-2">
			Description <span class="text-red-400">*</span>
		</label>
		<textarea
			id="description"
			bind:value={formData.description}
			placeholder="Describe the condition, features, and any defects..."
			rows="5"
			class="w-full bg-slate-800 border {errors.description
				? 'border-red-500'
				: 'border-slate-700'} rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
		></textarea>
		{#if errors.description}
			<p class="text-red-400 text-xs mt-1">{errors.description}</p>
		{/if}
	</div>

	<!-- Category and Condition -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		<div>
			<label for="category" class="block text-sm font-medium text-white mb-2">
				Category <span class="text-red-400">*</span>
			</label>
			<select
				id="category"
				bind:value={formData.category}
				class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
			>
				{#each CATEGORIES as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="condition" class="block text-sm font-medium text-white mb-2">
				Condition <span class="text-red-400">*</span>
			</label>
			<select
				id="condition"
				bind:value={formData.condition}
				class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
			>
				{#each conditions as condition}
					<option value={condition}>Grade {condition}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Price and Duration -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
		<div>
			<label for="price" class="block text-sm font-medium text-white mb-2">
				Starting Price (cents) <span class="text-red-400">*</span>
			</label>
			<input
				id="price"
				type="number"
				bind:value={formData.startingPrice}
				placeholder="e.g., 1000 for $10.00"
				class="w-full bg-slate-800 border {errors.startingPrice
					? 'border-red-500'
					: 'border-slate-700'} rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
			/>
			{#if errors.startingPrice}
				<p class="text-red-400 text-xs mt-1">{errors.startingPrice}</p>
			{/if}
		</div>

		<div>
			<label for="duration" class="block text-sm font-medium text-white mb-2">
				Auction Duration (hours) <span class="text-red-400">*</span>
			</label>
			<input
				id="duration"
				type="number"
				bind:value={formData.durationHours}
				placeholder="e.g., 24"
				class="w-full bg-slate-800 border {errors.durationHours
					? 'border-red-500'
					: 'border-slate-700'} rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
			/>
			{#if errors.durationHours}
				<p class="text-red-400 text-xs mt-1">{errors.durationHours}</p>
			{/if}
		</div>
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		disabled={isSubmitting}
		class="w-full {isSubmitting
			? 'bg-slate-700 text-slate-500 cursor-not-allowed'
			: 'bg-amber-500 hover:bg-amber-600 text-white'} font-medium py-3 rounded-lg transition"
	>
		{isSubmitting ? 'Creating Listing...' : 'Create Listing'}
	</button>
</form>

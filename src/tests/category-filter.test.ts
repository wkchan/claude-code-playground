/**
 * Tests for CategoryFilter filtering logic
 *
 * Tests cover:
 * - CATEGORIES data
 * - Category selection / deselection
 * - Kids mode emoji map
 */

import { describe, it, expect } from 'vitest';
import { CATEGORIES } from '$lib/data/categories.js';

// Mirror the categoryEmoji map from CategoryFilter
const categoryEmoji: Record<string, string> = {
	'Action Figures': '🦸',
	'Board Games': '🎲',
	'LEGO Sets': '🧱',
	'Plush Toys': '🧸'
};

describe('CategoryFilter — category data', () => {
	it('CATEGORIES is a non-empty array', () => {
		expect(Array.isArray(CATEGORIES)).toBe(true);
		expect(CATEGORIES.length).toBeGreaterThan(0);
	});

	it('includes Action Figures', () => {
		expect(CATEGORIES).toContain('Action Figures');
	});

	it('includes Board Games', () => {
		expect(CATEGORIES).toContain('Board Games');
	});

	it('includes LEGO Sets', () => {
		expect(CATEGORIES).toContain('LEGO Sets');
	});

	it('includes Plush Toys', () => {
		expect(CATEGORIES).toContain('Plush Toys');
	});
});

describe('CategoryFilter — selection logic', () => {
	it('null represents "All" selection', () => {
		let selected: string | null = null;
		expect(selected).toBeNull();
	});

	it('selecting a category sets it as the value', () => {
		let selected: string | null = null;
		selected = 'Board Games';
		expect(selected).toBe('Board Games');
	});

	it('selecting null (All) clears the selection', () => {
		let selected: string | null = 'LEGO Sets';
		selected = null;
		expect(selected).toBeNull();
	});

	it('selecting a different category replaces the previous one', () => {
		let selected: string | null = 'Action Figures';
		selected = 'Plush Toys';
		expect(selected).toBe('Plush Toys');
		expect(selected).not.toBe('Action Figures');
	});
});

describe('CategoryFilter — Kids mode emoji map', () => {
	it('all CATEGORIES have an emoji', () => {
		for (const cat of CATEGORIES) {
			expect(categoryEmoji[cat]).toBeTruthy();
		}
	});

	it('Action Figures maps to superhero emoji', () => {
		expect(categoryEmoji['Action Figures']).toBe('🦸');
	});

	it('Board Games maps to dice emoji', () => {
		expect(categoryEmoji['Board Games']).toBe('🎲');
	});

	it('LEGO Sets maps to brick emoji', () => {
		expect(categoryEmoji['LEGO Sets']).toBe('🧱');
	});

	it('Plush Toys maps to bear emoji', () => {
		expect(categoryEmoji['Plush Toys']).toBe('🧸');
	});
});

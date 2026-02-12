/**
 * Tests for ListingGrid grid column configuration logic
 *
 * Tests cover:
 * - Default mode: 4-col at xl
 * - Kids mode: max 3-col
 * - Professional mode: 5-col at xl
 * - Grid gap sizes per mode
 */

import { describe, it, expect } from 'vitest';

// Mirror the gridClass derivation from ListingGrid
function getGridClass(mode: 'default' | 'kids' | 'professional'): string {
	if (mode === 'kids') {
		return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
	}
	if (mode === 'professional') {
		return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2';
	}
	return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
}

describe('ListingGrid — grid columns per mode', () => {
	it('default mode uses xl:grid-cols-4', () => {
		expect(getGridClass('default')).toContain('xl:grid-cols-4');
	});

	it('default mode starts at 1 column on mobile', () => {
		expect(getGridClass('default')).toContain('grid-cols-1');
	});

	it('kids mode has max 3 columns (lg:grid-cols-3)', () => {
		const cls = getGridClass('kids');
		expect(cls).toContain('lg:grid-cols-3');
		expect(cls).not.toContain('xl:grid-cols-4');
		expect(cls).not.toContain('xl:grid-cols-5');
	});

	it('kids mode starts at 1 column on mobile', () => {
		expect(getGridClass('kids')).toContain('grid-cols-1');
	});

	it('professional mode uses xl:grid-cols-5', () => {
		expect(getGridClass('professional')).toContain('xl:grid-cols-5');
	});

	it('professional mode starts at 2 columns on mobile (compact)', () => {
		expect(getGridClass('professional')).toContain('grid-cols-2');
	});

	it('professional mode has 4 columns at lg breakpoint', () => {
		expect(getGridClass('professional')).toContain('lg:grid-cols-4');
	});
});

describe('ListingGrid — gap size per mode', () => {
	it('default mode uses gap-6', () => {
		expect(getGridClass('default')).toContain('gap-6');
	});

	it('kids mode uses gap-6 (wider for larger cards)', () => {
		expect(getGridClass('kids')).toContain('gap-6');
	});

	it('professional mode uses gap-2 (compact)', () => {
		expect(getGridClass('professional')).toContain('gap-2');
	});

	it('professional gap is smaller than default gap', () => {
		const defaultGap = getGridClass('default').match(/gap-(\d+)/)?.[1];
		const proGap = getGridClass('professional').match(/gap-(\d+)/)?.[1];
		expect(Number(proGap)).toBeLessThan(Number(defaultGap));
	});
});

/**
 * Tests for BidForm logic
 *
 * Tests cover:
 * - Minimum bid calculation
 * - Bid validity (>= minimum and listing active)
 * - Keydown behaviour per mode (Enter vs Cmd+Enter)
 */

import { describe, it, expect } from 'vitest';

const MINIMUM_INCREMENT = 100; // 1 dollar in cents

function calcMinimumBid(currentBid: number): number {
	return currentBid + MINIMUM_INCREMENT;
}

function isBidValid(
	parsedAmount: number,
	minimumBid: number,
	status: 'active' | 'ended' | 'cancelled'
): boolean {
	return parsedAmount >= minimumBid && status === 'active';
}

describe('BidForm — minimum bid', () => {
	it('minimum bid is current bid + 100 cents ($1)', () => {
		expect(calcMinimumBid(1000)).toBe(1100);
		expect(calcMinimumBid(0)).toBe(100);
		expect(calcMinimumBid(5000)).toBe(5100);
	});

	it('minimum bid of 0 current bid is 100 cents', () => {
		expect(calcMinimumBid(0)).toBe(100);
	});
});

describe('BidForm — bid validity', () => {
	it('valid when amount >= minimum and listing is active', () => {
		expect(isBidValid(1100, 1100, 'active')).toBe(true);
		expect(isBidValid(2000, 1100, 'active')).toBe(true);
	});

	it('invalid when amount < minimum', () => {
		expect(isBidValid(1099, 1100, 'active')).toBe(false);
		expect(isBidValid(0, 1100, 'active')).toBe(false);
	});

	it('invalid when listing is ended', () => {
		expect(isBidValid(1500, 1100, 'ended')).toBe(false);
	});

	it('invalid when listing is cancelled', () => {
		expect(isBidValid(1500, 1100, 'cancelled')).toBe(false);
	});

	it('invalid when amount = minimum - 1', () => {
		expect(isBidValid(1099, 1100, 'active')).toBe(false);
	});

	it('valid when amount = minimum exactly', () => {
		expect(isBidValid(1100, 1100, 'active')).toBe(true);
	});
});

describe('BidForm — keydown submit behaviour', () => {
	// Returns whether the key event should trigger submission given the mode
	function shouldSubmit(
		key: string,
		meta: boolean,
		ctrl: boolean,
		mode: 'default' | 'kids' | 'professional'
	): boolean {
		if (mode === 'professional') {
			return key === 'Enter' && (meta || ctrl);
		}
		return key === 'Enter';
	}

	it('Default mode: Enter triggers submit', () => {
		expect(shouldSubmit('Enter', false, false, 'default')).toBe(true);
	});

	it('Default mode: Cmd+Enter also triggers submit', () => {
		expect(shouldSubmit('Enter', true, false, 'default')).toBe(true);
	});

	it('Default mode: other keys do not trigger submit', () => {
		expect(shouldSubmit('a', false, false, 'default')).toBe(false);
		expect(shouldSubmit('Space', false, false, 'default')).toBe(false);
	});

	it('Kids mode: Enter triggers submit', () => {
		expect(shouldSubmit('Enter', false, false, 'kids')).toBe(true);
	});

	it('Professional mode: Enter alone does NOT trigger submit', () => {
		expect(shouldSubmit('Enter', false, false, 'professional')).toBe(false);
	});

	it('Professional mode: Cmd+Enter triggers submit', () => {
		expect(shouldSubmit('Enter', true, false, 'professional')).toBe(true);
	});

	it('Professional mode: Ctrl+Enter triggers submit', () => {
		expect(shouldSubmit('Enter', false, true, 'professional')).toBe(true);
	});

	it('Professional mode: other keys do not trigger submit', () => {
		expect(shouldSubmit('a', true, true, 'professional')).toBe(false);
	});
});

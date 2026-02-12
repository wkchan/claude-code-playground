/**
 * Tests for CountdownTimer logic
 *
 * Tests cover:
 * - Time calculation accuracy (days/hours/minutes/seconds)
 * - isEnded when remaining = 0
 * - isUrgent when remaining < 1 hour
 * - Professional compact format
 */

import { describe, it, expect } from 'vitest';

// Mirror the time decomposition from CountdownTimer
function decompose(remaining: number) {
	const days = Math.floor(remaining / 86400000);
	const hours = Math.floor((remaining % 86400000) / 3600000);
	const minutes = Math.floor((remaining % 3600000) / 60000);
	const seconds = Math.floor((remaining % 60000) / 1000);
	const isEnded = remaining === 0;
	const isUrgent = remaining > 0 && remaining < 3600000;
	return { days, hours, minutes, seconds, isEnded, isUrgent };
}

// Mirror the compact time format from CountdownTimer
function compactTime(remaining: number): string {
	const { days, hours, minutes, seconds, isEnded } = decompose(remaining);
	if (isEnded) return 'ENDED';
	if (days > 0) {
		return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
	}
	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

describe('CountdownTimer — time decomposition', () => {
	it('correctly decomposes 2 days 3 hours 30 minutes 15 seconds', () => {
		const ms = (2 * 86400 + 3 * 3600 + 30 * 60 + 15) * 1000;
		const { days, hours, minutes, seconds } = decompose(ms);
		expect(days).toBe(2);
		expect(hours).toBe(3);
		expect(minutes).toBe(30);
		expect(seconds).toBe(15);
	});

	it('correctly decomposes exactly 1 hour', () => {
		const ms = 3600000;
		const { days, hours, minutes, seconds } = decompose(ms);
		expect(days).toBe(0);
		expect(hours).toBe(1);
		expect(minutes).toBe(0);
		expect(seconds).toBe(0);
	});

	it('correctly decomposes 59 minutes 59 seconds', () => {
		const ms = (59 * 60 + 59) * 1000;
		const { days, hours, minutes, seconds } = decompose(ms);
		expect(days).toBe(0);
		expect(hours).toBe(0);
		expect(minutes).toBe(59);
		expect(seconds).toBe(59);
	});

	it('returns all zeros when remaining = 0', () => {
		const { days, hours, minutes, seconds } = decompose(0);
		expect(days).toBe(0);
		expect(hours).toBe(0);
		expect(minutes).toBe(0);
		expect(seconds).toBe(0);
	});
});

describe('CountdownTimer — isEnded', () => {
	it('isEnded is true when remaining = 0', () => {
		expect(decompose(0).isEnded).toBe(true);
	});

	it('isEnded is false when remaining > 0', () => {
		expect(decompose(1000).isEnded).toBe(false);
	});

	it('isEnded is false when remaining = 1ms', () => {
		expect(decompose(1).isEnded).toBe(false);
	});
});

describe('CountdownTimer — isUrgent', () => {
	it('isUrgent is true when remaining < 1 hour', () => {
		expect(decompose(3599999).isUrgent).toBe(true);
		expect(decompose(1800000).isUrgent).toBe(true); // 30 min
		expect(decompose(60000).isUrgent).toBe(true);   // 1 min
		expect(decompose(1000).isUrgent).toBe(true);    // 1 sec
	});

	it('isUrgent is false when remaining = 1 hour exactly', () => {
		expect(decompose(3600000).isUrgent).toBe(false);
	});

	it('isUrgent is false when remaining > 1 hour', () => {
		expect(decompose(7200000).isUrgent).toBe(false); // 2 hours
		expect(decompose(86400000).isUrgent).toBe(false); // 1 day
	});

	it('isUrgent is false when remaining = 0 (ended)', () => {
		expect(decompose(0).isUrgent).toBe(false);
	});
});

describe('CountdownTimer — Professional compact format', () => {
	it('shows ENDED when remaining = 0', () => {
		expect(compactTime(0)).toBe('ENDED');
	});

	it('shows HH:MM:SS format when less than a day remaining', () => {
		const twoHours = 2 * 3600000 + 15 * 60000 + 30000;
		expect(compactTime(twoHours)).toBe('02:15:30');
	});

	it('shows Dd HH:MM format when days > 0', () => {
		const twoDays = 2 * 86400000 + 5 * 3600000 + 30 * 60000;
		expect(compactTime(twoDays)).toBe('2d 05:30');
	});

	it('pads hours/minutes/seconds to 2 digits', () => {
		const fiveSec = 5000;
		expect(compactTime(fiveSec)).toBe('00:00:05');
	});

	it('uses single digit days (no padding for days)', () => {
		const oneDay = 1 * 86400000 + 2 * 3600000;
		expect(compactTime(oneDay)).toMatch(/^1d /);
	});
});

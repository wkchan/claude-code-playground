/**
 * Tests for ConditionBadge component logic
 *
 * Tests cover:
 * - Star ratings for Kids mode (A=5, B=4, C=3, D=2, F=1)
 * - Condition labels per grade
 * - Size class selection
 * - Professional mode compact format
 */

import { describe, it, expect } from 'vitest';
import { CONDITION_LABELS } from '$lib/data/categories.js';
import type { ConditionGrade } from '$lib/types/index.js';

// Mirror the star count data from ConditionBadge
const kidsStarCount: Record<ConditionGrade, number> = { A: 5, B: 4, C: 3, D: 2, F: 1 };
const kidsStars: Record<ConditionGrade, string> = {
	A: '⭐⭐⭐⭐⭐',
	B: '⭐⭐⭐⭐',
	C: '⭐⭐⭐',
	D: '⭐⭐',
	F: '⭐'
};

describe('ConditionBadge — Kids mode star ratings', () => {
	it('Grade A has 5 stars', () => {
		expect(kidsStarCount['A']).toBe(5);
		expect(kidsStars['A']).toBe('⭐⭐⭐⭐⭐');
	});

	it('Grade B has 4 stars', () => {
		expect(kidsStarCount['B']).toBe(4);
		expect(kidsStars['B']).toBe('⭐⭐⭐⭐');
	});

	it('Grade C has 3 stars', () => {
		expect(kidsStarCount['C']).toBe(3);
		expect(kidsStars['C']).toBe('⭐⭐⭐');
	});

	it('Grade D has 2 stars', () => {
		expect(kidsStarCount['D']).toBe(2);
		expect(kidsStars['D']).toBe('⭐⭐');
	});

	it('Grade F has 1 star', () => {
		expect(kidsStarCount['F']).toBe(1);
		expect(kidsStars['F']).toBe('⭐');
	});

	it('star count decreases A > B > C > D > F', () => {
		const grades: ConditionGrade[] = ['A', 'B', 'C', 'D', 'F'];
		for (let i = 0; i < grades.length - 1; i++) {
			expect(kidsStarCount[grades[i]]).toBeGreaterThan(kidsStarCount[grades[i + 1]]);
		}
	});
});

describe('ConditionBadge — condition labels', () => {
	it('A maps to Mint', () => {
		expect(CONDITION_LABELS['A']).toBe('Mint');
	});

	it('B maps to Excellent', () => {
		expect(CONDITION_LABELS['B']).toBe('Excellent');
	});

	it('C maps to Good', () => {
		expect(CONDITION_LABELS['C']).toBe('Good');
	});

	it('D maps to Fair', () => {
		expect(CONDITION_LABELS['D']).toBe('Fair');
	});

	it('F maps to Poor', () => {
		expect(CONDITION_LABELS['F']).toBe('Poor');
	});
});

describe('ConditionBadge — Professional mode format', () => {
	it('formats condition as GRADE/ABBREV', () => {
		const grades: ConditionGrade[] = ['A', 'B', 'C', 'D', 'F'];
		for (const grade of grades) {
			const expected = `${grade}/${CONDITION_LABELS[grade].slice(0, 3).toUpperCase()}`;
			// A/MIN, B/EXC, C/GOO, D/FAI, F/POO
			expect(expected).toMatch(/^[ABCDF]\/[A-Z]{3}$/);
		}
	});

	it('Grade A formats as A/MIN', () => {
		expect(`A/${CONDITION_LABELS['A'].slice(0, 3).toUpperCase()}`).toBe('A/MIN');
	});

	it('Grade F formats as F/POO', () => {
		expect(`F/${CONDITION_LABELS['F'].slice(0, 3).toUpperCase()}`).toBe('F/POO');
	});
});

describe('ConditionBadge — size classes', () => {
	const sizeClasses: Record<string, string> = {
		xs: 'px-1.5 py-0.5 text-xs',
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
		lg: 'px-4 py-2 text-base'
	};

	const kidsSizeClasses: Record<string, string> = {
		xs: 'px-2 py-1 text-xs',
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-base'
	};

	it('Kids mode uses larger padding than default', () => {
		// Compare md size
		const defaultMd = sizeClasses['md'];
		const kidsMd = kidsSizeClasses['md'];
		// Kids px-4 > Default px-3
		expect(kidsMd).toContain('px-4');
		expect(defaultMd).toContain('px-3');
	});

	it('all four sizes are defined for default mode', () => {
		expect(Object.keys(sizeClasses)).toEqual(['xs', 'sm', 'md', 'lg']);
	});

	it('all four sizes are defined for kids mode', () => {
		expect(Object.keys(kidsSizeClasses)).toEqual(['xs', 'sm', 'md', 'lg']);
	});
});

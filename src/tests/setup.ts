import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = (() => {
	let store: Record<string, string> = {};
	return {
		getItem: (key: string) => store[key] ?? null,
		setItem: (key: string, value: string) => { store[key] = value; },
		removeItem: (key: string) => { delete store[key]; },
		clear: () => { store = {}; },
		get length() { return Object.keys(store).length; },
		key: (index: number) => Object.keys(store)[index] ?? null
	};
})();

Object.defineProperty(globalThis, 'localStorage', {
	value: localStorageMock,
	writable: true
});

// Mock document.documentElement.setAttribute for layout effects
const originalSetAttribute = Element.prototype.setAttribute;
Element.prototype.setAttribute = function(name: string, value: string) {
	return originalSetAttribute.call(this, name, value);
};

/**
 * Theme store for Toy Exchange
 * Manages the active display mode: 'default' | 'kids' | 'professional'
 * Persists selection to localStorage.
 */

export type ThemeMode = 'default' | 'kids' | 'professional';

const STORAGE_KEY = 'toy-exchange-theme';
const VALID_MODES: ThemeMode[] = ['default', 'kids', 'professional'];

function loadFromStorage(): ThemeMode {
	if (typeof localStorage === 'undefined') return 'default';
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored && VALID_MODES.includes(stored as ThemeMode)) {
		return stored as ThemeMode;
	}
	return 'default';
}

/** The current active theme mode. */
export const themeMode = $state<{ current: ThemeMode }>({ current: loadFromStorage() });

/**
 * Set the active theme mode and persist it to localStorage.
 */
export function setThemeMode(mode: ThemeMode): void {
	themeMode.current = mode;
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem(STORAGE_KEY, mode);
	}
}

/**
 * useTheme hook — returns the current mode and a setter.
 * Use inside Svelte components.
 */
export function useTheme() {
	return {
		get mode() {
			return themeMode.current;
		},
		setMode: setThemeMode,
		get isDefault() {
			return themeMode.current === 'default';
		},
		get isKids() {
			return themeMode.current === 'kids';
		},
		get isProfessional() {
			return themeMode.current === 'professional';
		}
	};
}

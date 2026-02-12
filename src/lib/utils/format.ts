/**
 * Format cents as currency
 */
export function formatCents(cents: number): string {
	const dollars = cents / 100;
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(dollars);
}

/**
 * Format timestamp as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
	const now = Date.now();
	const diff = now - timestamp;

	const minutes = Math.floor(diff / 60000);
	if (minutes < 1) return 'just now';
	if (minutes < 60) return `${minutes}m ago`;

	const hours = Math.floor(diff / 3600000);
	if (hours < 24) return `${hours}h ago`;

	const days = Math.floor(diff / 86400000);
	if (days < 7) return `${days}d ago`;

	const weeks = Math.floor(diff / 604800000);
	if (weeks < 4) return `${weeks}w ago`;

	const months = Math.floor(diff / 2592000000);
	return `${months}mo ago`;
}

/**
 * Format end time as countdown (e.g., "2d 5h 30m")
 */
export function formatEndTime(endTime: number): string {
	const now = Date.now();
	const remaining = Math.max(0, endTime - now);

	const days = Math.floor(remaining / 86400000);
	const hours = Math.floor((remaining % 86400000) / 3600000);
	const minutes = Math.floor((remaining % 3600000) / 60000);

	if (remaining === 0) return 'Ended';

	const parts = [];
	if (days > 0) parts.push(`${days}d`);
	if (hours > 0 || days > 0) parts.push(`${hours}h`);
	if (minutes > 0 || (hours > 0 && days === 0)) parts.push(`${minutes}m`);

	return parts.join(' ');
}

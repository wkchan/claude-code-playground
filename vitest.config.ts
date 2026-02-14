import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
	plugins: [
		svelte({ hot: !process.env.VITEST })
	],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts'],
		include: ['src/tests/**/*.{test,spec}.{ts,js}']
	},
	resolve: {
		conditions: ['browser'],
		alias: {
			'$lib': path.resolve('./src/lib'),
			'$app': path.resolve('./src/app')
		}
	}
});

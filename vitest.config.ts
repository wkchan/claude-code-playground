import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({ hot: !process.env.VITEST })
	],
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./src/tests/setup.ts'],
		include: ['src/tests/**/*.{test,spec}.{ts,js}'],
		alias: {
			'$lib': '/Users/Linus/tmp/claude-demo/toy-exchange/src/lib',
			'$app': '/Users/Linus/tmp/claude-demo/toy-exchange/src/app'
		}
	},
	resolve: {
		conditions: ['browser']
	}
});

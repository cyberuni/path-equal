import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**/*.spec.ts'],
		coverage: {
			provider: 'v8',
			include: ['src/**/*.ts'],
			exclude: ['src/**/*.spec.ts'],
			reporter: ['text', 'lcov'],
			// The suite already covers every line and branch. Enforcing that is the point —
			// a coverage report nobody gates on only tells you after the fact.
			thresholds: {
				branches: 100,
				functions: 100,
				lines: 100,
				statements: 100,
			},
		},
	},
})

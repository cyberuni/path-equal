import { nodeTestPreset } from '@repobuddy/vitest/config/node'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	// The preset supplies the include and coverage globs. `includeGeneralTests`
	// picks up the plain `*.spec.ts` names this package uses — without it the
	// preset only matches the platform-suffixed `*.spec.node.ts` form.
	plugins: [nodeTestPreset({ includeGeneralTests: true })],
	test: {
		coverage: {
			provider: 'v8',
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

import { performance } from 'node:perf_hooks'
import { pathEqual as pathEqual128 } from 'path-equal-1.2.8'
import { pathEqual as pathEqualCurrent } from '../src/index.ts'

// Whole `pathEqual(a, b)` calls on a mix of typical pairs.
// v1.2.8 compares drive letters case-sensitively, so it returns false for the `C:\` drive pair.
const pairs = [
	['src/components/Button.tsx', 'src/components/Button.tsx'],
	['C:\\Users\\me\\proj\\a.ts', '/c/Users/me/proj/a.ts'],
	['a/b/../c', 'a/c'],
	['./x/y', 'x/y'],
	['node_modules/pkg/index.js', 'node_modules/pkg/index.js'],
]
const iterations = Number(process.argv.slice(2).find((arg) => arg !== '--')) || 1_000_000
const warmup = Math.min(iterations, 100_000)

function run(pathEqual, count) {
	let matches = 0
	for (let iteration = 0; iteration < count; iteration++) {
		const [a, b] = pairs[iteration % pairs.length]
		if (pathEqual(a, b)) matches++
	}
	return matches
}

for (const [name, pathEqual] of [
	['v1.2.8', pathEqual128],
	['current', pathEqualCurrent],
]) {
	if (name === 'current') {
		for (const [a, b] of pairs) {
			if (!pathEqual(a, b)) throw new Error(`${name}: expected ${a} and ${b} to be equal`)
		}
	}

	run(pathEqual, warmup)
	const start = performance.now()
	const matches = run(pathEqual, iterations)

	console.info(
		`${name}: ${(((performance.now() - start) * 1_000_000) / iterations).toFixed(1)} ns/call (${matches} matches)`,
	)
}

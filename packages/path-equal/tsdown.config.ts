import { writeFile } from 'node:fs/promises'
import { defineConfig } from 'tsdown'

// Two configs, one per format, because each needs its own `outDir` and `target`.
// The published paths (`esm/index.js`, `cjs/index.js`, and the `.d.ts` + `.d.ts.map`
// beside each) are the ones `tsc` used to emit — keep them byte-for-byte addressable
// or every consumer's deep import breaks.
//
// `outExtensions` is load-bearing: without it tsdown writes `.mjs` / `.d.mts`.
const shared = {
	entry: { index: 'ts/index.ts' },
	// Preserves the per-module shape `tsc` emitted, rather than bundling to one file.
	unbundle: true,
	dts: { sourcemap: true },
	outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
	// tsdown emits a JS sourcemap for the unbundled ESM output regardless of this flag.
	// Harmless: the TypeScript sources already ship in the tarball.
	sourcemap: false,
	clean: true,
} as const

export default defineConfig([
	{
		...shared,
		format: 'esm',
		outDir: 'esm',
		target: 'es2019',
	},
	{
		...shared,
		format: 'cjs',
		outDir: 'cjs',
		// rolldown's floor is ES2015; the old `tsc` CJS pass targeted ES5. Nothing in this
		// package needs the difference, and every runtime that can load a CJS module today
		// is well past ES2015 — noted as a patch-level change in the changeset.
		target: 'es2015',
		hooks: {
			// `copy`'s `to` is treated as a directory, so it cannot write this file.
			// A `"type": "module"` package needs it or the CJS output is parsed as ESM.
			'build:done': async () => {
				await writeFile('cjs/package.json', `${JSON.stringify({ type: 'commonjs' }, null, '\t')}\n`)
			},
		},
	},
])

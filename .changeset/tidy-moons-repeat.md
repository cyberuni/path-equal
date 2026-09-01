---
'path-equal': patch
---

Build the published `cjs/` and `esm/` output with tsdown instead of two `tsc` passes.

Every published path is unchanged (`esm/index.js`, `cjs/index.js`, the `.d.ts` and `.d.ts.map`
beside each, and `cjs/package.json`). Two things about the emitted output do change:

- The CJS build targets ES2015 rather than ES5. rolldown's floor is ES2015, and the only
  down-levelled syntax in this package is one arrow function.
- An `esm/index.js.map` now ships alongside the ESM output. The TypeScript sources already
  shipped, so this adds no information — only a working sourcemap.

Also points `homepage` and `repository` at the repository's current home, `cyberuni/path-equal`.

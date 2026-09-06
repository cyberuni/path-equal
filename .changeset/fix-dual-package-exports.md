---
'path-equal': patch
---

Serve CJS type declarations to CJS consumers.

The `exports` map carried one top-level `types` pointing at `./esm/index.d.ts`, and no `require` condition. A CommonJS consumer resolving under `node16`/`nodenext` was therefore handed the ESM declarations and told the package was ESM, failing with `TS1479: the referenced file is an ECMAScript module and cannot be imported with 'require'`.

Nothing was wrong with the emitted code — `cjs/package.json` already declares `{"type":"commonjs"}` and `cjs/index.d.ts` already shipped. The manifest simply never pointed at it. `moduleResolution: "node"` ignores `exports` maps entirely, which is why this went unnoticed.

`exports` now resolves `require` and `import` separately, each with the declarations that match its format, and the top-level `types` agrees with `main` instead of contradicting it.

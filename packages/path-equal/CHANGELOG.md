# path-equal

## 1.2.9

### Patch Changes

- 2e9e1ec: Fix several normalization inconsistencies:
  
  - Repeated separators always collapse (`a//b` equals `a/b`), and an empty path equals `.`.
  - A drive letter is recognized only at the start of a path and only when a separator or the end of the string follows it. Drive letters compare case-insensitively (`D:\foo` equals `/d/foo`). `c:foo` and `a:b` are no longer rewritten into `/cfoo` and `/ab`.
  - UNC paths (`\\server\share`) no longer equal `/server/share`.
- 6941df8: Correctly normalize path segments containing `-` and preserve leading `..` segments when comparing paths.
- d54fa3e: Move the TypeScript sources from `ts/` to `src/`.
  
  The published tarball and the JSR package now carry the sources under `src/`
  instead of `ts/`. The `exports` map is unchanged, so `import 'path-equal'` and
  `require('path-equal')` resolve exactly as before; only the path of the shipped
  `.ts` sources moved.
- 386b416: Include `CHANGELOG.md` in the published package.

## 1.2.8

### Patch Changes

- e2cb9c7: Serve CJS type declarations to CJS consumers.
  
  The `exports` map carried one top-level `types` pointing at `./esm/index.d.ts`, and no `require` condition. A CommonJS consumer resolving under `node16`/`nodenext` was therefore handed the ESM declarations and told the package was ESM, failing with `TS1479: the referenced file is an ECMAScript module and cannot be imported with 'require'`.
  
  Nothing was wrong with the emitted code — `cjs/package.json` already declares `{"type":"commonjs"}` and `cjs/index.d.ts` already shipped. The manifest simply never pointed at it. `moduleResolution: "node"` ignores `exports` maps entirely, which is why this went unnoticed.
  
  `exports` now resolves `require` and `import` separately, each with the declarations that match its format, and the top-level `types` agrees with `main` instead of contradicting it.

## 1.2.7

### Patch Changes

- 8403d02: Build the published `cjs/` and `esm/` output with tsdown instead of two `tsc` passes.
  
  Every published path is unchanged (`esm/index.js`, `cjs/index.js`, the `.d.ts` and `.d.ts.map`
  beside each, and `cjs/package.json`). Two things about the emitted output do change:
  
  - The CJS build targets ES2015 rather than ES5. rolldown's floor is ES2015, and the only
    down-levelled syntax in this package is one arrow function.
  - An `esm/index.js.map` now ships alongside the ESM output. The TypeScript sources already
    shipped, so this adds no information — only a working sourcemap.
  
  Also points `homepage` and `repository` at the repository's current home, `cyberuni/path-equal`.

## 1.2.6

### Patch Changes

- 0d4e3e1: Move the release pipeline to GitHub OIDC trusted publishing on `cyberuni`, removing the
  `NPM_TOKEN` and `CI_GITHUB_TOKEN` dependency, and point the package metadata at the new
  repository home.

## [1.2.5](https://github.com/unional/path-equal/compare/v1.2.4...v1.2.5) (2022-11-27)


### Bug Fixes

* remove extra files from distribution ([91f833c](https://github.com/unional/path-equal/commit/91f833c345eb784c56dabd30a48a45cfa4a8d991))

## [1.2.4](https://github.com/unional/path-equal/compare/v1.2.3...v1.2.4) (2022-10-28)


### Bug Fixes

* re-release ([f5b7099](https://github.com/unional/path-equal/commit/f5b7099d016d7f7bc262304875a21bc1f1aa545c))

## [1.2.3](https://github.com/unional/path-equal/compare/v1.2.2...v1.2.3) (2022-10-28)


### Bug Fixes

* husky should be in prepare step ([e2b807b](https://github.com/unional/path-equal/commit/e2b807bebfbaa33713b25564c0662181da1bdf5c)), closes [#78](https://github.com/unional/path-equal/issues/78)

## [1.2.2](https://github.com/unional/path-equal/compare/v1.2.1...v1.2.2) (2022-06-13)


### Bug Fixes

* cjs usage ([4dc9110](https://github.com/unional/path-equal/commit/4dc9110797c8892436b7313637ae6517a75aa87c))

# path-equal

## 1.2.2

### Patch Changes

- Fix CommonJS usage by adding the `cjs/package.json` workaround.

## 1.2.1

### Patch Changes

- cf4f7ef: remove extra source files

## 1.2.0

### Minor Changes

- b0ae68e: add ESM support

### Patch Changes

- 25f89bd: Remove `tslib` phantom dependency

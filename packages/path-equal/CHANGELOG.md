# path-equal

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

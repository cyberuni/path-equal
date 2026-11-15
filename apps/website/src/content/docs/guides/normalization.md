---
title: Path normalization
description: The normalization cases covered by path-equal's tests.
---

`pathEqual(actual, expected)` normalizes both strings before comparing them. These input/output pairs are copied from the package's test assertions:

| First path | Second path | Result |
| --- | --- | --- |
| `'a/b'` | `'a\\b'` | `true` |
| `'a\\b\\c\\'` | `'a/b/c'` | `true` |
| `'/d/foo'` | `'d:\\foo'` | `true` |
| `'./a'` | `'a'` | `true` |
| `'a/b/./c'` | `'a/b/c'` | `true` |
| `'a/../b'` | `'b'` | `true` |
| `'a/b/..'` | `'a'` | `true` |
| `'m/h/d/c/../a/b/../../../..'` | `'m'` | `true` |
| `'../a/b/..'` | `'../a'` | `true` |

The test suite also asserts that identical strings compare equal (`'a'` with `'a'`, and `'a/b'` with `'a/b'`) and that `'a'` and `'b'` compare unequal.

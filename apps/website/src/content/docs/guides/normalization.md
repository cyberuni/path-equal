---
title: Path normalization
description: The normalization cases covered by path-equal's tests.
---

`pathEqual(actual, expected)` normalizes both strings before comparing them. Every pair below is copied from the package's test assertions, and each one is asserted in both argument orders.

## Separators

Backslashes and forward slashes are interchangeable. Repeated separators collapse to one, and a trailing separator is ignored.

| First path | Second path | Result |
| --- | --- | --- |
| `'a/b'` | `'a\\b'` | `true` |
| `'a\\b\\c\\'` | `'a/b/c'` | `true` |
| `'a/'` | `'a'` | `true` |
| `'a//b'` | `'a/b'` | `true` |

## Root

| First path | Second path | Result |
| --- | --- | --- |
| `'/'` | `'\\'` | `true` |
| `'/'` | `'//'` | `true` |
| `'///a'` | `'/a'` | `true` |
| `'/..'` | `'/'` | `true` |

## Drive letters

A drive letter followed by a separator, or by nothing, matches the `/<letter>` form. The drive letter is compared case-insensitively.

| First path | Second path | Result |
| --- | --- | --- |
| `'/d/foo'` | `'d:\\foo'` | `true` |
| `'/d/foo'` | `'d:/foo'` | `true` |
| `'/d/foo'` | `'D:\\foo'` | `true` |
| `'/d'` | `'d:'` | `true` |
| `'/D/foo'` | `'/d/foo'` | `false` |

A colon that is not followed by a separator does not mark a drive. Drive-relative paths and POSIX names that contain a colon are compared as they are:

| First path | Second path | Result |
| --- | --- | --- |
| `'c:foo'` | `'/c/foo'` | `false` |
| `'a:b'` | `'/ab'` | `false` |
| `'1:\\foo'` | `'/1/foo'` | `false` |

## UNC paths

Exactly two leading separators mark a UNC path, which is distinct from a path at the root.

| First path | Second path | Result |
| --- | --- | --- |
| `'\\\\server\\share'` | `'//server/share'` | `true` |
| `'\\\\server\\share'` | `'/server/share'` | `false` |
| `'//a'` | `'/a'` | `false` |

## `.` and `..` segments

| First path | Second path | Result |
| --- | --- | --- |
| `'./a'` | `'a'` | `true` |
| `'a/b/./c'` | `'a/b/c'` | `true` |
| `''` | `'.'` | `true` |
| `'a/../b'` | `'b'` | `true` |
| `'a/b/..'` | `'a'` | `true` |
| `'a/..'` | `'.'` | `true` |
| `'m/h/d/c/../a/b/../../../..'` | `'m'` | `true` |
| `'../a/b/..'` | `'../a'` | `true` |
| `'a/../../b'` | `'../b'` | `true` |
| `'/a/../../b'` | `'/b'` | `true` |

Names that only look like dot segments, such as `.git`, `..b` and `...`, are kept as names:

| First path | Second path | Result |
| --- | --- | --- |
| `'./.git'` | `'.git'` | `true` |
| `'a/.../b'` | `'a/b'` | `false` |
| `'a/..b'` | `'b'` | `false` |

## Paths that stay different

| First path | Second path | Result |
| --- | --- | --- |
| `'a'` | `'b'` | `false` |
| `'/a'` | `'a'` | `false` |
| `'A'` | `'a'` | `false` |
| `'../a'` | `'a'` | `false` |
| `'../..'` | `'..'` | `false` |

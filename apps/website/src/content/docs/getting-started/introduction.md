---
title: Introduction
description: Compare equivalent path strings across platforms.
---

`path-equal` answers whether two path strings refer to the same normalized path under its comparison rules. It is useful when values may use Windows or POSIX separators regardless of the current runtime platform.

| Need | Built-in option | `path-equal` |
| --- | --- | --- |
| Normalize one path | [`node:path.normalize()` uses the current platform's path rules](https://nodejs.org/api/path.html#pathnormalizepath). | `pathEqual()` applies a fixed cross-platform set of string normalization rules to both values. |
| Compare two normalized paths | Normalize both values with the desired `node:path` flavor. | Compare with one function. |
| Resolve against the filesystem or current directory | [`node:path.resolve()` uses the current working directory](https://nodejs.org/api/path.html#pathresolvepaths). | Tests do not cover resolving paths against a base directory. |

The tests cover string comparisons only. They do not establish behavior for symlinks, file existence, or comparisons between absolute and relative paths. See [comparison limits](/path-equal/guides/limits/).

[Install the package](/path-equal/getting-started/installation/) or read the [normalization guide](/path-equal/guides/normalization/).

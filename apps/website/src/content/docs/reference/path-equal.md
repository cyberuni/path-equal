---
title: pathEqual
description: Compare two path strings after normalization.
---

```ts
function pathEqual(actual: string, expected: string): boolean
```

Returns `true` when the strings are identical or normalize to the same path. See the [normalization guide](/path-equal/guides/normalization/) for examples asserted by the test suite.

The tests cover string comparisons only. Other path resolution behavior is unverified; see [comparison limits](/path-equal/guides/limits/).

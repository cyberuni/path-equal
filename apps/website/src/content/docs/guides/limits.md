---
title: Comparison limits
description: What the path-equal test suite establishes.
---

`pathEqual` compares two path strings. The tests establish these rules:

- An absolute path never equals a relative path (`'/a'` and `'a'` compare unequal).
- Path names are compared case-sensitively (`'A'` and `'a'` compare unequal), whatever the filesystem would do. Only the drive letter in a `d:` path is compared case-insensitively.
- A drive-relative path such as `'c:foo'` is compared as written, because resolving it needs the current directory of that drive.

The test suite has no assertions for symlinks, file existence, Unicode normalization, or a `..` that climbs above a UNC share. Those behaviors are unverified.

See the [normalization guide](/path-equal/guides/normalization/) for the input/output pairs the tests assert.

---
title: Comparison limits
description: What the path-equal test suite establishes.
---

The test suite covers string equality and normalization. It has no assertions for symlinks, file existence, comparisons between absolute and relative paths, or filesystem-specific case handling. Those behaviors are unverified by these tests.

See the [normalization guide](/path-equal/guides/normalization/) for the input/output pairs the tests do assert.

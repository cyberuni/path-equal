---
title: Benchmark comparison
description: Compare path normalization performance between path-equal versions.
---

The normalization rewrite in the **next release** (unreleased) reduces the cost of common paths while preserving the segment-based behavior needed for `.` and `..`. The table below compares it with the regex implementation shipped in **v1.2.8** and earlier.

## Results

Sample run: 1,000,000 iterations per implementation on Node.js v24.21.0. Lower is better.

<div class="benchmark-summary" role="list" aria-label="Benchmark summary">
  <div class="benchmark-stat" role="listitem">
    <strong>2.1×</strong>
    <span>faster normalization</span>
  </div>
  <div class="benchmark-stat" role="listitem">
    <strong>53%</strong>
    <span>less time per operation</span>
  </div>
  <div class="benchmark-stat" role="listitem">
    <strong>304.6 ns</strong>
    <span>per operation in the next release</span>
  </div>
</div>

| Version | Implementation | Time per operation | Relative |
| --- | --- | ---: | ---: |
| v1.2.8 | Original regex | 652.6 ns | 1× |
| **Next release** | **Segment fast path** | **304.6 ns** | **2.1× faster** |

The benchmark also includes a segment baseline without the fast path at **316.2 ns/op**. Both segment implementations are checked for matching output before they are timed.

## What changed

- The rewrite normalizes separators once and takes a fast path when a path is non-empty and has no `.`, no repeated separator, and no trailing separator.
- Dot segments are resolved by walking path segments instead of repeatedly applying regular expressions.
- The rewrite keeps leading `..` segments in relative paths and handles hyphenated directory names correctly.
- Drive letters are recognized only at the start of a path and only before a separator or the end of the string, and they compare case-insensitively. UNC paths stay distinct from root paths.

## Reproduce the comparison

Run the benchmark from the repository with one million iterations:

```sh
pnpm --filter path-equal bench -- 1000000
```

These are local microbenchmark results, not a guarantee for every runtime or machine. Results can vary with the Node.js version, CPU, and system load. The old regex implementation also has different normalization behavior for some inputs, so its checksum is not expected to match the segment implementations.

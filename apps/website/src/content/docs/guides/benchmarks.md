---
title: Benchmark comparison
description: Compare path normalization performance between path-equal versions.
---

The normalization rewrite in **v1.2.8** reduces the cost of common paths while preserving the segment-based behavior needed for `.` and `..`. The table below compares it with the regex implementation shipped in **v1.2.7**.

## Results

Sample run: 1,000,000 iterations per implementation on Node.js v24.21.0. Lower is better.

<div class="benchmark-summary" role="list" aria-label="Benchmark summary">
  <div class="benchmark-stat" role="listitem">
    <strong>2.3×</strong>
    <span>faster normalization</span>
  </div>
  <div class="benchmark-stat" role="listitem">
    <strong>56%</strong>
    <span>less time per operation</span>
  </div>
  <div class="benchmark-stat" role="listitem">
    <strong>294.5 ns</strong>
    <span>per operation in v1.2.8</span>
  </div>
</div>

| Version | Implementation | Time per operation | Relative |
| --- | --- | ---: | ---: |
| v1.2.7 | Original regex | 667.4 ns | 1× |
| **v1.2.8** | **Segment fast path** | **294.5 ns** | **2.3× faster** |

The benchmark also includes a segment baseline at **496.1 ns/op**. Both segment implementations are checked for matching output before they are timed.

## What changed

- v1.2.8 normalizes separators once and takes a fast path when a path has no dot segments or trailing separator.
- Dot segments are resolved by walking path segments instead of repeatedly applying regular expressions.
- The rewrite keeps leading `..` segments in relative paths and handles hyphenated directory names correctly.

## Reproduce the comparison

Run the benchmark from the repository with one million iterations:

```sh
pnpm --filter path-equal bench -- 1000000
```

These are local microbenchmark results, not a guarantee for every runtime or machine. Results can vary with the Node.js version, CPU, and system load. The old regex implementation also has different normalization behavior for some inputs, so its checksum is not expected to match the segment implementations.

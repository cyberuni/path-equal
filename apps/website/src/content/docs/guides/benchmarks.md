---
title: Benchmark comparison
description: Compare path normalization performance between path-equal versions.
---

The normalization rewrite released in **v1.2.9** reduces the cost of common paths while preserving the segment-based behavior needed for `.` and `..`. This page compares it with the regex implementation shipped in **v1.2.8** and earlier, in two ways:

- **Normalization alone** times only the path normalization step, the part the rewrite changed.
- **Whole `pathEqual` call** times complete `pathEqual(a, b)` calls, which also include the string comparison. The speedup here is smaller because normalization is only part of the call.

## Normalization alone

Sample run: 1,000,000 iterations per implementation on Node.js v24.21.0. Lower is better. The stat cards below describe this measurement.

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
    <span>per normalization in v1.2.9</span>
  </div>
</div>

| Version | Implementation | Time per operation | Relative |
| --- | --- | ---: | ---: |
| v1.2.8 | Original regex | 652.6 ns | 1× |
| **v1.2.9** | **Segment fast path** | **304.6 ns** | **2.1× faster** |

The benchmark also includes a segment baseline without the fast path at **316.2 ns/op**. Both segment implementations are checked for matching output before they are timed.

## Whole `pathEqual` call

This benchmark imports `pathEqual` from the published **v1.2.8** package and from the current source (v1.2.9). It calls each on five typical pairs in turn, 1,000,000 calls after a 100,000-call warm-up, on Node.js v24.21.0 on Linux:

- `src/components/Button.tsx` and itself
- `C:\Users\me\proj\a.ts` and `/c/Users/me/proj/a.ts`
- `a/b/../c` and `a/c`
- `./x/y` and `x/y`
- `node_modules/pkg/index.js` and itself

The table shows the median of seven runs. Lower is better.

| Version | Time per call | Range over 7 runs | Relative |
| --- | ---: | ---: | ---: |
| v1.2.8 | 446.5 ns | 403.1–473.4 ns | 1× |
| **v1.2.9** | **362.8 ns** | **348.2–381.8 ns** | **about 1.2× faster** |

v1.2.8 returns `false` for the `C:\` and `/c/` pair because it compares drive letters case-sensitively. v1.2.9 returns `true` for all five pairs.

## What changed

- The rewrite normalizes separators once and takes a fast path when a path is non-empty and has no `.`, no repeated separator, and no trailing separator.
- Dot segments are resolved by walking path segments instead of repeatedly applying regular expressions.
- The rewrite keeps leading `..` segments in relative paths and handles hyphenated directory names correctly.
- Drive letters are recognized only at the start of a path and only before a separator or the end of the string, and they compare case-insensitively. UNC paths stay distinct from root paths.

## Reproduce the comparison

Run the benchmarks from the repository with one million iterations:

```sh
# Normalization alone
pnpm --filter path-equal bench -- 1000000

# Whole pathEqual call
pnpm --filter path-equal bench:call -- 1000000
```

These are local microbenchmark results, not a guarantee for every runtime or machine. Results can vary with the Node.js version, CPU, and system load. The old regex implementation also has different normalization behavior for some inputs, so its checksum is not expected to match the segment implementations.

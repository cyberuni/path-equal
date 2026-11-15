# Benchmarks

## Normalization (`normalize.mjs`)

Run with `pnpm --filter path-equal bench -- 1000000`.

Sample run: 1,000,000 iterations per implementation on Node.js v24.21.0:

| Implementation | Time per operation | Checksum |
| --- | ---: | ---: |
| Original regex | 667.4 ns | 13,999,998 |
| Segment baseline | 496.1 ns | 12,999,999 |
| Fast path | 294.5 ns | 12,999,999 |

The fast path was about 56% faster than the original regex in this run. This is a local microbenchmark, so results vary by runtime and machine. The original regex has different normalization behavior for some inputs (including hyphenated path segments), so its checksum is not expected to match the segment implementations. The segment baseline and fast path are checked for matching output across the benchmark inputs before timing.

## Whole `pathEqual` call (`path-equal.mjs`)

Run with `pnpm --filter path-equal bench:call -- 1000000`.

It compares `pathEqual` from the published path-equal@1.2.8 (installed as the `path-equal-1.2.8` dev dependency) with the current source on five typical pairs, after a 100,000-call warm-up. Median of seven runs of 1,000,000 calls on Node.js v24.21.0 on Linux:

| Version | Time per call | Matches |
| --- | ---: | ---: |
| v1.2.8 | 446.5 ns | 800,000 |
| v1.2.9 (current source) | 362.8 ns | 1,000,000 |

v1.2.8 returns `false` for the `C:\Users\me\proj\a.ts` and `/c/Users/me/proj/a.ts` pair because it compares drive letters case-sensitively, so it matches 4 of the 5 pairs.

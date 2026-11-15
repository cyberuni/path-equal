# Normalization benchmark

Run with `pnpm --filter path-equal bench -- 1000000`.

Sample run: 1,000,000 iterations per implementation on Node.js v24.21.0:

| Implementation | Time per operation | Checksum |
| --- | ---: | ---: |
| Original regex | 667.4 ns | 13,999,998 |
| Segment baseline | 496.1 ns | 12,999,999 |
| Fast path | 294.5 ns | 12,999,999 |

The fast path was about 56% faster than the original regex in this run. This is a local microbenchmark, so results vary by runtime and machine. The original regex has different normalization behavior for some inputs (including hyphenated path segments), so its checksum is not expected to match the segment implementations. The segment baseline and fast path are checked for matching output across the benchmark inputs before timing.

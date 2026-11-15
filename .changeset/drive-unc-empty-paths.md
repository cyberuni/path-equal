---
"path-equal": patch
---

Fix several normalization inconsistencies:

- Repeated separators always collapse (`a//b` equals `a/b`), and an empty path equals `.`.
- A drive letter is recognized only at the start of a path and only when a separator or the end of the string follows it. Drive letters compare case-insensitively (`D:\foo` equals `/d/foo`). `c:foo` and `a:b` are no longer rewritten into `/cfoo` and `/ab`.
- UNC paths (`\\server\share`) no longer equal `/server/share`.

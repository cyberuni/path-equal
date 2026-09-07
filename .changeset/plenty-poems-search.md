---
'path-equal': patch
---

Move the TypeScript sources from `ts/` to `src/`.

The published tarball and the JSR package now carry the sources under `src/`
instead of `ts/`. The `exports` map is unchanged, so `import 'path-equal'` and
`require('path-equal')` resolve exactly as before; only the path of the shipped
`.ts` sources moved.

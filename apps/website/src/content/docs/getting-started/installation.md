---
title: Installation
description: Install and import path-equal.
---

Install the published package with your package manager:

```sh
pnpm add path-equal
# or: npm install path-equal
# or: yarn add path-equal
```

The package exports ESM and CommonJS entry points and declares no runtime dependencies. It has no `browser` field or `engines` declaration.

```ts
import { pathEqual } from 'path-equal'

pathEqual('a/b', 'a\\b') // true
```

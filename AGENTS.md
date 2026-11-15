# Repository guidance

## Documentation site

The Astro + Starlight site lives in `apps/website`.

- `pnpm web dev` starts the local site.
- `pnpm web build` builds the static site.
- `pnpm web typecheck` checks the site types.
- `pnpm web preview` previews a production build.
- GitHub Pages serves this project at `/path-equal/`. Every internal Markdown link must include that prefix (for example, `/path-equal/guides/normalization/`).
- The sidebar is explicit in `apps/website/astro.config.mjs`; add each new docs page there so it is reachable from navigation.
- Documented behavior and input/output examples must be supported by assertions in `*.spec.ts`; label behavior the tests do not establish instead of guessing.

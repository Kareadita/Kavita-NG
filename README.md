# Kavita-NG

Angular 22+ UI library extracted from [Kavita](https://github.com/Kareadita/Kavita), published as [`@kareadita/kavita-ng`](projects/kavita-ng/README.md), plus the demo site that documents it.

## Layout

```
projects/kavita-ng/   the library (ng-packagr, one folder per secondary entry point)
projects/demo/        the demo site, deployed to GitHub Pages
e2e/                  Playwright tests against the demo
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Serve the demo at http://localhost:4200. It imports the library from source, so edits reload live |
| `npm run build:lib` | Build the library into `dist/kavita-ng` |
| `npm run build:demo` | Build the demo into `dist/demo` |
| `npm test` | Library unit tests (Vitest, jsdom) |
| `npm run test:browser` | Library tests named `*.browser.spec.ts`, run in real Chromium. Use these for anything that reads computed CSS |
| `npm run test:demo` | Demo unit tests |
| `npm run e2e` | Playwright tests against the demo |
| `npm run lint` | ESLint for both projects |
| `npm run tokens` | Regenerate `projects/kavita-ng/styles/_tokens.scss` after editing `tokens.json` |
| `npm run tokens:check` | Fail if `_tokens.scss` is stale or the compiled styles use a variable outside `--kng-*`/`--bs-*` (runs in CI) |
| `npm run tokens:kavita` | Print the `body` block that maps Kavita's variables onto `--kng-*` |

First run of the browser or e2e tests needs `npx playwright install chromium`.

## Adding a secondary entry point

Create `projects/kavita-ng/<name>/ng-package.json` containing `{ "lib": { "entryFile": "src/public-api.ts" } }` and export from `projects/kavita-ng/<name>/src/public-api.ts`. It is then importable as `@kareadita/kavita-ng/<name>` in the demo, in specs and in other entry points.

## Adding a token

Add it to `projects/kavita-ng/styles/tokens.json`, run `npm run tokens`, then use it in SCSS as `token('name')`. A value of `"@other-token"` makes it derived: no default of its own, it follows `other-token`. `null` means no default at all. `"kavita"` names the Kavita variable it maps from when that is not the same name without the prefix, or `false` when Kavita has none.

## Releasing

1. Bump `version` in `projects/kavita-ng/package.json`.
2. Commit, then tag `v<version>` and push the tag.
3. The `Release` workflow builds and publishes to npm.

## License

GPL-3.0, same as Kavita.

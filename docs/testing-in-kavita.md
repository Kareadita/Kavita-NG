# Testing a local build in Kavita

How to run Kavita against a library build from this repo, without publishing to npm. Paths assume both repos sit side by side:

```
KavitaOrg/
  Kavita/        Kavita checkout, the Angular app is in UI/Web
  Kavita-NG/     this repo
```

Steps 1 to 3 are one command, run in `Kavita-NG` after `npm install` in `Kavita/UI/Web`:

```powershell
npm run deploy:kavita
npm run deploy:kavita -- --target D:/elsewhere/Kavita/UI/Web
```

The manual steps below show what it does. Replace `<version>` with the `version` in `projects/kavita-ng/package.json`, for example `0.0.2`.

## 1. Build and pack the library

In `Kavita-NG`:

```powershell
npx ng build kavita-ng
cd dist/kavita-ng
npm pack
```

This creates `dist/kavita-ng/kareadita-kavita-ng-<version>.tgz`.

## 2. Unpack it into Kavita

In `Kavita/UI/Web`:

```powershell
npm install
New-Item -ItemType Directory -Force node_modules/@kareadita/kavita-ng | Out-Null
tar -xzf ../../../Kavita-NG/dist/kavita-ng/kareadita-kavita-ng-<version>.tgz -C node_modules/@kareadita/kavita-ng --strip-components=1
Remove-Item -Recurse -Force .angular/cache
```

- Run `npm install` first. It removes packages that are not in Kavita's `package.json`, and that includes the unpacked library.
- Unpack with `tar`, not `npm install <tarball>`. Installing the tarball through npm rebuilds Kavita's whole dependency tree and can drop packages it needs.
- `--strip-components=1` drops the `package/` folder that npm tarballs wrap everything in.
- Clearing `.angular/cache` stops Vite from reusing its dependency cache from the old tree.

## 3. Map Kavita's variables onto the library's

In `Kavita-NG`:

```powershell
npm run -s tokens:kavita > ../Kavita/UI/Web/src/theme/_kng-mapping.scss
```

This writes one `body` block that points each library token at the Kavita variable it replaces:

```scss
body {
  --kng-primary-color: var(--primary-color);
  --kng-body-bg-color: var(--bs-body-bg);
  --kng-input-bg-color: var(--input-bg-color);
  ...
}
```

Without it, a Kavita theme that sets `--input-bg-color` never reaches the library's inputs. The block is on `body` because Kavita applies themes as a class on `body`. Mapped on `:root`, it would resolve on `<html>` before any theme applies.

Run it again whenever `projects/kavita-ng/styles/tokens.json` changes.

## 4. Load the styles

In `Kavita/UI/Web/src/styles.scss`, add these after the last `@use` line (`@use './theme/directives/resize';`):

```scss
@use '@kareadita/kavita-ng/styles';
@use './theme/kng-mapping';
```

They must come after all of Kavita's `theme/components/*` and `utilities/*` lines, so the library's rules win where both define the same thing. Skip `@kareadita/kavita-ng/styles/fonts`, since Kavita already loads Poppins itself.

## 5. Run Kavita

```powershell
npm start
```

## What to expect

- Kavita looks the same as before. Buttons, inputs, tabs, modals and the other Bootstrap elements are styled by the library, using the same values.
- Danger alerts have a red border instead of green. That is an intentional fix.
- To confirm the library is active, inspect a primary button in DevTools. Its `background-color` comes from `var(--kng-btn-primary-bg-color, var(--kng-primary-color))`, with Kavita's own rule crossed out.
- A user theme that only sets `--primary-color` behaves as it does today. Kavita declares its derived colors, such as `--btn-primary-bg-color`, on `:root`, so they stay green. Removing those derived defaults from Kavita's `dark.scss` is part of the Kavita integration phase.

## After changing the library

Run `npm run deploy:kavita` again. The dev server picks up the new styles once `.angular/cache` is cleared and it restarts.

## Undo

1. Remove the two `@use` lines from `src/styles.scss`.
2. Delete `src/theme/_kng-mapping.scss`.
3. Run `npm install` in `Kavita/UI/Web`, which removes the unpacked library.

## Troubleshooting

**`Cannot find module '@babel/core'` when starting Kavita.** Kavita's lockfile from commit `d6680ae17` is inconsistent, and `npm ci` installs no `@babel/core` from it. Run `npm install` instead, which repairs the tree and rewrites `package-lock.json`. Commit that lockfile change to Kavita separately.

**`Can't find stylesheet to import` for `@kareadita/kavita-ng/styles`.** The library is not in `node_modules`. Check that `node_modules/@kareadita/kavita-ng/styles/_index.scss` exists, and repeat step 2 if not.

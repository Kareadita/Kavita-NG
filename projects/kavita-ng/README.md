# @kareadita/kavita-ng

Angular 22+ components, services, pipes and theme tokens built on Bootstrap 5.3 and ng-bootstrap. Extracted from [Kavita](https://github.com/Kareadita/Kavita) so Kavita and related projects share one copy.

The library is at an early stage. It ships the theme tokens and Bootstrap overrides, and no components yet.

## Install

```bash
npm install @kareadita/kavita-ng
```

```ts
import { provideKavitaNg } from '@kareadita/kavita-ng';

bootstrapApplication(App, {
  providers: [provideKavitaNg()],
});
```

## Styles

Load Bootstrap first, then the library. The font partial is optional.

```scss
@use 'bootstrap/scss/bootstrap';
@use '@kareadita/kavita-ng/styles';
@use '@kareadita/kavita-ng/styles/fonts'; // Poppins, skip it to use your own font
```

Every color, size and font the library uses is a `--kng-*` CSS variable with a default on `:root`. A theme overrides them on `body` or below:

```css
body.theme-sakura {
  --kng-primary-color: #e91e63;
}
```

That one line recolors buttons, tabs, pagination, checkboxes and everything else that follows the primary color. Derived tokens such as `--kng-btn-primary-bg-color` have no default of their own, so a theme can also set one directly without touching the rest.

Set tokens on `body` or below, not on `:root`. A token set on `:root` by the host is fine for plain values, but a host variable mapped there (`--kng-primary-color: var(--my-primary)`) is resolved once on `<html>` and misses themes applied to `body`.

Use `token('name')` in your own SCSS to read a token with its fallback chain. In a component stylesheet, load it from `styles/functions`, which emits no CSS. Loading `styles` there would copy the whole library into that component:

```scss
@use '@kareadita/kavita-ng/styles/functions' as kng;

.cover-title {
  color: kng.token('primary-color');
}
```
 The full list, with defaults and what each derived token follows, is in `@kareadita/kavita-ng/styles/tokens.json` and on the demo's Tokens page.

Poppins is licensed under the SIL Open Font License, included as `styles/fonts/OFL.txt`.

## Links

- Demo and docs: https://kareadita.github.io/Kavita-NG/
- Source: https://github.com/Kareadita/Kavita-NG

## License

GPL-3.0, same as Kavita.

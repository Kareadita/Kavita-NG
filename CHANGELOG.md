# Changelog

## Unreleased

- `@kareadita/kavita-ng/i18n`: `KNG_TRANSLATOR`, built-in English, `provideKngLocalization()`, `withOverrides()`, and translations for 26 languages imported from Kavita
- `@kareadita/kavita-ng/transloco`: `withTransloco()`, so library text follows the host's Transloco language
- `@kareadita/kavita-ng/pipes`: `defaultValue`, `defaultDate`, `bytes`, `compactNumber`, `duration`, `timeDuration`, `timeDifference`, `utcToLocalTime`, `utcToLocalDate`, `sentenceCase`, `safeHtml`, `safeStyle`, `safeUrl`, `truncate`, `breakpoint`
- `@kareadita/kavita-ng/layout`: `BreakpointService` and `Breakpoint`, reading `--kng-setting-mobile-breakpoint` and `--kng-setting-tablet-breakpoint`
- New peer dependencies: `@angular/platform-browser ^22.0.0`, `rxjs ^7.4.0`, and `@jsverse/transloco ^8.0.0` (optional)

## 0.0.2

- `@kareadita/kavita-ng/styles`: `--kng-*` theme tokens and Bootstrap overrides for buttons, inputs, selects, checkboxes, radios, tabs, navbar, dropdowns, lists, tables, pagination, progress, alerts, accordion, breadcrumb, modal, offcanvas, popover and tooltip, plus shared globals (`.setting-section-break`, `.dot-separator`, reduced motion, `.no-animations`)
- `@kareadita/kavita-ng/styles/fonts`: optional Poppins `@font-face`
- `@kareadita/kavita-ng/styles/tokens.json`: every token with its default or the token it follows
- `bootstrap ^5.3.0` is now a peer dependency

## 0.0.1

- Workspace setup: library, demo site, lint, unit tests, browser tests, Playwright, CI, GitHub Pages and npm release workflows
- `provideKavitaNg()`, empty for now

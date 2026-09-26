// Weblate language ids use underscores (pt_BR, zh_Hans), Intl wants BCP 47 (pt-BR, zh-Hans).
// A bare language borrows the browser's region: "en" alone formats dates the US way for a UK user
export function toIntlLocale(lang: string): string {
  const canonical = canonicalize(lang.replace(/_/g, '-')) ?? 'en';
  const browser = typeof navigator === 'undefined' ? undefined : canonicalize(navigator.language);
  return browser && baseOf(canonical) === canonical && baseOf(browser) === canonical
    ? browser
    : canonical;
}

function canonicalize(locale: string): string | undefined {
  try {
    return Intl.getCanonicalLocales(locale)[0];
  } catch {
    return undefined;
  }
}

function baseOf(locale: string): string {
  return locale.split('-')[0];
}

const formatters = new Map<string, Intl.NumberFormat | Intl.DateTimeFormat>();

export function numberFormat(locale: string, options: Intl.NumberFormatOptions): Intl.NumberFormat {
  const key = `n|${locale}|${JSON.stringify(options)}`;
  let formatter = formatters.get(key) as Intl.NumberFormat | undefined;
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    formatters.set(key, formatter);
  }
  return formatter;
}

export function dateTimeFormat(
  locale: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const key = `d|${locale}|${JSON.stringify(options)}`;
  let formatter = formatters.get(key) as Intl.DateTimeFormat | undefined;
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, options);
    formatters.set(key, formatter);
  }
  return formatter;
}

// The server sends UTC without an offset ("2024-01-01T10:00:00"), which Date would read as local time.
// .NET also sends 7 fractional digits, trimmed to the 3 Date reliably parses
export function parseUtc(value: string): Date {
  const trimmed = value.replace(/(\.\d{3})\d+/, '$1');
  const hasOffset = /(z|[+-]\d{2}:?\d{2})$/i.test(trimmed);
  return new Date(trimmed.includes('T') && !hasOffset ? trimmed + 'Z' : trimmed);
}

export function isMinDate(value: string): boolean {
  return value.split('T')[0] === '0001-01-01';
}

export function isMaxDate(value: string): boolean {
  return value.split('T')[0] === '9999-12-31';
}

import { computed, inject, InjectionToken, Signal, signal } from '@angular/core';
import en from './lang/en.json';

export type KngTranslationParams = Record<string, unknown>;

export interface KngTranslator {
  lang: Signal<string>;
  translate(key: string, params?: KngTranslationParams): string;
}

export interface KngDictionary {
  [key: string]: string | KngDictionary;
}

export const KNG_EN: KngDictionary = en;

export const KNG_TRANSLATION_OVERRIDES = new InjectionToken<Record<string, string>>(
  'KNG_TRANSLATION_OVERRIDES',
  { providedIn: 'root', factory: () => ({}) },
);

export const KNG_TRANSLATOR = new InjectionToken<KngTranslator>('KNG_TRANSLATOR', {
  providedIn: 'root',
  factory: () => createKngTranslator(signal({ lang: 'en', dictionary: KNG_EN })),
});

export interface KngLoadedLanguage {
  lang: string;
  dictionary: KngDictionary;
}

/**
 * Builds a translator over a language that is swapped in only once its dictionary has loaded.
 * Lookup order: host overrides, the loaded language, built-in English, then the key itself.
 */
export function createKngTranslator(loaded: Signal<KngLoadedLanguage>): KngTranslator {
  const overrides = inject(KNG_TRANSLATION_OVERRIDES);
  return {
    lang: computed(() => loaded().lang),
    translate: (key, params) => {
      const text = overrides[key] ?? lookup(loaded().dictionary, key) ?? lookup(KNG_EN, key) ?? key;
      return params ? interpolate(text, params) : text;
    },
  };
}

function lookup(dictionary: KngDictionary, key: string): string | undefined {
  let node: string | KngDictionary | undefined = dictionary;
  for (const part of key.split('.')) {
    if (node === undefined || typeof node === 'string') return undefined;
    node = node[part];
  }
  return typeof node === 'string' && node !== '' ? node : undefined;
}

function interpolate(text: string, params: KngTranslationParams): string {
  return text.replace(/{{\s*([\w-]+)\s*}}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

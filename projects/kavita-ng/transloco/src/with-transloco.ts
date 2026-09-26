import { inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import {
  createKngTranslator,
  KNG_EN,
  KNG_LANGS,
  KNG_TRANSLATOR,
  KngDictionary,
  KngLoadedLanguage,
  KngLocalizationFeature,
} from '@kareadita/kavita-ng/i18n';
import { catchError, from, map, of, switchMap } from 'rxjs';

export function withTransloco(): KngLocalizationFeature {
  return { providers: [{ provide: KNG_TRANSLATOR, useFactory: createTranslocoTranslator }] };
}

function createTranslocoTranslator() {
  const loaded = signal<KngLoadedLanguage>({ lang: 'en', dictionary: KNG_EN });

  // lang and dictionary change in one set(), or compactNumber could format as de while text is still English
  inject(TranslocoService)
    .langChanges$.pipe(
      switchMap((lang) =>
        from(loadDictionary(lang)).pipe(
          catchError(() => of({})),
          map((dictionary) => ({ lang, dictionary })),
        ),
      ),
      takeUntilDestroyed(),
    )
    .subscribe((language) => loaded.set(language));

  return createKngTranslator(loaded);
}

function loadDictionary(lang: string): Promise<KngDictionary> {
  const candidates = [lang, lang.replace('-', '_'), lang.split(/[-_]/)[0]];
  if (candidates.includes('en')) return Promise.resolve(KNG_EN);

  const loader = candidates.map((candidate) => KNG_LANGS[candidate]).find(Boolean);
  return loader ? loader() : Promise.resolve({});
}

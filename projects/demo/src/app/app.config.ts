import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import { provideKavitaNg } from '@kareadita/kavita-ng';
import { KNG_LANGS, provideKngLocalization } from '@kareadita/kavita-ng/i18n';
import { withTransloco } from '@kareadita/kavita-ng/transloco';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideKavitaNg(),
    provideTransloco({
      config: { availableLangs: ['en', ...Object.keys(KNG_LANGS)], defaultLang: 'en' },
    }),
    provideKngLocalization(withTransloco()),
  ],
};

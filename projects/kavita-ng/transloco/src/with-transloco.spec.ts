import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import {
  KNG_TRANSLATOR,
  KngTranslator,
  provideKngLocalization,
  withOverrides,
} from '@kareadita/kavita-ng/i18n';
import { DefaultDatePipe } from '@kareadita/kavita-ng/pipes';
import { withTransloco } from './with-transloco';

@Component({
  selector: 'kng-with-transloco-host',
  templateUrl: './with-transloco.spec.html',
  styleUrl: './with-transloco.spec.scss',
  imports: [DefaultDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class WithTranslocoHost {}

describe('withTransloco', () => {
  let transloco: TranslocoService;

  const setup = (...features: Parameters<typeof provideKngLocalization>) => {
    TestBed.configureTestingModule({
      providers: [
        provideTransloco({ config: { availableLangs: ['en', 'de'], defaultLang: 'en' } }),
        provideKngLocalization(withTransloco(), ...features),
      ],
    });
    transloco = TestBed.inject(TranslocoService);
    return TestBed.inject(KNG_TRANSLATOR);
  };

  const loaded = (translator: KngTranslator, lang: string) =>
    vi.waitFor(() => expect(translator.lang()).toBe(lang));

  it('starts in English', () => {
    const translator = setup();

    expect(translator.lang()).toBe('en');
    expect(translator.translate('default-date-pipe.never')).toBe('Never');
  });

  it('switches to German once the German file has loaded', async () => {
    const translator = setup();

    transloco.setActiveLang('de');
    expect(translator.lang()).toBe('en');
    expect(translator.translate('default-date-pipe.never')).toBe('Never');

    await loaded(translator, 'de');
    expect(translator.translate('default-date-pipe.never')).toBe('Niemals');
  });

  it('matches a regional id to its base language', async () => {
    const translator = setup();

    transloco.setActiveLang('de-AT');
    await loaded(translator, 'de-AT');

    expect(translator.translate('default-date-pipe.never')).toBe('Niemals');
  });

  it('keeps Weblate ids with an underscore', async () => {
    const translator = setup();

    transloco.setActiveLang('pt_BR');
    await loaded(translator, 'pt_BR');

    expect(translator.translate('default-date-pipe.never')).toBe('Nunca');
  });

  it('falls back to English for a language the library has no file for', async () => {
    const translator = setup();

    transloco.setActiveLang('xx');
    await loaded(translator, 'xx');

    expect(translator.translate('default-date-pipe.never')).toBe('Never');
  });

  it('applies overrides on top of the loaded language', async () => {
    const translator = setup(withOverrides({ 'default-date-pipe.never': 'Noch nicht' }));

    transloco.setActiveLang('de');
    await loaded(translator, 'de');

    expect(translator.translate('default-date-pipe.never')).toBe('Noch nicht');
  });

  it('re-renders pipe output when the language changes', async () => {
    const translator = setup();
    const fixture = TestBed.createComponent(WithTranslocoHost);
    await fixture.whenStable();
    const text = () => (fixture.nativeElement as HTMLElement).textContent?.trim();
    expect(text()).toBe('Never');

    transloco.setActiveLang('de');
    await loaded(translator, 'de');
    await fixture.whenStable();

    expect(text()).toBe('Niemals');
  });
});

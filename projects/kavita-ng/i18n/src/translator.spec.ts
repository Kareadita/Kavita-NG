import { TestBed } from '@angular/core/testing';
import { provideKngLocalization, withOverrides } from './provide-localization';
import { KNG_TRANSLATOR } from './translator';

describe('KNG_TRANSLATOR', () => {
  it('speaks built-in English with no setup', () => {
    const translator = TestBed.inject(KNG_TRANSLATOR);

    expect(translator.lang()).toBe('en');
    expect(translator.translate('default-date-pipe.never')).toBe('Never');
  });

  it('fills params', () => {
    const translator = TestBed.inject(KNG_TRANSLATOR);

    expect(translator.translate('duration-pipe.combo', { hour: 2, min: 5 })).toBe('2h 5m');
  });

  it('returns an unknown key as-is, so literal text passes through', () => {
    const translator = TestBed.inject(KNG_TRANSLATOR);

    expect(translator.translate('-')).toBe('-');
    expect(translator.translate('duration-pipe')).toBe('duration-pipe');
  });

  it('prefers overrides', () => {
    TestBed.configureTestingModule({
      providers: [provideKngLocalization(withOverrides({ 'default-date-pipe.never': 'Not yet' }))],
    });

    expect(TestBed.inject(KNG_TRANSLATOR).translate('default-date-pipe.never')).toBe('Not yet');
  });
});

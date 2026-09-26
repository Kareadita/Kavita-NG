import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { KNG_TRANSLATOR, KngTranslator } from '@kareadita/kavita-ng/i18n';
import { Breakpoint, BreakpointService } from '@kareadita/kavita-ng/layout';
import { BreakpointPipe } from './breakpoint-pipe';
import { BytesPipe } from './bytes-pipe';
import { CompactNumberPipe } from './compact-number-pipe';
import { DefaultDatePipe } from './default-date-pipe';
import { DefaultValuePipe } from './default-value-pipe';
import { DurationPipe } from './duration-pipe';
import { SentenceCasePipe } from './sentence-case-pipe';
import { TimeDifferencePipe } from './time-difference-pipe';
import { TimeDurationPipe } from './time-duration-pipe';
import { TruncatePipe } from './truncate-pipe';
import { UtcToLocalDatePipe } from './utc-to-local-date-pipe';
import { UtcToLocalTimePipe } from './utc-to-local-time-pipe';

const create = <T>(type: new () => T): T => TestBed.runInInjectionContext(() => new type());

describe('pure pipes', () => {
  it('bytes', () => {
    const pipe = new BytesPipe();

    expect(pipe.transform(512)).toBe('512 B');
    expect(pipe.transform(1500)).toBe('1.5 kB');
    expect(pipe.transform(2000)).toBe('2 kB');
    expect(pipe.transform(2000, true, 1, true)).toBe('2.0 kB');
    expect(pipe.transform(1024, false)).toBe('1 KiB');
  });

  it('defaultValue', () => {
    const pipe = new DefaultValuePipe();

    expect(pipe.transform(null)).toBe(String.fromCharCode(0x2014));
    expect(pipe.transform(NaN, 'n/a')).toBe('n/a');
    expect(pipe.transform(0)).toBe(0);
  });

  it('sentenceCase', () => {
    const pipe = new SentenceCasePipe();

    expect(pipe.transform('hello world')).toBe('Hello world');
    expect(pipe.transform(null)).toBe('');
  });

  it('utcToLocalDate reads a server date with no offset as UTC', () => {
    const pipe = new UtcToLocalDatePipe();

    expect(pipe.transform('2024-01-01T10:00:00')?.toISOString()).toBe('2024-01-01T10:00:00.000Z');
    expect(pipe.transform('2024-01-01T10:00:00.1234567')?.toISOString()).toBe(
      '2024-01-01T10:00:00.123Z',
    );
    expect(pipe.transform('2024-01-01T10:00:00+02:00')?.toISOString()).toBe(
      '2024-01-01T08:00:00.000Z',
    );
    expect(pipe.transform('0001-01-01T00:00:00')).toBeNull();
    expect(pipe.transform('9999-12-31T00:00:00')).toBeNull();
  });
});

describe('translated pipes in English', () => {
  it('defaultDate', () => {
    const pipe = create(DefaultDatePipe);

    expect(pipe.transform(null)).toBe('Never');
    expect(pipe.transform('', '-')).toBe('-');
    expect(pipe.transform('2024-01-01')).toBe('2024-01-01');
  });

  it('duration', () => {
    const pipe = create(DurationPipe);

    expect(pipe.transform(30)).toBe('30 seconds');
    expect(pipe.transform(125)).toBe('2 minutes');
    expect(pipe.transform(7200)).toBe('2 hours');
    expect(pipe.transform(7500)).toBe('2h 5m');
  });

  it('timeDuration', () => {
    const pipe = create(TimeDurationPipe);

    expect(pipe.transform(0.5)).toBe('30.0 minutes');
    expect(pipe.transform(48)).toBe('2.0 days');
    expect(pipe.transform(8760)).toBe('1.0 years');
  });

  it('breakpoint', () => {
    const pipe = create(BreakpointPipe);

    expect(pipe.transform(Breakpoint.Tablet)).toBe('Tablet');
    expect(() => pipe.transform(5 as Breakpoint)).toThrow();
  });

  it('compactNumber', () => {
    const pipe = create(CompactNumberPipe);

    expect(pipe.transform(999)).toBe('999');
    expect(pipe.transform(1234)).toBe('1.2K');
    expect(pipe.transform(12345)).toBe('12.3K');
  });

  it('utcToLocalTime', () => {
    const pipe = create(UtcToLocalTimePipe);
    const date = new Date(Date.UTC(2015, 5, 15, 9, 3, 1));

    expect(pipe.transform('2015-06-15T09:03:01', 'shortDate')).toBe(
      new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(
        date,
      ),
    );
    expect(pipe.transform('2015-06-15T09:03:01', 'full')).toMatch(
      /^2015-06-1[45]T\d{2}:\d{2}:01\.000[+-]\d{2}:\d{2}$/,
    );
    expect(pipe.transform('9999-12-31T00:00:00')).toBe('Never');
    expect(pipe.transform('0001-01-01T00:00:00')).toBe('');
  });

  describe('timeDifference', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-06-01T12:00:00Z'));
    });
    afterEach(() => vi.useRealTimers());

    it('says how long ago or how long until', () => {
      const pipe = create(TimeDifferencePipe);

      expect(pipe.transform('2024-06-01T11:59:30Z')).toBe('just now');
      expect(pipe.transform('2024-06-01T09:00:00Z')).toBe('3 hours ago');
      expect(pipe.transform('2024-06-01T15:00:00Z')).toBe('in 3 hours');
      expect(pipe.transform('2024-05-29T12:00:00Z')).toBe('3 days ago');
      expect(pipe.transform(null)).toBe('Never');
      pipe.ngOnDestroy();
    });
  });
});

describe('locale-aware pipes follow the translator language', () => {
  const lang = signal('en');
  const translator: KngTranslator = { lang, translate: (key) => key };

  beforeEach(() => {
    lang.set('en');
    TestBed.configureTestingModule({
      providers: [{ provide: KNG_TRANSLATOR, useValue: translator }],
    });
  });

  it('compactNumber', () => {
    const pipe = create(CompactNumberPipe);
    expect(pipe.transform(1234567)).toBe('1.2M');

    lang.set('de');
    expect(pipe.transform(1234567)).toMatch(/^1,2\sMio\.$/);
  });

  describe('with an en-GB browser', () => {
    beforeEach(() => vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB'));
    afterEach(() => vi.restoreAllMocks());

    it('keeps the browser region when the language is the same', () => {
      const pipe = create(UtcToLocalTimePipe);

      expect(pipe.transform('2015-06-15T12:00:00', 'shortDate')).toBe('15/06/2015');
    });

    it('uses the chosen language when it differs from the browser', () => {
      const pipe = create(UtcToLocalTimePipe);
      lang.set('de');

      expect(pipe.transform('2015-06-15T12:00:00', 'shortDate')).toBe('15.6.2015');
    });
  });

  it('utcToLocalTime', () => {
    const pipe = create(UtcToLocalTimePipe);
    lang.set('pt_BR');

    expect(pipe.transform('2015-06-15T12:00:00', 'mediumDate')).toBe(
      new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' }).format(
        new Date(Date.UTC(2015, 5, 15, 12)),
      ),
    );
  });
});

describe('truncate', () => {
  const setWidth = (mobile: boolean) =>
    TestBed.configureTestingModule({
      providers: [{ provide: BreakpointService, useValue: { isMobileOrBelow: signal(mobile) } }],
    });

  it('shortens only on mobile unless told to always', () => {
    setWidth(false);
    const pipe = create(TruncatePipe);
    const long = 'a'.repeat(40);

    expect(pipe.transform(long)).toBe(long);
    expect(pipe.transform(long, 10, true)).toBe('aaaaaaaaaa…');
  });

  it('shortens on mobile', () => {
    setWidth(true);
    const pipe = create(TruncatePipe);

    expect(pipe.transform('a'.repeat(40), 10)).toBe('aaaaaaaaaa…');
    expect(pipe.transform('short', 10)).toBe('short');
  });
});

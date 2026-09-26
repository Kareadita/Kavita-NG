import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';
import { dateTimeFormat, isMaxDate, isMinDate, parseUtc, toIntlLocale } from './locale';

export type UtcToLocalTimeFormat = 'full' | 'short' | 'shortDate' | 'shortTime' | 'mediumDate';

// Same option objects as luxon's DATETIME_SHORT, DATE_SHORT, TIME_SIMPLE and DATE_MED, which Kavita used
const formatOptions: Record<Exclude<UtcToLocalTimeFormat, 'full'>, Intl.DateTimeFormatOptions> = {
  short: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' },
  shortDate: { year: 'numeric', month: 'numeric', day: 'numeric' },
  shortTime: { hour: 'numeric', minute: 'numeric' },
  mediumDate: { year: 'numeric', month: 'short', day: 'numeric' },
};

@Pipe({ name: 'utcToLocalTime', pure: false })
export class UtcToLocalTimePipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  transform(utcDate: string | undefined | null, format: UtcToLocalTimeFormat = 'short'): string {
    if (utcDate === '' || utcDate === null || utcDate === undefined || isMinDate(utcDate)) {
      return '';
    }

    if (isMaxDate(utcDate)) {
      return this.translator.translate('default-date-pipe.never');
    }

    const date = parseUtc(utcDate);
    if (format === 'full') return toLocalIso(date);

    const options = formatOptions[format];
    if (!options) {
      console.error('No logic in place for utc date format, format: ', format);
      return utcDate;
    }
    return dateTimeFormat(toIntlLocale(this.translator.lang()), options).format(date);
  }
}

// Matches luxon's DateTime.toString(): 2015-06-15T09:03:01.000+01:00
function toLocalIso(date: Date): string {
  const pad = (n: number, width = 2) => String(Math.abs(n)).padStart(width, '0');
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}` +
    `${sign}${pad(Math.trunc(offset / 60))}:${pad(offset % 60)}`
  );
}

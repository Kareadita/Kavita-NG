import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';
import { numberFormat, toIntlLocale } from './locale';

// 1234 prints "1.2K", not "1.23K": these digit counts get 2 significant digits instead of 3
const specialCases = [4, 7, 10, 13];

@Pipe({ name: 'compactNumber', pure: false })
export class CompactNumberPipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  transform(value: number): string {
    if (value < 1000) return value + '';

    const locale = toIntlLocale(this.translator.lang());
    const digits = specialCases.includes((value + '').length) ? 2 : 3;
    return numberFormat(locale, { notation: 'compact', maximumSignificantDigits: digits }).format(
      value,
    );
  }
}

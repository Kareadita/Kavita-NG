import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';

@Pipe({ name: 'defaultDate', pure: false })
export class DefaultDatePipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  /**
   * @param replacementString a library translation key, or literal text such as '-' (unknown keys print as-is)
   */
  transform(value: unknown, replacementString = 'default-date-pipe.never'): string {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      value === Infinity ||
      Number.isNaN(value) ||
      value === '1/1/01'
    ) {
      return this.translator.translate(replacementString);
    }
    return value as string;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { isMaxDate, isMinDate, parseUtc } from './locale';

/**
 * Like `utcToLocalTime`, but returns a Date for pipes that need one, such as `timeDifference`
 */
@Pipe({ name: 'utcToLocalDate' })
export class UtcToLocalDatePipe implements PipeTransform {
  transform(utcDate: string | undefined | null): Date | null {
    if (
      utcDate === '' ||
      utcDate === null ||
      utcDate === undefined ||
      isMinDate(utcDate) ||
      isMaxDate(utcDate)
    ) {
      return null;
    }
    return parseUtc(utcDate);
  }
}

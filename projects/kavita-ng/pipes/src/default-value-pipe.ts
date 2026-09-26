import { Pipe, PipeTransform } from '@angular/core';

const emDash = '—';

@Pipe({ name: 'defaultValue' })
export class DefaultValuePipe implements PipeTransform {
  transform(value: unknown, replacementString = emDash): string {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      value === Infinity ||
      Number.isNaN(value)
    ) {
      return replacementString;
    }
    return value as string;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bytes' })
export class BytesPipe implements PipeTransform {
  /**
   * @param si true for powers of 1000 (kB), false for powers of 1024 (KiB)
   * @param dp decimal places
   * @param alwaysShowDp keep a trailing `.0`
   */
  transform(bytes: number, si = true, dp = 1, alwaysShowDp = false): string {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    const fixed = bytes.toFixed(dp);
    if (!alwaysShowDp && fixed.endsWith('.0')) {
      return bytes.toFixed(0) + ' ' + units[u];
    }

    return fixed + ' ' + units[u];
  }
}

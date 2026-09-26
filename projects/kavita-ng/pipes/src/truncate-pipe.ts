import { inject, Pipe, PipeTransform } from '@angular/core';
import { BreakpointService } from '@kareadita/kavita-ng/layout';

@Pipe({ name: 'truncate', pure: false })
export class TruncatePipe implements PipeTransform {
  private readonly breakpointService = inject(BreakpointService);

  transform(value: string | null | undefined, length = 35, always = false): string {
    if (!value) return value ?? '';
    if (!this.breakpointService.isMobileOrBelow() && !always) return value;
    return value.length > length ? `${value.slice(0, length).trim()}…` : value;
  }
}

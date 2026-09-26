import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeUrl' })
export class SafeUrlPipe implements PipeTransform {
  private readonly dom = inject(DomSanitizer);

  transform(value: string | null | undefined): string | null {
    if (value === null || value === undefined) return null;
    return this.dom.sanitize(SecurityContext.URL, value);
  }
}

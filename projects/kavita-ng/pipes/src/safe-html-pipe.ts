import { inject, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  private readonly dom = inject(DomSanitizer);

  transform(value: string): string | null {
    return this.dom.sanitize(SecurityContext.HTML, value);
  }
}

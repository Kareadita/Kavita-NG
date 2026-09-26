import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({ name: 'safeStyle' })
export class SafeStylePipe implements PipeTransform {
  private readonly sanitizer = inject(DomSanitizer);

  transform(style: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}

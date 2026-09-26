import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';
import { Breakpoint } from '@kareadita/kavita-ng/layout';

@Pipe({ name: 'breakpoint', pure: false })
export class BreakpointPipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  transform(value: Breakpoint): string {
    const v = parseInt(value + '', 10) as Breakpoint;

    switch (v) {
      case Breakpoint.Never:
        return this.translator.translate('breakpoint-pipe.never');
      case Breakpoint.Mobile:
        return this.translator.translate('breakpoint-pipe.mobile');
      case Breakpoint.Tablet:
        return this.translator.translate('breakpoint-pipe.tablet');
      case Breakpoint.Desktop:
        return this.translator.translate('breakpoint-pipe.desktop');
    }
    throw new Error('unknown breakpoint value: ' + value);
  }
}

import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';

@Pipe({ name: 'duration', pure: false })
export class DurationPipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  transform(seconds: number): string {
    const t = this.translator;
    if (seconds < 60) return t.translate('duration-pipe.seconds', { num: seconds });
    if (seconds < 3600)
      return t.translate('duration-pipe.minutes', { num: Math.floor(seconds / 60) });

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return minutes > 0
      ? t.translate('duration-pipe.combo', { hour: hours, min: minutes })
      : t.translate('duration-pipe.hours', { num: hours });
  }
}

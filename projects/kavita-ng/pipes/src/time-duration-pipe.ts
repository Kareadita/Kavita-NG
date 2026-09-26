import { inject, Pipe, PipeTransform } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';

@Pipe({ name: 'timeDuration', pure: false })
export class TimeDurationPipe implements PipeTransform {
  private readonly translator = inject(KNG_TRANSLATOR);

  transform(hours: number): string {
    const t = this.translator;
    if (hours === 0) return t.translate('time-duration-pipe.hours', { value: hours });
    if (hours < 1)
      return t.translate('time-duration-pipe.minutes', { value: (hours * 60).toFixed(1) });
    if (hours < 24) return t.translate('time-duration-pipe.hours', { value: hours.toFixed(1) });
    if (hours < 720)
      return t.translate('time-duration-pipe.days', { value: (hours / 24).toFixed(1) });
    if (hours < 8760)
      return t.translate('time-duration-pipe.months', { value: (hours / 720).toFixed(1) });
    return t.translate('time-duration-pipe.years', { value: (hours / 8760).toFixed(1) });
  }
}

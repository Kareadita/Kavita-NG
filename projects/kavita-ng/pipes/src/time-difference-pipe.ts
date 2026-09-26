import { inject, OnDestroy, Pipe, PipeTransform, signal } from '@angular/core';
import { KNG_TRANSLATOR } from '@kareadita/kavita-ng/i18n';
import { isMinDate } from './locale';

/**
 * "3 hours ago" or "in 3 hours", refreshing itself as time passes
 */
@Pipe({ name: 'timeDifference', pure: false })
export class TimeDifferencePipe implements PipeTransform, OnDestroy {
  private readonly translator = inject(KNG_TRANSLATOR);

  private tick = signal(0);
  private timer: number | null = null;

  transform(value: string | Date | number | null | undefined): string {
    const t = this.translator;
    if (
      value === '' ||
      value === null ||
      value === undefined ||
      (typeof value === 'string' && isMinDate(value))
    ) {
      return t.translate('time-difference-pipe.never');
    }

    this.tick(); // Read looks unused: it is what registers this pipe's timer with the view, so the timeout below re-renders it

    this.removeTimer();
    const d = new Date(value);
    const diffMs = d.getTime() - Date.now();
    const seconds = Math.round(Math.abs(diffMs / 1000));
    const future = diffMs > 0;
    const timeToUpdate = Number.isNaN(seconds) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;

    if (typeof window !== 'undefined') {
      this.timer = window.setTimeout(() => this.tick.update((v) => v + 1), timeToUpdate);
    }

    if (Number.isNaN(seconds)) {
      return '';
    }

    const minutes = Math.round(Math.abs(seconds / 60));
    const hours = Math.round(Math.abs(minutes / 60));
    const days = Math.round(Math.abs(hours / 24));
    const months = Math.round(Math.abs(days / 30.416));
    const years = Math.round(Math.abs(days / 365));

    if (seconds <= 45) return t.translate('time-difference-pipe.just-now');
    if (seconds <= 90) {
      return t.translate(future ? 'time-difference-pipe.min.in' : 'time-difference-pipe.min.ago');
    }
    if (minutes <= 45) {
      return t.translate(
        future ? 'time-difference-pipe.mins.in' : 'time-difference-pipe.mins.ago',
        { value: minutes },
      );
    }
    if (minutes <= 90) {
      return t.translate(future ? 'time-difference-pipe.hour.in' : 'time-difference-pipe.hour.ago');
    }
    if (hours <= 22) {
      return t.translate(
        future ? 'time-difference-pipe.hours.in' : 'time-difference-pipe.hours.ago',
        { value: hours },
      );
    }
    if (hours <= 36) {
      return t.translate(future ? 'time-difference-pipe.day.in' : 'time-difference-pipe.day.ago');
    }
    if (days <= 25) {
      return t.translate(
        future ? 'time-difference-pipe.days.in' : 'time-difference-pipe.days.ago',
        { value: days },
      );
    }
    if (days <= 45) {
      return t.translate(
        future ? 'time-difference-pipe.month.in' : 'time-difference-pipe.month.ago',
      );
    }
    if (days <= 345) {
      return t.translate(
        future ? 'time-difference-pipe.months.in' : 'time-difference-pipe.months.ago',
        {
          value: months,
        },
      );
    }
    if (days <= 545) {
      return t.translate(future ? 'time-difference-pipe.year.in' : 'time-difference-pipe.year.ago');
    }
    return t.translate(
      future ? 'time-difference-pipe.years.in' : 'time-difference-pipe.years.ago',
      { value: years },
    );
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number) {
    const min = 60;
    const hr = min * 60;
    const day = hr * 24;
    if (seconds < min) return 2;
    if (seconds < hr) return 30;
    if (seconds < day) return 300;
    return 3600;
  }
}

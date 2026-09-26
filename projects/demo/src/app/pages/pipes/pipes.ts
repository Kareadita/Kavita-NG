import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import { KNG_LANGS } from '@kareadita/kavita-ng/i18n';
import { Breakpoint } from '@kareadita/kavita-ng/layout';
import {
  BreakpointPipe,
  BytesPipe,
  CompactNumberPipe,
  DefaultDatePipe,
  DefaultValuePipe,
  DurationPipe,
  SafeUrlPipe,
  SentenceCasePipe,
  TimeDifferencePipe,
  TimeDurationPipe,
  TruncatePipe,
  UtcToLocalDatePipe,
  UtcToLocalTimePipe,
} from '@kareadita/kavita-ng/pipes';

const hour = 60 * 60 * 1000;

@Component({
  selector: 'demo-pipes',
  templateUrl: './pipes.html',
  styleUrl: './pipes.scss',
  imports: [
    BreakpointPipe,
    BytesPipe,
    CompactNumberPipe,
    DefaultDatePipe,
    DefaultValuePipe,
    DurationPipe,
    SafeUrlPipe,
    SentenceCasePipe,
    TimeDifferencePipe,
    TimeDurationPipe,
    TruncatePipe,
    UtcToLocalDatePipe,
    UtcToLocalTimePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pipes {
  private readonly transloco = inject(TranslocoService);

  protected readonly languages = ['en', ...Object.keys(KNG_LANGS)];
  protected readonly lang = toSignal(this.transloco.langChanges$, { initialValue: 'en' });
  protected readonly threeHoursAgo = new Date(Date.now() - 3 * hour).toISOString();
  protected readonly inTwoDays = new Date(Date.now() + 48 * hour).toISOString();
  protected readonly tablet = Breakpoint.Tablet;

  protected select(lang: string) {
    this.transloco.setActiveLang(lang);
  }
}

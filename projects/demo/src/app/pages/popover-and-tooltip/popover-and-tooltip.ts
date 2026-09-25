import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-popover-and-tooltip',
  templateUrl: './popover-and-tooltip.html',
  styleUrl: './popover-and-tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverAndTooltip {}

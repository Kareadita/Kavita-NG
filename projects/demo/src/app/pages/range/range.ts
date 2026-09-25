import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-range',
  templateUrl: './range.html',
  styleUrl: './range.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Range {}

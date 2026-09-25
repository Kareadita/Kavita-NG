import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-progress',
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Progress {}

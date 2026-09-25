import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-utilities',
  templateUrl: './utilities.html',
  styleUrl: './utilities.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Utilities {}

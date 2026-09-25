import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-buttons',
  templateUrl: './buttons.html',
  styleUrl: './buttons.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Buttons {}

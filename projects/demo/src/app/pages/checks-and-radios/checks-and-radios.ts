import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-checks-and-radios',
  templateUrl: './checks-and-radios.html',
  styleUrl: './checks-and-radios.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecksAndRadios {}

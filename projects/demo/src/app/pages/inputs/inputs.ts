import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-inputs',
  templateUrl: './inputs.html',
  styleUrl: './inputs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Inputs {}

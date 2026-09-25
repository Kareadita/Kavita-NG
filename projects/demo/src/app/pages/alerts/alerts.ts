import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-alerts',
  templateUrl: './alerts.html',
  styleUrl: './alerts.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alerts {}

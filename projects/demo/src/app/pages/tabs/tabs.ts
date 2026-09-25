import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-tabs',
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs {}

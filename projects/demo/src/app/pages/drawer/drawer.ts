import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-drawer',
  templateUrl: './drawer.html',
  styleUrl: './drawer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Drawer {}

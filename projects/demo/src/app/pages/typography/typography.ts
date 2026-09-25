import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-typography',
  templateUrl: './typography.html',
  styleUrl: './typography.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Typography {}

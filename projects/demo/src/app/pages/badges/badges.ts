import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-badges',
  templateUrl: './badges.html',
  styleUrl: './badges.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badges {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-breadcrumb',
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Breadcrumb {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Table {}

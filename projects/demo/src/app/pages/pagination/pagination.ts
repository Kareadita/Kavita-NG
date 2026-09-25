import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-pagination',
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {}

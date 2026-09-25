import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-list-group',
  templateUrl: './list-group.html',
  styleUrl: './list-group.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListGroup {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-dropdown',
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dropdown {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-accordion',
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Accordion {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'demo-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {}

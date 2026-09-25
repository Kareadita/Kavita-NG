import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'demo-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly stylesUsage = [
    `@use 'bootstrap/scss/bootstrap';`,
    `@use '@kareadita/kavita-ng/styles';`,
    `@use '@kareadita/kavita-ng/styles/fonts';`,
  ].join('\n');
}

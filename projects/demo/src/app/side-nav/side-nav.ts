import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NAV_GROUPS } from '../nav';

@Component({
  selector: 'demo-side-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.open]': 'open()' },
})
export class SideNav {
  readonly open = input(false);
  readonly navigated = output();

  protected readonly groups = NAV_GROUPS;
}

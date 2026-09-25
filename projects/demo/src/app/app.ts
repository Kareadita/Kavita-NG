import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SideNav } from './side-nav/side-nav';
import { ThemeSwitcher } from './theme-switcher/theme-switcher';

@Component({
  selector: 'demo-root',
  imports: [RouterOutlet, RouterLink, SideNav, ThemeSwitcher],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected menuOpen = signal(false);
}

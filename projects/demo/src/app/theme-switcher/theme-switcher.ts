import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';

export const DEMO_THEMES = [
  { id: 'default', label: 'Default' },
  { id: 'sakura', label: 'Sakura' },
  { id: 'midnight', label: 'Midnight' },
] as const;

export type DemoThemeId = (typeof DEMO_THEMES)[number]['id'];

const storageKey = 'demo-theme';

@Component({
  selector: 'demo-theme-switcher',
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcher {
  private readonly document = inject(DOCUMENT);

  protected readonly themes = DEMO_THEMES;
  protected theme = signal<DemoThemeId>(readStoredTheme());

  constructor() {
    effect(() => {
      const theme = this.theme();
      const body = this.document.body;
      DEMO_THEMES.forEach((t) => body.classList.remove(`theme-${t.id}`));
      if (theme !== 'default') body.classList.add(`theme-${theme}`);

      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // Storage can be blocked, the theme still applies for this visit
      }
    });
  }

  protected select(value: string) {
    const match = DEMO_THEMES.find((t) => t.id === value);
    if (match) this.theme.set(match.id);
  }
}

function readStoredTheme(): DemoThemeId {
  try {
    const stored = localStorage.getItem(storageKey);
    return DEMO_THEMES.find((t) => t.id === stored)?.id ?? 'default';
  } catch {
    return 'default';
  }
}

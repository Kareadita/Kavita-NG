import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import tokensJson from '@kareadita/kavita-ng/styles/tokens.json';

interface ManifestToken {
  name: string;
  value: string | null;
}

interface TokenManifest {
  groups: { name: string; tokens: ManifestToken[] }[];
}

interface TokenRow {
  cssVar: string;
  defaultValue: string | null;
  derivedFrom: string | null;
  swatch: string | null;
}

interface TokenGroup {
  name: string;
  rows: TokenRow[];
}

const manifest: TokenManifest = tokensJson;

const allTokens = new Map<string, ManifestToken>(
  manifest.groups.flatMap((g) => g.tokens).map((t) => [t.name, t]),
);

function parentOf(token: ManifestToken) {
  return token.value?.startsWith('@') ? token.value.slice(1) : null;
}

function fallbackChain(name: string): string {
  const parent = parentOf(allTokens.get(name)!);
  return parent ? `var(--kng-${name}, ${fallbackChain(parent)})` : `var(--kng-${name})`;
}

function isColor(name: string) {
  return /-(color|shade|bg)$/.test(name) || name.startsWith('elevation-layer');
}

const groups: TokenGroup[] = manifest.groups.map((group) => ({
  name: group.name,
  rows: group.tokens.map((token) => {
    const parent = parentOf(token);
    return {
      cssVar: `--kng-${token.name}`,
      defaultValue: parent ? null : token.value,
      derivedFrom: parent ? `--kng-${parent}` : null,
      swatch: isColor(token.name) ? fallbackChain(token.name) : null,
    };
  }),
}));

@Component({
  selector: 'demo-tokens',
  templateUrl: './tokens.html',
  styleUrl: './tokens.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tokens {
  private readonly document = inject(DOCUMENT);

  protected readonly groups = groups;
  protected overrides = signal<Record<string, string>>({});

  constructor() {
    let applied: string[] = [];
    const clearApplied = () => applied.forEach((v) => this.document.body.style.removeProperty(v));

    effect(() => {
      clearApplied();
      const entries = Object.entries(this.overrides()).filter(([, value]) => value.trim() !== '');
      entries.forEach(([cssVar, value]) => this.document.body.style.setProperty(cssVar, value));
      applied = entries.map(([cssVar]) => cssVar);
    });

    inject(DestroyRef).onDestroy(clearApplied);
  }

  protected setOverride(cssVar: string, value: string) {
    this.overrides.update((current) => ({ ...current, [cssVar]: value }));
  }

  protected reset() {
    this.overrides.set({});
  }
}

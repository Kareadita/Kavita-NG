import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'kng-styles-host',
  templateUrl: './styles.browser.spec.html',
  styleUrl: './styles.browser.spec.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class StylesHost {}

describe('styles', () => {
  const themes = ['base-only-theme', 'derived-theme'];
  let host: HTMLElement;

  const style = (selector: string) => getComputedStyle(host.querySelector(selector)!);

  beforeEach(async () => {
    // Bootstrap transitions .btn colors over 0.15s, so a read right after a theme change sees the old color
    document.body.classList.add('no-transitions');
    const fixture = TestBed.createComponent(StylesHost);
    await fixture.whenStable();
    host = fixture.nativeElement;
  });

  afterEach(() => document.body.classList.remove('no-transitions', ...themes));

  it('declares base tokens on :root', () => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(
      '--kng-primary-color',
    );

    expect(value.trim()).toBe('#4ac694');
  });

  it('fills the primary button from the default primary color', () => {
    expect(style('.btn-primary').backgroundColor).toBe('rgb(74, 198, 148)');
  });

  it('recolors derived tokens when a body theme sets only the base token', () => {
    document.body.classList.add('base-only-theme');

    expect(style('.btn-primary').backgroundColor).toBe('rgb(255, 0, 0)');
    expect(style('.btn-outline-primary').borderColor).toBe('rgb(255, 0, 0)');
  });

  it('lets a body theme override a derived token directly', () => {
    document.body.classList.add('derived-theme');

    expect(style('.btn-primary').backgroundColor).toBe('rgb(0, 0, 255)');
    expect(style('.btn-outline-primary').borderColor).toBe('rgb(74, 198, 148)');
  });

  it('sets the body font from the font-family token', () => {
    expect(getComputedStyle(document.body).fontFamily).toContain('Poppins');
  });
});

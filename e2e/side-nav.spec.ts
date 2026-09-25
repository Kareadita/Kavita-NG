import { expect, test } from '@playwright/test';

test('every side nav link opens a page with a matching heading', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Sections' });
  const labels = await nav.getByRole('link').allTextContents();

  expect(labels.length).toBeGreaterThan(10);

  for (const label of labels.map((l) => l.trim()).filter((l) => l !== 'Overview')) {
    await nav.getByRole('link', { name: label, exact: true }).click();

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(label);
    await expect(nav.getByRole('link', { name: label, exact: true })).toHaveAttribute(
      'aria-current',
      'page',
    );
  }
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the menu button opens the side nav and a link closes it', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Sections' });

    await expect(nav).toBeHidden();

    await page.getByRole('button', { name: 'Menu' }).click();
    await expect(nav).toBeVisible();

    await nav.getByRole('link', { name: 'Buttons', exact: true }).click();
    await expect(nav).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Buttons');
  });
});

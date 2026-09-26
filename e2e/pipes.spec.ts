import { expect, test } from '@playwright/test';

test('switching the language re-renders pipe output', async ({ page }) => {
  await page.goto('/pipes');
  const defaultDate = page
    .getByRole('row', { name: /null \| defaultDate/ })
    .getByRole('cell')
    .nth(1);
  const duration = page
    .getByRole('row', { name: /7500 \| duration/ })
    .getByRole('cell')
    .nth(1);

  await expect(defaultDate).toHaveText('Never');

  await page.getByLabel('Language').selectOption('de');

  await expect(defaultDate).toHaveText('Niemals');
  await expect(duration).toHaveText('2h 5m');
});

import { expect, test } from '@playwright/test';

test('home page renders', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Kavita-NG');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kavita-NG');
});

test('unknown routes fall back to home', async ({ page }) => {
  await page.goto('/does-not-exist');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kavita-NG');
});

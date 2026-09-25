import { expect, test } from '@playwright/test';

const primaryButton = (page: import('@playwright/test').Page) =>
  page.getByRole('button', { name: 'btn-primary', exact: true });

test('the default theme fills primary buttons with the default primary color', async ({ page }) => {
  await page.goto('/buttons');

  await expect(primaryButton(page)).toHaveCSS('background-color', 'rgb(74, 198, 148)');
});

test('switching to a theme that only sets the primary color recolors primary buttons', async ({
  page,
}) => {
  await page.goto('/buttons');
  await page.getByLabel('Theme').selectOption('sakura');

  await expect(page.locator('body')).toHaveClass(/theme-sakura/);
  await expect(primaryButton(page)).toHaveCSS('background-color', 'rgb(233, 30, 99)');
});

test('the chosen theme survives a reload', async ({ page }) => {
  await page.goto('/buttons');
  await page.getByLabel('Theme').selectOption('midnight');
  await page.reload();

  await expect(page.locator('body')).toHaveClass(/theme-midnight/);
  await expect(page.getByLabel('Theme')).toHaveValue('midnight');
});

test('a token override on the tokens page applies to the page', async ({ page }) => {
  await page.goto('/tokens');
  await page.getByLabel('Override --kng-primary-color', { exact: true }).fill('rgb(1, 2, 3)');

  await expect(page.locator('body')).toHaveCSS('--kng-primary-color', 'rgb(1, 2, 3)');

  await page.getByRole('button', { name: 'Reset overrides' }).click();
  await expect(page.getByLabel('Override --kng-primary-color', { exact: true })).toHaveValue('');
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.pause();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Christophe mon sucre');
    await page.pause();
    await page.keyboard.press('Enter');
    await page.pause();
    await expect(page.getByText('Christophe mon sucre')).toBeVisible();
    await page.pause();
});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.pause();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Acheter du pain');
    await page.pause();
    await page.keyboard.press('Enter');
    await page.pause();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Aller courir');
    await page.pause();
    await page.keyboard.press('Enter');
    await page.pause();    
    await expect(page.getByText('Acheter du pain')).toBeVisible();
    await expect(page.getByText('Aller courir')).toBeVisible();
    await page.pause();
    await page.getByRole('listitem').filter({ hasText: 'Acheter du pain' }).getByLabel('Toggle Todo').check();
    await page.pause();    
    await expect(page.getByText('Acheter du pain')).toBeVisible();
    await expect(page.getByText('Aller courir')).toBeVisible();
    await page.pause();
});
import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

// Timeout global pour éviter les erreurs de 5 secondes
setDefaultTimeout(60 * 1000);

// Avant chaque scénario : on lance le navigateur
Before(async () => {
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  page = await context.newPage();
});

// Après chaque scénario : on ferme le navigateur
After(async () => {
  if (browser) {
    await browser.close();
  }
});

// ------------------- Steps communs -------------------

Given('je suis sur la page TodoMVC', async () => {
  await page.goto('https://demo.playwright.dev/todomvc', {
    waitUntil: 'networkidle',
  });
});

When('j’ajoute la tâche {string}', async (task: string) => {
  await page.getByPlaceholder('What needs to be done?').fill(task);
  await page.keyboard.press('Enter');
});

Then('la tâche {string} est visible dans la liste', async (task: string) => {
  await expect(page.getByText(task)).toBeVisible();
});

// ------------------- Marquer comme terminée -------------------

When('je coche la tâche {string}', async (task: string) => {
  const todoItem = page.locator('li').filter({ hasText: task });
  await todoItem.locator('.toggle').check();
});

Then('la tâche {string} apparaît comme terminée', async (task: string) => {
  const todoItem = page.locator('li').filter({ hasText: task });
  await expect(todoItem).toHaveClass(/completed/);
});

// ------------------- Supprimer une tâche -------------------

When('je supprime la tâche {string}', async (task: string) => {
  const todoItem = page.locator('li').filter({ hasText: task });

  // Le bouton de suppression (.destroy) apparaît au survol
  await todoItem.hover();
  await todoItem.locator('.destroy').click();
});

Then(
  'la tâche {string} n’est plus visible dans la liste',
  async (task: string) => {
    await expect(page.getByText(task)).not.toBeVisible();
  }
);

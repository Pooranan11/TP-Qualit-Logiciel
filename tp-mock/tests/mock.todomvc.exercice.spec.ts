import { test, expect } from '@playwright/test';

test('exercice LocalStorage TodoMVC', async ({ page }) => {
  await page.addInitScript(() => {
    const todos = [
      { title: 'Faire les courses', completed: false },
      { title: 'Sortir le chien', completed: false },
      { title: 'Réviser le TP Playwright', completed: true },
      { title: 'Aller à la salle de sport', completed: false },
    ];
    // On supprime la 1ʳᵉ tâche
    todos.shift();
    localStorage.setItem('react-todos', JSON.stringify(todos));
  });

  await page.goto('https://demo.playwright.dev/todomvc');

  await expect(page.getByText('Sortir le chien')).toBeVisible();
  await expect(page.getByText('Réviser le TP Playwright')).toBeVisible();
  await expect(page.getByText('Aller à la salle de sport')).toBeVisible();

  // La tâche supprimée ne doit pas être visible
  await expect(page.getByText('Faire les courses')).toHaveCount(0);
});
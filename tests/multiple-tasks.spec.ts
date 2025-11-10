import { test } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';

test('ajouter plusieurs tâches et en compléter une seule', async ({ page }) => {
  const todoPage = new TodoPage(page);
  await todoPage.goto();

  const tasks = ['Acheter du lait', 'Sortir le chien', 'Coder un test Playwright'];

  for (const task of tasks) {
    await todoPage.addTask(task);
    await todoPage.isTaskVisible(task);
  }

  const taskToComplete = 'Sortir le chien';
  await todoPage.completeTask(taskToComplete);
  await todoPage.isTaskCompleted(taskToComplete);

  await page.pause();
});

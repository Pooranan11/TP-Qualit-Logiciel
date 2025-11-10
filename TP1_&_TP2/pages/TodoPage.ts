import { Page, expect } from '@playwright/test';

export class TodoPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }
    async addTask(task: string) {
        const input = this.page.getByRole('textbox', { name: 'What needs to be done?' });
        await input.fill(task);
        await this.page.keyboard.press('Enter');
    }
    async deleteTask(task: string) {
        const todoItem = this.page
            .getByRole('listitem')
            .filter({ hasText: task });

        await todoItem.hover();
        await todoItem.getByRole('button', { name: 'Delete' }).click();
    }
    async completeTask(task: string) {
        const todoItem = this.page
            .getByRole('listitem')
            .filter({ hasText: task })
            .getByLabel('Toggle Todo');
        await todoItem.check();
    }
    async isTaskVisible(task: string) {
        await expect(this.page.getByText(task)).toBeVisible();
    }
    async isTaskCompleted(task: string) {
        const todoItem = this.page.getByRole('listitem').filter({ hasText: task });
        await expect(todoItem).toHaveClass(/completed/);
    }
}

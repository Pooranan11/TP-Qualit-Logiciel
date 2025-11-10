import { test, expect } from '@playwright/test';

test('exercice 4.3 – mock dynamique de GET /api/{resource}', async ({ page }) => {
    await page.route('**/api/*', async route => {
        const request = route.request();
        const url = new URL(request.url());
        const params = Object.fromEntries(url.searchParams.entries());
        console.log('Requête interceptée :', url.toString());
        console.log('Paramètres reçus :', params);

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Résultat mocké côté Swagger',
                page: params.page || 1,
                per_page: params.per_page || 2,
                data: [
                    { id: 1, nom: `Utilisateur ${params.page || 1}-A` },
                    { id: 2, nom: `Utilisateur ${params.page || 1}-B` }
                ]
            })
        });
    });

    await page.goto('https://reqres.in/api-docs/');
    await expect(page.getByText('ReqRes API')).toBeVisible();
    await page.pause();
    await page.unroute('**/api/*');
});

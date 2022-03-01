import { test, expect } from '@playwright/test';

test('Adding two elements to the cart', async ({ page }) => {
    // Go to http://localhost:8080/
    await page.goto('http://localhost:8080/');
    // Click text=Camara😊Oferta500.000 Lorem ipsum dolor sit amet consectetur adipisicing elit. D >> #addCartButton
    await page.locator('text=Camara😊Oferta500.000 Lorem ipsum dolor sit amet consectetur adipisicing elit. D >> #addCartButton').click();
    // Click text=Camara😊Oferta Quedan pocas unidades 500.000 Lorem ipsum dolor sit amet consecte >> #addCartButton
    await page.locator('text=Camara😊Oferta Quedan pocas unidades 500.000 Lorem ipsum dolor sit amet consecte >> #addCartButton').click();
    // Click text=Camara😊Oferta Producto esta por terminarse 500.000 Lorem ipsum dolor sit amet c >> #addCartButton
    await page.locator('text=Camara😊Oferta Producto esta por terminarse 500.000 Lorem ipsum dolor sit amet c >> #addCartButton').click();
    // Click text=Microfono😊Nuevo Producto esta por terminarse 900.000 Lorem ipsum dolor sit amet >> #addCartButton
    await page.locator('text=Microfono😊Nuevo Producto esta por terminarse 900.000 Lorem ipsum dolor sit amet >> #addCartButton').click();
    // Click text=Carro (2)
    await expect(page.locator('.cart')).toHaveText("Carro (2)");
});
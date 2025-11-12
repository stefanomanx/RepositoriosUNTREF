import { test, expect } from '@playwright/test';

// Usa variables de entorno si quieres cambiar credenciales sin tocar el test
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'tomsmith';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'SuperSecretPassword!';

test('Login to the-internet (Playwright)', async ({ page }) => {
  // Navegar a la página de login
  await page.goto('https://the-internet.herokuapp.com/login');

  // Rellenar formulario y enviar
  await page.fill('#username', ADMIN_EMAIL);
  await page.fill('#password', ADMIN_PASSWORD);
  await page.click('button[type="submit"]');

  // Validaciones: URL y mensaje flash
  await expect(page).toHaveURL(/.*\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

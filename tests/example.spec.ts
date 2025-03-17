import { test, expect, chromium } from '@playwright/test';

// test('Homepage should have the correct title', async ({ page }) => {
//   await page.goto('http://localhost:4200'); // Open the Angular app
//   await expect(page).toHaveTitle(/my-ang-playwright-app/); // Validate the title contains 'Angular'
// });

// test('Clicking a button updates the text', async ({ page }) => {
//   await page.goto('http://localhost:4200');
//   await page.getByText('Click Me').click(); // Clicks a button with text "Click Me"
//   await expect(page.getByText('Button Clicked!')).toBeVisible();
// });

test.describe('Signup Page Tests', () => {
  const link = 'http://localhost:4200/login'
  test('Verify Invalid email format', async ({ page }) => {
    const toast = page.locator('.toast-center-center');
    await page.goto(link);
    await page.waitForLoadState('networkidle', { timeout: 1000 });

    await page.locator('text=Signup').click();
    await page.waitForTimeout(1000)
    await page.fill('[placeholder="Username"]', 'User001')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Email"]', 'user')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Phonenumber"]', '9000983211')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Password"]', 'Test@1234')
    await page.click('//button[@type="submit"]');
    await page.waitForSelector('.toast-center-center', { timeout: 5000 });
    await expect(toast).toHaveText('Invalid email format!');
    // await expect(page.locator('text=Signup successful!')).toBeVisible();
    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'screenshots/signup/' + 'invalid_email_format_sc' + Math.floor(Math.random() * 100) + '.png', fullPage: true });
  });

  test('Verify password validation (too short)', async ({ page }) => {
    await page.locator('text=Signup').click();
    await page.waitForTimeout(1000)
    await page.fill('[placeholder="Username"]', 'User001')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Email"]', 'user@gmai.com')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Phonenumber"]', '9000983211')
    await page.waitForTimeout(500)
    await page.fill('[placeholder="Password"]', '1234')
    await page.click('//button[@type="submit"]');
    const toast = page.locator('.toast-center-center');
    await expect(toast).toHaveText('Password must be at least 6 characters and include a number.');
    await page.waitForTimeout(2000)
    await page.screenshot({ path: 'screenshots/signup/' + 'incorrect_password_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
  })

  
})
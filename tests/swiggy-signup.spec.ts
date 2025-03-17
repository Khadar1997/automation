import { test, expect } from '@playwright/test';


test.describe('Signup Page Tests', () => {
    const link = 'https://www.swiggy.com/restaurants'
    const randomString = Math.random().toString(36).substring(2, 15);
    const domains = ["example.com", "testmail.com", "user.com"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const rand_email = `${randomString}@${domain}`;

    const signup_users_info = [
        { selector: 'input[name="mobile"]', value: '9000234151', already_exist: '7729809645', invalid_name: '9000234151', valid: '7729809645' },
        { selector: 'input[name="name"]', value: 'User', already_exist: 'Test', invalid_name: '9000234151', valid: 'User' },
        { selector: 'input[name="email"]', value: 'User@gmail.com', already_exist: 'test@gmail.com', invalid_name: 'User@gmail.com', valid: rand_email }
    ];
    const empty_fields_error_toasts = ['Enter your phone number', 'Enter your name', 'Invalid email address'];

    // Test Case 1
    test('Empty Inputs', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator('text=Sign In').click();
        await page.waitForTimeout(500)
        await page.locator('text=create an account').click();
        await page.waitForTimeout(500)
        await page.locator('text=CONTINUE').click();
        await page.waitForTimeout(500)
        for (const toast of empty_fields_error_toasts) {
            const element = page.getByText(toast);
            const color = await element.evaluate(el => getComputedStyle(el).color);
            expect(color).toBe('rgb(250, 74, 91)');
        }
        await page.screenshot({ path: 'screenshots/' + 'empty_ss' + Math.floor(Math.random() * 1000) + '.png', fullPage: false });
    })

    // Test Case 2
    test('Invalid Name', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator('text=Sign In').click();
        await page.waitForTimeout(500)
        await page.locator('text=create an account').click();
        await page.waitForTimeout(500)
        for (const users of signup_users_info) {
            await page.fill(users.selector, users.invalid_name);
            await page.waitForTimeout(500);
        }
        await page.locator('text=CONTINUE').click();
        await page.waitForTimeout(500);
        await expect(page.locator('text="invalid name"')).toBeVisible();
        await page.screenshot({ path: 'screenshots/' + 'name_ss' + Math.floor(Math.random() * 1000) + '.png', fullPage: false });
    })

    // Test Case 3
    test('Mobile Number Already Exists', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator('text=Sign In').click();
        await page.waitForTimeout(500)
        await page.locator('text=create an account').click();
        await page.waitForTimeout(500)
        for (const users of signup_users_info) {
            await page.fill(users.selector, users.value);
            await page.waitForTimeout(500);
        }
        await page.locator('text=CONTINUE').click();
        await page.waitForTimeout(500);
        await expect(page.locator('text="Mobile number already exists"')).toBeVisible();
        await page.screenshot({ path: 'screenshots/' + 'number_ss' + Math.floor(Math.random() * 1000) + '.png', fullPage: false });
    })

    // Test Case 4
    test('Email Already Exists', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator('text=Sign In').click();
        await page.waitForTimeout(500)
        await page.locator('text=create an account').click();
        await page.waitForTimeout(500)
        for (const users of signup_users_info) {
            await page.fill(users.selector, users.already_exist);
            await page.waitForTimeout(500);
        }
        await page.locator('text=CONTINUE').click();
        await page.waitForTimeout(500);
        await expect(page.locator('text="Email id already exists"')).toBeVisible();
        await page.screenshot({ path: 'screenshots/' + 'email_ss' + Math.floor(Math.random() * 1000) + '.png', fullPage: false });
    })

    // Test Case 5
    test('InValid OTP', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.locator('text=Sign In').click();
        await page.waitForTimeout(500)
        await page.locator('text=create an account').click();
        await page.waitForTimeout(500)
        for (const users of signup_users_info) {
            await page.fill(users.selector, users.valid);
            await page.waitForTimeout(500);
        }
        await page.locator('text=CONTINUE').click();
        await page.waitForTimeout(500);
        await page.fill('text=" One time password"', '12345')
        await page.waitForTimeout(500);
        await page.locator('text= VERIFY OTP').click();
        await page.waitForTimeout(500);
        await expect(page.locator('text="Invalid or incorrect OTP"')).toBeVisible();
        await page.screenshot({ path: 'screenshots/' + 'otp_ss' + Math.floor(Math.random() * 1000) + '.png', fullPage: false });
        await page.waitForTimeout(500);
    })
})
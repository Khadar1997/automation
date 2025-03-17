// @ts-check
import { test, expect } from '@playwright/test';
import { error, time } from 'console';
const { chromium } = require('playwright');


test.describe('Signup Page Tests', () => {
    const link = 'http://localhost:4200/login'
    try {
        // Test Case 1
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
            await page.waitForTimeout(2000)
            await page.screenshot({ path: 'screenshots/signup/' + 'invalid_email_format_sc' + Math.floor(Math.random() * 100) + '.png', fullPage: true });
        });

        // Test Case 2
        test('Verify password validation (too short)', async ({ page }) => {
            const toast = page.locator('.toast-center-center');
            await page.goto(link);
            await page.waitForLoadState('networkidle', { timeout: 1000 });
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
            await expect(toast).toHaveText('Password must be at least 6 characters and include a number.');
            await page.waitForTimeout(2000)
            await page.screenshot({ path: 'screenshots/signup/' + 'incorrect_password_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
        });

        // Test Case 3
        test('Verify that the "Sign Up" button is disabled for invalid input', async ({ page }) => {
            const toast = page.locator('.toast-center-center');
            await page.goto(link);
            await page.waitForLoadState('networkidle', { timeout: 1000 });
            await page.locator('text=Signup').click();
            await page.waitForTimeout(1000)
            await page.fill('[placeholder="Username"]', 'User001')
            await expect(page.locator('//button[@type="submit"]')).toBeDisabled();
            await page.waitForTimeout(2000)
            await page.screenshot({ path: 'screenshots/signup/' + 'signup_button_disable' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
        });

        // Test Case 4
        test.only('User can successfully sign up with valid details', async ({ page }) => {
            await page.goto(link);
            await page.waitForLoadState('networkidle', { timeout: 1000 });
            await page.locator('text=Signup').click();
            await page.waitForTimeout(1000)
            await page.fill('[placeholder="Username"]', 'User001')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Email"]', 'user@gmai.com')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Phonenumber"]', '9000983211')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Password"]', 'Test@1234')
            await page.waitForTimeout(500)
            await page.click('//button[@type="submit"]');
            await page.waitForTimeout(500)
            await expect(page.locator('.toast-center-center')).toHaveText('Signup successful! You can now log in.');
            await page.waitForTimeout(2000)
            await page.screenshot({ path: 'screenshots/signup/' + 'signup_success_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
        })

        // Test Case 5
        test('Signup fails for an already registered email', async ({ page }) => {
            const toast = page.locator('.toast-center-center');
            await page.goto(link);
            await page.waitForLoadState('networkidle', { timeout: 1000 });
            await page.locator('text=Signup').click();
            await page.waitForTimeout(1000)
            await page.fill('[placeholder="Username"]', 'User001')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Email"]', 'user@gmai.com')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Phonenumber"]', '9000983211')
            await page.waitForTimeout(500)
            await page.fill('[placeholder="Password"]', 'Test@1234')
            await page.click('//button[@type="submit"]');
            await expect(toast).toHaveText('Email is already registered!');
            // **Check Local Storage for the Registered Email**
            const storedEmail = await page.evaluate(() => localStorage.getItem('email'));
            console.log('Stored Email in Local Storage:', storedEmail);

            // Verify that the email exists in local storage (if applicable)
            expect(storedEmail).toBe('user@gmai.com');
            await page.waitForTimeout(2000)
            await page.screenshot({ path: 'screenshots/signup/' + 'already_registered_email_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
        })
    } catch (error) {
        console.log(error, 'error');
    }
})




// test('signup', async ({ page }) => {
//     try {
//         // const now = new Date();
//         // const formattedDate = new Intl.DateTimeFormat('en-GB').format(now);
//         const toast = page.locator('.toast-center-center');
//         const browser = await chromium.launch({ headless: false });
//         const link = 'http://localhost:4200/login'
//         await page.goto(link);
//         await page.waitForLoadState('networkidle', { timeout: 1000 });


//         // <--------------- Signup Test Cases --------------->

//         // Test Case 2 Verify Invalid email format
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(1000)
//         await page.fill('[placeholder="Username"]', 'User001')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Phonenumber"]', '9000983211')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', 'Test@1234')
//         await page.click('//button[@type="submit"]');
//         await page.waitForSelector('.toast-center-center', { timeout: 5000 });
//         await expect(toast).toHaveText('Invalid email format!');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/signup/' + 'invalid_email_format_sc' + Math.floor(Math.random() * 100) + '.png', fullPage: true });
//         await page.reload();

//         // Test Case 3 Verify password validation (too short)
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(1000)
//         await page.fill('[placeholder="Username"]', 'User001')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user@gmai.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Phonenumber"]', '9000983211')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', '1234')
//         await page.click('//button[@type="submit"]');
//         await expect(toast).toHaveText('Password must be at least 6 characters and include a number.');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/signup/' + 'incorrect_password_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();

//         // Test Case 4 Verify that the "Sign Up" button is disabled for invalid input
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(1000)
//         await page.fill('[placeholder="Username"]', 'User001')
//         await expect(page.locator('//button[@type="submit"]')).toBeDisabled();
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/signup/' + 'signup_button_disable' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();

//         // Test Case 5 User can successfully sign up with valid details
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(1000)
//         await page.fill('[placeholder="Username"]', 'User001')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user@gmai.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Phonenumber"]', '9000983211')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', 'Test@1234')
//         await page.waitForTimeout(500)
//         await page.click('//button[@type="submit"]');
//         await page.waitForTimeout(500)
//         await expect(page.locator('.toast-center-center')).toHaveText('Signup successful! You can now log in.');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/signup/' + 'signup_success_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();

//         // Test Case 1 Signup fails for an already registered email
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(1000)
//         await page.fill('[placeholder="Username"]', 'User001')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user@gmai.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Phonenumber"]', '9000983211')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', 'Test@1234')
//         await page.click('//button[@type="submit"]');
//         await expect(toast).toHaveText('Email is already registered!');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/signup/' + 'already_registered_email_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();



//         // <--------------- Login Test Cases --------------->

//         // Test Case 1 Login with Incorrect Password
//         await page.locator('text=Signup').click();
//         await page.waitForTimeout(2000)
//         await page.locator('text=Login').click();
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user@gmai.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', '1234')
//         await page.click('//button[@type="submit"]');
//         await expect(toast).toHaveText('Password must be at least 6 characters long.');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/login/' + 'incorrect_password_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();

//         // Test Case 2 Verify Invalid email format
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', 'Test@1234')
//         await page.click('//button[@type="submit"]');
//         await expect(toast).toHaveText('Invalid email format!');
//         await page.waitForTimeout(2000)
//         await page.screenshot({ path: 'screenshots/login/' + 'invalid_email_format_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         await page.reload();
//         // Test Case 3 Brute Force Protection (Account Lock)
//         // await page.waitForTimeout(2000)
//         // await page.screenshot({ path: 'screenshots/' + 'img_' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });
//         // await page.reload();
//         // for (let i = 0; i < 5; i++) {
//         //     await page.fill('[placeholder="Email"]', 'user.com')
//         //     await page.fill('[placeholder="Password"]', '1234' + i)
//         //     await page.click('button[type="submit"]');
//         //     await page.waitForTimeout(1000);
//         // }
//         // await expect(toast).toHaveText('Your account has been locked due to too many failed attempts');

//         // Tast Case 4 Successful Login with Valid Credentials
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Email"]', 'user@gmai.com')
//         await page.waitForTimeout(500)
//         await page.fill('[placeholder="Password"]', 'Test@1234')
//         await page.click('//button[@type="submit"]');
//         await expect(toast).toHaveText('Welcome, Login successful.');
//         await page.screenshot({ path: 'screenshots/login/' + 'login_success_sc' + Math.floor(Math.random() * 1000) + '.png', fullPage: true });


//     } catch (error) {
//         console.log(error, 'error');

//     }
// })
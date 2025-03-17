import { test, expect } from '@playwright/test';


test.describe('Signup Page Tests', () => {
    const link = 'https://www.swiggy.com/restaurants'
    // Test Case 1
    test('Order Checkout', async ({ page }) => {
        await page.goto(link);
        await page.waitForLoadState('networkidle', { timeout: 5000 });
        await page.click('//img[@alt="restaurants curated for biryani"]');
        await page.waitForTimeout(500)
        await page.locator('text=Search').click();
        await page.waitForTimeout(500)
        const inputLocator = page.locator("//input[@placeholder='Search for restaurants and food']");
        await inputLocator.fill('The Golkonda Biriyani')
        await inputLocator.press('Enter')
        await page.click('//div[contains(text(),"The Golkonda Biriyani")]');
        await page.waitForTimeout(500)
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight);
        });
        await page.waitForTimeout(1000);
        const chickenBiriyaniTextLocator = page.locator('text=Chicken Biriyani');
        if (await chickenBiriyaniTextLocator.isVisible()) {
            console.log('Chicken Biriyani found!');
            await page.click('//img[@alt="Chicken Biriyani"]');
        }
        await page.click('//span[@class="sc-aXZVg iwOBvp"]');
        await page.waitForTimeout(500)
    })
})

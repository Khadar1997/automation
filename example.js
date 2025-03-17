const { chromium } = require('playwright');  // Using Chromium, you can replace it with 'firefox' or 'webkit'

(async () => {
  const browser = await chromium.launch({ headless: false });  // 'headless: false' shows the browser
  const page = await browser.newPage();
  await page.goto('https://example.com'); // Open a URL
  await page.screenshot({ path: 'example.png' }); // Take a screenshot
  await browser.close(); // Close the browser
})();

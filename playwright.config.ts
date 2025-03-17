import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    reporter: [['html', { outputFolder: 'playwright-report' }]], 
    use: {
        browserName: 'chromium',
        headless: true,
    },
    webServer: {
        command: 'ng serve',
        port: 4200,
        reuseExistingServer: !process.env['CI']
    }
});

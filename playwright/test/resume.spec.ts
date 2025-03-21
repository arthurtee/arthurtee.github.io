import { PlaywrightTestConfig, test, expect } from '@playwright/test';
import env from '../env';

test.describe.parallel('Resume', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(env.baseUrl);
  });

  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle("TEE Seng Tuan's Resume");
  });

  test('clicking email link should redirect to Gmail', async ({ page }) => {
    await page.click('data-testid=email-link');
    await expect(page).toHaveTitle('Gmail');
  });

  test('clicking LinkedIn link should redirect to LinkedIn', async ({ page }) => {
    await page.click('data-testid=linkedin-link');
    await expect(page).toHaveTitle(/LinkedIn/);
  });

//TODO: Investigate test case fails when run in headless mode.
  test('clicking GovTech link should create a new page for Video Analytics System (VAS)', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=gts-link');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle(/Video Analytics System (VAS) | Singapore Government Developer Portal/);
  });

  test('clicking CDG Zig link should create a new page for CDG Zig', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=cdg-link');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle(/ComfortDelGro/);
  });

  test('clicking Indeed link should create a new page for Indeed', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=ind-link');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/indeed/);
  });

  test('clicking Shopee link should create a new page for Shopee', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=sho-link');
    const newPage = await newPagePromise;
    await expect(newPage).toHaveTitle(/Shopee/);
  });

    test('clicking DevOps cert link should redirect to Apex Global', async ({ page }) => {
      await page.click('data-testid=devOps-cert-link');
      await expect(page).toHaveTitle(/APEX Global/);
    });

  test('clicking Google cert link should redirect to Coursera', async ({ page }) => {
    await page.click('data-testid=goo-cert-link');
    await expect(page).toHaveTitle(/Coursera/);
  });

  test('clicking Scrum cert link should redirect to BadgeCert', async ({ page }) => {
    await page.click('data-testid=sru-cert-link');
    await expect(page).toHaveTitle(/BadgeCert/);
  });

//TODO: Investigate test case fails when run in headless mode.
  test('clicking istqb link should redirect to istqb', async ({ page }) => {
    await page.click('data-testid=istqb-link');
    await expect(page).toHaveTitle(/ISTQB - Successful Candidate Register/);
  });

  test.describe('Footer navigation links', () => {
    test('clicking GitHub link should redirect to GitHub', async ({ page }) => {
      await page.click('data-testid=git-link');
      await expect(page).toHaveTitle(/arthurtee/);
    });

    test('clicking Home link should redirect to Home', async ({ page }) => {
      await page.click('data-testid=hom-link');
      await expect(page).toHaveTitle(/TEE Seng Tuan's Resume/);
    });

    test('clicking Template link should redirect to Template', async ({ page }) => {
      await page.click('data-testid=tem-link');
      await expect(page).toHaveTitle(/Template/);
    });
  });
});

const config: PlaywrightTestConfig = {
  use: {
    headed: false, // Enable headed mode to see the browser window
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
    workers: 2, // Number of parallel workers to run tests or based on CPU cores available
  },
};

export default config;

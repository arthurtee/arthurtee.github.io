import { PlaywrightTestConfig, test, expect } from '@playwright/test';

const liveUrl = 'https://arthurtee.github.io/';

test.describe.parallel('Resume', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(liveUrl);
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
  test('clicking Indeed link should create a new page of Indeed', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=ind-link');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveTitle(/Indeed/);
  });

  test('clicking Shopee link should create a new page of Shopee', async ({ page, context }) => {
    const newPagePromise = context.waitForEvent('page');
    await page.click('data-testid=sho-link');
    const newPage = await newPagePromise;
    await expect(newPage).toHaveTitle(/Shopee/);
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
  test('clicking Udemy cert link should redirect to Udemy', async ({ page }) => {
    await page.click('data-testid=ude-cert-link');
    await expect(page).toHaveTitle(/Udemy/);
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

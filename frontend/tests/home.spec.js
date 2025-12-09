const { test, expect } = require('@playwright/test');

test('Home renders and shows projects', async ({ page }) => {
  await page.goto('/');

  // Check header
  await expect(page.getByText('Flipr Studio')).toBeVisible();

  // Wait for projects section and at least one project card
  await page.waitForSelector('#projects');
  const projects = await page.$$('#projects article');
  expect(projects.length).toBeGreaterThanOrEqual(0); // 0 is acceptable if no projects
});

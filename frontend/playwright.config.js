// Playwright config for simple smoke tests
module.exports = {
  testDir: './tests',
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: 'http://localhost:3001',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
  },
};

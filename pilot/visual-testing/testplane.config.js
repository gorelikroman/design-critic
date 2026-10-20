// Testplane config for the visual-testing pilot.
//
// Two jobs over one Storybook:
//   npm run visual  — @testplane/storybook takes a screenshot of every story and
//                     compares it with the reference (regression: "what changed")
//   npm run layout  — tests/layout.testplane.js runs scripts/live-checks.js and
//                     axe-core in every story (lint: "what is broken")
//
// Environment:
//   STORYBOOK_URL  a running or static Storybook (default http://127.0.0.1:6006)
//   GRID_URL       a WebDriver endpoint; "local" lets Testplane fetch a browser
//                  itself; a chromedriver started by hand is http://127.0.0.1:9515
//   CHROME_BIN     a Chrome or Chromium binary when the grid does not supply one
//   PRODUCT        product layer the run belongs to (default reboost), used to
//                  keep references and findings apart per product

const path = require('path');

const STORYBOOK_URL = (process.env.STORYBOOK_URL || 'http://127.0.0.1:6006').replace(/\/$/, '');
const PRODUCT = process.env.PRODUCT || 'reboost';
// Screenshot runs and layout runs keep separate HTML reports.
const MODE = process.argv.includes('--storybook') ? 'visual' : 'layout';

const chrome = (width, height, mobile) => ({
  desiredCapabilities: {
    browserName: 'chrome',
    'goog:chromeOptions': Object.assign(
      {
        args: [
          '--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--hide-scrollbars',
          '--force-device-scale-factor=1', '--font-render-hinting=none', '--disable-gpu',
          `--window-size=${width},${height}`,
        ],
      },
      process.env.CHROME_BIN ? { binary: process.env.CHROME_BIN } : {},
      mobile ? { mobileEmulation: { deviceMetrics: { width, height, pixelRatio: 1, touch: true } } } : {},
    ),
  },
  windowSize: mobile ? null : `${width}x${height}`,
});

module.exports = {
  gridUrl: process.env.GRID_URL || 'local',
  baseUrl: STORYBOOK_URL,
  sessionsPerBrowser: 4,
  testsPerSession: 50,
  retry: 0,
  httpTimeout: 60000,
  pageLoadTimeout: 30000,
  waitTimeout: 10000,

  browsers: {
    desktop: chrome(1280, 800, false),
    mobile: chrome(390, 844, true),
  },

  sets: {
    layout: { files: ['tests/**/*.testplane.js'] },
  },

  // References live per product and browser: screens/<product>/<browser>/<test>/<state>.png
  screenshotsDir: test => path.join('screens', PRODUCT, test.browserId, test.fullTitle().replace(/[^\w.-]+/g, '_')),

  assertViewOpts: {
    ignoreDiffPixelCount: '0.1%',
    antialiasingTolerance: 4,
    // Components framed wider than a phone are captured as far as they go.
    allowViewportOverflow: true,
  },

  plugins: {
    '@testplane/storybook': {
      remoteStorybookUrl: STORYBOOK_URL,
      waitStorybookJsonTimeout: 60000,
    },
    'html-reporter/testplane': {
      enabled: true,
      path: path.join('reports', PRODUCT, `html-${MODE}`),
      defaultView: 'failed',
      diffMode: '3-up-scaled',
    },
  },
};

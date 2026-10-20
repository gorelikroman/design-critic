// One layout test per Storybook story: render the story, run axe-core and
// scripts/live-checks.js inside it, write the findings to
// reports/<product>/findings/<browser>/<story>.json, and fail the test when a
// blocking finding is present. The summary script turns the files into a report.

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const STORYBOOK_URL = (process.env.STORYBOOK_URL || 'http://127.0.0.1:6006').replace(/\/$/, '');
const PRODUCT = process.env.PRODUCT || 'reboost';
const ONLY = process.env.STORIES ? new RegExp(process.env.STORIES) : null;
const OUT = path.resolve(__dirname, '..', 'reports', PRODUCT, 'findings');

const CHECKS = fs.readFileSync(path.resolve(__dirname, '../../../scripts/live-checks.js'), 'utf8');
const AXE = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const AXE_RULES = ['color-contrast', 'button-name', 'link-name', 'aria-command-name', 'aria-toggle-field-name',
  'input-button-name', 'label', 'select-name', 'image-alt', 'role-img-alt', 'svg-img-alt', 'target-size'];

// Test files are read synchronously, so the story list is fetched in a child process.
const index = JSON.parse(execFileSync(process.execPath, ['-e',
  `fetch(${JSON.stringify(STORYBOOK_URL + '/index.json')}).then(r => r.text()).then(t => process.stdout.write(t))`,
], { maxBuffer: 64 * 1024 * 1024 }).toString());
const stories = Object.values(index.entries || index.stories)
  .filter(e => (e.type || 'story') === 'story')
  .filter(e => !ONLY || ONLY.test(e.id));

describe('layout', () => {
  for (const story of stories) {
    it(story.id, async ({ browser }) => {
      const browserId = browser.executionContext.browserId;
      await browser.url(`/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`);
      await browser.waitUntil(
        () => browser.execute(() => /sb-show-(main|errordisplay|nopreview)/.test(document.body.className)),
        { timeout: 15000, timeoutMsg: 'story did not render' },
      );
      await browser.execute(() => document.fonts && document.fonts.ready);
      await browser.pause(150);

      await browser.execute(AXE);
      const axeResults = await browser.executeAsync((rules, done) => {
        window.axe.run(document.body, { runOnly: { type: 'rule', values: rules }, resultTypes: ['violations'] })
          .then(r => done({ violations: r.violations.map(v => ({ id: v.id, help: v.help,
            nodes: v.nodes.map(n => ({ target: n.target, failureSummary: n.failureSummary })) })) }))
          .catch(e => done({ error: String(e), violations: [] }));
      }, AXE_RULES);

      // A story framed at a fixed width cannot be judged for reflow: the frame
      // sets the width. Only full-screen stories own the viewport.
      const layout = await browser.execute(() => {
        const r = window.__STORYBOOK_PREVIEW__ && window.__STORYBOOK_PREVIEW__.currentRender;
        return (r && r.story && r.story.parameters.layout) || 'padded';
      });

      await browser.execute(CHECKS);
      const result = await browser.execute(
        (touch, axe, reflow) => window.designCriticChecks({ root: document.body, touch, axeResults: axe, reflow }),
        browserId === 'mobile', axeResults, layout === 'fullscreen',
      );

      const record = Object.assign({ story: story.id, title: story.title, name: story.name, browser: browserId,
        product: PRODUCT, layout }, result);
      fs.mkdirSync(path.join(OUT, browserId), { recursive: true });
      fs.writeFileSync(path.join(OUT, browserId, `${story.id}.json`), JSON.stringify(record, null, 2));

      const blocking = result.findings.filter(f => f.severity === 'blocking');
      if (blocking.length) {
        throw new Error(`${blocking.length} blocking finding(s):\n` + blocking.slice(0, 8)
          .map(f => `  ${f.id} ${f.check} — ${f.selector || 'page'}: ${f.detail}`).join('\n'));
      }
    });
  }
});

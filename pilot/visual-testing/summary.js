// Turns reports/<product>/findings/<browser>/<story>.json into
// reports/<product>/layout-summary.md: findings grouped by rule (catalog ID,
// lens entry, severity), each rule with the stories and browsers it hits and
// the most frequent elements, ready for a design-critic review to triage.

const fs = require('fs');
const path = require('path');

const PRODUCT = process.env.PRODUCT || 'reboost';
const DIR = path.join(__dirname, 'reports', PRODUCT, 'findings');
const SEV = { blocking: 0, warning: 1, note: 2 };

const records = [];
for (const browser of fs.existsSync(DIR) ? fs.readdirSync(DIR) : []) {
  for (const f of fs.readdirSync(path.join(DIR, browser))) {
    records.push(JSON.parse(fs.readFileSync(path.join(DIR, browser, f), 'utf8')));
  }
}
if (!records.length) {
  console.error(`No findings under ${DIR}: run the layout set first.`);
  process.exit(1);
}

const byRule = new Map();
for (const r of records) {
  for (const f of r.findings) {
    const key = `${f.severity}|${f.id}|${f.check}`;
    if (!byRule.has(key)) byRule.set(key, { ...f, hits: [] });
    byRule.get(key).hits.push({ story: r.story, title: r.title, browser: r.browser, selector: f.selector, text: f.text, detail: f.detail });
  }
}
const rules = [...byRule.values()].sort((a, b) => SEV[a.severity] - SEV[b.severity] || b.hits.length - a.hits.length);

const stories = new Set(records.map(r => r.story));
const browsers = [...new Set(records.map(r => r.browser))].sort();
const clean = records.filter(r => !r.findings.some(f => f.severity === 'blocking'));
const count = s => rules.filter(r => r.severity === s).reduce((n, r) => n + r.hits.length, 0);

const lines = [];
lines.push(`# Layout checks — ${PRODUCT}`, '');
lines.push(`${stories.size} stories × ${browsers.length} browsers (${browsers.join(', ')}) = ${records.length} renders. ` +
  `${clean.length} renders with no blocking finding.`, '');
lines.push(`Findings: **${count('blocking')} blocking**, ${count('warning')} warning, ${count('note')} note. ` +
  'Severity is the rule’s; every finding is measured evidence for a review, not a verdict.', '');
lines.push('| Severity | ID | Check | Rule | Hits | Stories |', '|---|---|---|---|---|---|');
for (const r of rules) {
  lines.push(`| ${r.severity} | ${r.id} | ${r.check} | ${r.lens} | ${r.hits.length} | ${new Set(r.hits.map(h => h.story)).size} |`);
}
for (const r of rules) {
  lines.push('', `## ${r.severity} · ${r.id} · ${r.check}`, '', `${r.lens}`, '');
  const groups = new Map();
  for (const h of r.hits) {
    const k = h.detail.replace(/\d+(\.\d+)? × \d+(\.\d+)? px/g, 'N × N px').replace(/\d+(\.\d+)?/g, 'N').slice(0, 140);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(h);
  }
  const top = [...groups.values()].sort((a, b) => b.length - a.length).slice(0, 6);
  for (const g of top) {
    const ex = g[0];
    const where = [...new Set(g.map(h => `${h.story} (${h.browser})`))];
    lines.push(`- **${g.length}×** ${ex.detail}`);
    lines.push(`  - e.g. \`${ex.selector || 'page'}\`${ex.text ? ` “${ex.text}”` : ''}`);
    lines.push(`  - in ${where.slice(0, 5).join(', ')}${where.length > 5 ? `, +${where.length - 5} more` : ''}`);
  }
}
const out = path.join(__dirname, 'reports', PRODUCT, 'layout-summary.md');
fs.writeFileSync(out, lines.join('\n') + '\n');
fs.writeFileSync(path.join(__dirname, 'reports', PRODUCT, 'layout-summary.json'),
  JSON.stringify({ product: PRODUCT, renders: records.length, stories: stories.size, browsers, rules }, null, 2));
console.log(`${out}\n${count('blocking')} blocking, ${count('warning')} warning, ${count('note')} note across ${records.length} renders`);

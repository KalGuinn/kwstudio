import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:4321';
const output = process.argv[3] || '/private/tmp/claude/screenshots/full.png';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: output, fullPage: true });
await browser.close();
console.log(`Full-page screenshot saved: ${output}`);

import { chromium } from 'playwright';
const url = process.argv[2] || 'https://www.kelleewynne.com';
const output = process.argv[3] || '/private/tmp/claude/screenshots/screenshot.png';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.screenshot({ path: output, fullPage: false });
await browser.close();
console.log(`Screenshot saved: ${output}`);

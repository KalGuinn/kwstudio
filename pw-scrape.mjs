import { chromium } from 'playwright';
const url = process.argv[2];
const output = process.argv[3] || '/private/tmp/claude/scraped.txt';
const imgOutput = process.argv[4] || '/private/tmp/claude/scraped-screenshot.png';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);

// Get full rendered text content
const text = await page.evaluate(() => document.body.innerText);

// Get all image src values
const images = await page.evaluate(() => {
  return [...document.querySelectorAll('img')].map(img => ({
    src: img.src,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight
  }));
});

// Get full rendered HTML
const html = await page.content();

// Screenshot
await page.screenshot({ path: imgOutput, fullPage: true });

// Write results
import { writeFileSync } from 'fs';
writeFileSync(output, `=== TEXT CONTENT ===\n${text}\n\n=== IMAGES ===\n${JSON.stringify(images, null, 2)}\n`);
writeFileSync(output.replace('.txt', '.html'), html);

console.log(`Scraped: ${url}`);
console.log(`Text+images: ${output}`);
console.log(`HTML: ${output.replace('.txt', '.html')}`);
console.log(`Screenshot: ${imgOutput}`);
await browser.close();

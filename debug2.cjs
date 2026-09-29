const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message, err.stack));
  
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle0', timeout: 30000 });
  
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML CONTENT:', html.substring(0, 500));
  
  await browser.close();
})();

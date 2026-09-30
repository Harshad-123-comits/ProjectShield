const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  try {
    await page.goto('http://localhost:3001/cost', { waitUntil: 'networkidle0' });
    console.log('Opened Cost Analytics');
    await new Promise(r => setTimeout(r, 2000));
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();

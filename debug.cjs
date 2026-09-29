const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  page.on('error', err => console.log('ERROR:', err.toString()));
  
  console.log('Navigating...');
  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle2', timeout: 30000 });
  
  console.log('Done waiting. Checking content...');
  const content = await page.content();
  if (content.includes('Service Unavailable') || content.includes('Loading')) {
    console.log('Rendered something.');
  } else {
    console.log('White screen or crash?');
  }
  
  await browser.close();
})();

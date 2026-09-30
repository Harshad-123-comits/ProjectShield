const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.status() === 404) {
      console.log('404 URL:', response.url());
    }
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

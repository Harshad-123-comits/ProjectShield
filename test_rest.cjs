const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  const routes = ['/', '/projects', '/risk', '/gis'];
  for (const route of routes) {
    try {
      console.log(`Navigating to ${route}`);
      await page.goto(`http://localhost:3001${route}`, { waitUntil: 'networkidle0' });
      await new Promise(r => setTimeout(r, 1000));
      const container = await page.$('h2.text-xl');
      const errText = container ? await page.evaluate(el => el.textContent, container) : '';
      if (errText.includes('Something went wrong')) {
         console.log(`ERROR BOUNDARY on ${route}: ${errText}`);
      } else {
         console.log(`${route} OK!`);
      }
    } catch (err) {
      console.error(err);
    }
  }
  await browser.close();
})();

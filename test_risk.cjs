const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('BROWSER ERROR:', msg.text());
    }
  });

  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto('http://localhost:3001/risk', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    const html = await page.evaluate(() => document.body.innerHTML);
    if (html.includes('Something went wrong')) {
      console.log('ERROR BOUNDARY TRIGGERED');
      const err = await page.$('.text-red-500');
      if (err) {
         console.log(await page.evaluate(el => el.textContent, err));
      }
    } else {
      console.log('NO ERROR BOUNDARY');
      const noData = await page.evaluate(() => {
         const elements = Array.from(document.querySelectorAll('.text-slate-500'));
         return elements.map(el => el.textContent).filter(text => text && text.includes('No'));
      });
      console.log('Empty state messages:', noData);
    }
  } catch (err) {
    console.error(err);
  }
  await browser.close();
})();

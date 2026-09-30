const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  try {
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });
    console.log('Opened Overview');

    const navItems = await page.$$('aside button');
    console.log(`Found ${navItems.length} nav items in sidebar.`);
    
    for (let i = 0; i < navItems.length; i++) {
      const items = await page.$$('aside button');
      const item = items[i];
      const text = await page.evaluate(el => el.textContent.trim(), item);
      console.log(`\nClicking: ${text}`);
      
      await item.evaluate(b => b.click());
      await new Promise(r => setTimeout(r, 1000));
      
      const url = page.url();
      console.log(`URL changed to: ${url}`);
      
      const errorBoundary = await page.$('.text-red-500'); // generic check
      if (errorBoundary) {
        const errorText = await page.evaluate(el => el.textContent, errorBoundary);
        console.log(`ERROR FOUND: ${errorText}`);
      } else {
        console.log('Page loaded OK.');
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();

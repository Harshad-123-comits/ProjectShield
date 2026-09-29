const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.type(), msg.text()));
  
  await page.evaluateOnNewDocument(() => {
    window.addEventListener('error', e => {
      console.log('UNCAUGHT ERROR:', e.message, e.filename, e.lineno, e.colno, e.error ? e.error.stack : '');
    });
    window.addEventListener('unhandledrejection', e => {
      console.log('UNHANDLED REJECTION:', e.reason);
    });
  });

  await page.goto('http://127.0.0.1:3001', { waitUntil: 'networkidle0', timeout: 30000 });
  await browser.close();
})();

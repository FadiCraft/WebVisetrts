const puppeteer = require('puppeteer');

const randomWait = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

(async () => {
    console.log('بدء تشغيل السكربت على GitHub Actions...');

    // إعدادات ضرورية جداً ليعمل على سيرفرات GitHub (Linux)
    const browser = await puppeteer.launch({ 
        headless: true, 
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }); 
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    
    // إخفاء أن المتصفح آلي
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // روابطك
    const urls = [
        'https://www.effectivecpmnetwork.com/uh3kntmp?key=6987f3e883aa91cb2123ef65ff683dae',
       'https://www.effectivecpmnetwork.com/yaf3q826?key=18f1cfc726fc2f635d92b973e9a7d87c'
        
    ];

    for (let url of urls) {
        console.log(`\nجاري زيارة: ${url}`);
        
        try {
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
            
            const waitTime = randomWait(3000, 60000);
            console.log(`البقاء في الصفحة لمدة ${Math.round(waitTime / 1000)} ثانية...`);

            // محاكاة النزول (Scroll)
            await page.evaluate(async () => {
                await new Promise((resolve) => {
                    let totalHeight = 0;
                    const distance = 100;
                    const timer = setInterval(() => {
                        const scrollHeight = document.body.scrollHeight;
                        window.scrollBy(0, distance);
                        totalHeight += distance;
                        if (totalHeight >= scrollHeight - window.innerHeight) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 400);
                });
            });

            // محاكاة النقر على الصور
            try {
                await page.click('img');
                console.log('تم النقر على صورة.');
                await new Promise(resolve => setTimeout(resolve, 2000)); 
            } catch (error) {
                console.log('لا يوجد صور للنقر.');
            }

            // انتظار الوقت المتبقي
            await new Promise(resolve => setTimeout(resolve, waitTime));
            
        } catch (error) {
            console.log(`حدث خطأ أثناء زيارة ${url}:`, error.message);
        }
    }

    console.log('\nاكتملت الزيارات. جاري الإغلاق...');
    await browser.close();
})();

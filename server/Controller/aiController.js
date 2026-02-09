import puppeteer from 'puppeteer';
import {GoogleGenerativeAI} from '@google/generative-ai'
import redisClient from '../Redis/redisServer.js';



const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateSummary = async(content) => {
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
const response = await model.generateContent(`please summarize these content ${content}`)
const text = response.response.text();
return text;
}

export const generateAIPoweredContent = async (req, res) => {
  const { url, userID } = req.body;

  if (!url || !userID) {
    return res.status(400).json({ message: "url and userID are required" });
  }

  const redisKey = `summary:${userID}:${url}`;
  const expirySeconds = 24 * 60 * 60;

  let browser;

  try {
    // 🔥 STEP 1: Redis check
    const cachedSummary = await redisClient.get(redisKey);

    if (cachedSummary) {
      console.log("✅ Summary fetched from Redis");
      return res.status(200).json({
        summary: cachedSummary,
        fullarticle: url,
        source: "redis"
      });
    }

    console.log("❌ No cache found, generating summary...");

    // 🔥 STEP 2: Generate summary
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("p"))
        .map(p => p.innerText)
        .join(" ");
    });

    const summary = await generateSummary(extractedText);

    // 🔥 STEP 3: Save to Redis
    await redisClient.set(redisKey, summary, { EX: expirySeconds });

    res.status(200).json({
      summary,
      fullarticle: url,
      source: "generated"
    });

  } catch (error) {
    console.error("Error in generateAIPoweredContent:", error);
    res.status(500).json({ message: "Failed to summarize article" });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};




// export const generateAIPoweredContent = async (req, res) => {
//     console.log(req.body)
//   const { url , userID } = req.body;
  
//   console.log(url)
//   let browser;
//   try {
//     browser = await puppeteer.launch({ headless: true });
//     console.log(browser);
//     const page = await browser.newPage();
//     console.log(page);

//     await page.goto(url, { waitUntil: 'domcontentloaded' });

//     const extractedText = await page.evaluate(() => {
//       return Array.from(document.querySelectorAll('p'))
//         .map((p) => p.innerText)
//         .join(' ');
//     });

//    const summary = await generateSummary(extractedText) ;
//    const redisKey = `User-ID:${userID.toString()}`;
//    const expirySeconds = 24 * 60 * 60; // 1 day (match jwt expiry)
//    await redisClient.set(redisKey, summary, { EX: expirySeconds });
   
// //    await redisClient.get(redisClient.get(redisKey)).then((result)=>{
  
//    res.status(200).json({
//     summary , fullarticle : url
//    })
//   }  catch (error) {
//     console.error("Error in newsSummarize:", error);
//     res.status(500).json({ message: "Failed to summarize article" });
//   } finally {
//     if (browser) {
//       await browser.close();
//     }
// } 
// };



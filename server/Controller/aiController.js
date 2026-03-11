import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import redisClient from "../Redis/redisServer.js";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const generateSummary = async (content) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const response = await model.generateContent(
    `please summarize these content ${content}`,
  );
  const text = response.response.text();
  return text;
};

export const generateAIPoweredContent = async (req, res) => {
  const { url, userID, img, description, title } = req.body;

  if (!url || !userID) {
    return res.status(400).json({ message: "url and userID are required" });
  }
  console.log(img, description, title);
  const redisKey = `summary:${userID}:${url}`;
  // const articleDetails = `Article Details :${title}:${description}:${img}`;


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
        source: "redis",
      });
    }

    console.log("❌ No cache found, generating summary...");

    // 🔥 STEP 2: Generate summary
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("p"))
        .map((p) => p.innerText)
        .join(" ");
    });

    const summary = await generateSummary(extractedText);

    // 🔥 STEP 3: Save to Redis
    await redisClient.set(redisKey, summary, { EX: expirySeconds });

    res.status(200).json({
      summary,
      fullarticle: url,
      source: "generated",
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

export const getArticleDetailsFromRedis = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "userID is required",
    });
  }

  try {
    const redisKey = `articleDetails:${id}`;
    console.log(redisKey);

    const cachedData = await redisClient.get(redisKey);
    console.log(cachedData);
    if (!cachedData) {
      return res.status(404).json({
        success: false,
        message: "No cached article found",
      });
    }

    const parsedData = JSON.parse(cachedData);

    return res.status(200).json({
      success: true,
      data: parsedData,
      source: "redis",
    });
  } catch (error) {
    console.error("Redis fetch error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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

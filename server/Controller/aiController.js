import puppeteer from 'puppeteer';
import {GoogleGenerativeAI} from '@google/generative-ai'



const genAI = new GoogleGenerativeAI( 'AIzaSyBJIrOFMrT2eTcVX0jh0ws6bxCgfbSTcbE');
const generateSummary = async(content) => {
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
const response = await model.generateContent(`please summarize these content ${content}`)
const text = response.response.text();
return text;
}

export const generateAIPoweredContent = async (req, res) => {
    console.log(req.body)
  const { url } = req.body;
  console.log(url)
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    console.log(browser);
    const page = await browser.newPage();
    console.log(page);

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const extractedText = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('p'))
        .map((p) => p.innerText)
        .join(' ');
    });

   const summary = await generateSummary(extractedText) ;
  
   res.status(200).json({
    summary , fullarticle : url
   })
  }  catch (error) {
    console.error("Error in newsSummarize:", error);
    res.status(500).json({ message: "Failed to summarize article" });
  } finally {
    if (browser) {
      await browser.close();
    }
} 
};



// export const generateAIPoweredContent = async (req, res) => {
//     try {
//         const { url } = req.body;  
//         console.log(`URL :  ${url}`) 
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto(url , {waitUntil : "networkidle0"}); // Replace with actual AI content generator URL 
//         await page.waitForSelector("p", { timeout: 15000 });
//         const generatedContent = await page.evaluate(()=>{
//             return Array.from(document.querySelectorAll('p')).map((p)=>p.innerText).join('');
//         })
//         console.log(`GeneratedContent : ${generatedContent}`)
//        const summary = await  generateSummary(`More than 1 million federal workers responded to an email asking them to document what they did last week, sent at Elon Musk's behest, White House press secretary Karoline Leavitt told reporters Tuesday.
//  Why it matters: That's only about half the federal workforce — perhaps to be expected, as many agencies told employees to ignore the email.
//  Zoom in: "We've had more than 1 million workers who have chosen to participate in this very simple task of sending five bullet points to your direct supervisor or manager, cc'ing OPM [the Office for Personnel Management]," Leavitt said, noting that she herself had sent off her five bullet points.
//  Where it stands: Leavitt noted that asking workers to report on their accomplishments is a strategy that Musk has employed at his private companies.
//  In the private sector, such strategies for assessing productivity are out of fashion these days, as companies use more sophisticated measures to understand what workers are doing, as the WSJ reported Tuesday.
//  Leavitt on Tuesday said the point of the email exercise "is to ensure that federal workers are not ripping off American taxpayers, that they are showing up to the office and that they are doing their jobs."
//  Illustration:`)
//         // console.log(generateSummary())
//         // console.log(generatedContent)
//         await browser.close();  
//         res.status(200).json({ content : summary , FullURL : url });
//     } catch (error) {
//         console.error('Error generating AI content:', error);
//         res.status(500).json({ message: 'Failed to generate content' });
//     }   
// };


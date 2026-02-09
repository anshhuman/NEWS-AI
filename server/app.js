import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './Routes/userRoutes.js';
import prefRoutes from './Routes/prefRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bookmarkRouter from './Routes/bookmarkRoute.js';
import readingHistoryRouter from './Routes/readHistoryRoute.js';
import userPreferenceRoutes from './Routes/userPreference.js';
import aiRouter from './Routes/aiRoute.js';
import axios from 'axios';
import { Article } from './Model/articleModel.js';
import {CronJob} from 'cron';
import morgan from 'morgan';
import { fetchNewsAndStore , job} from './Controller/articlePushIntoDB.js';



const app = express();
morgan('combined');
dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(cors(
    {
        credentials : true,
        origin : 'http://localhost:5173'
    }
));
dbConnect();


// const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];



// const fetchNewsAndStore = async () => {
//     for(let country of countries) {
//         for(let category of categories) {
//                try {
//         const {data} = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=a8940f58b3f1419e823696fa8ba8be23`); 
//         if (data.articles && data.articles.length > 0) {
//         data.articles.map(async (d) => {
//           const exist = await Article.findOne({ title: d.title });
         
//           if (!exist) {
//             const newData = await Article.create({
//               content: d.content,
//               title: d.title,
//               author: d.author,
//               description: d.description,
//               url: d.url,
//               urlToImage: d.urlToImage,
//               category: d.category,
//               publishedAt: d.publishedAt,
//               country: d.country,
//               source: {
//                 id: d.source.id,
//                 name: d.source.name,
//               },
//             });
//             console.log(`Inserted ${d.title} [${category}-${country}]`);
//           } else {
//             console.log(`Already exists ${d.title}`);
//           }
//         });
//       }
//     } catch (error) {
//         console.error(`Error fetching news for country: ${country}, category: ${category}`, error);
//     }
//    }
//   }
//  };
//  fetchNewsAndStore();
// console.log(cron)
// cron.schedule('*/15 * * * *', fetchNewsAndStore);

// job.start();

app.use("/auth" , userRoutes);
app.use("/pref" , prefRoutes);
app.use("/book" , bookmarkRouter);
app.use("/history" , readingHistoryRouter);
app.use("/api" , userPreferenceRoutes);
app.use("/ai" , aiRouter);


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT} ✅`);
});


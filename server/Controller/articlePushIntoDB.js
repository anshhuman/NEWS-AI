import axios from 'axios';
import { Article } from '../Model/articleModel.js';
import {CronJob} from 'cron';

const countries = ['us', 'uk', 'fr', 'in', 'it'];
const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];



export const fetchNewsAndStore = async () => {
    for(let country of countries) {
        for(let category of categories) {
               try {
        const {data} = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=ce768252cadf41288180b08569a9f12d`); 
        if (data.articles && data.articles.length > 0) {
        data.articles.map(async (d) => {
          const exist = await Article.findOne({ title: d.title });
         
          if (!exist) {
            const newData = await Article.create({
              content: d.content,
              title: d.title,
              author: d.author,
              description: d.description,
              url: d.url,
              urlToImage: d.urlToImage,
              category: d.category,
              publishedAt: d.publishedAt,
              country: d.country,
              source: {
                id: d.source.id,
                name: d.source.name,
              },
            });
            console.log(`Inserted ${d.title} [${category}-${country}]`);
          } else {
            console.log(`Already exists ${d.title}`);
          }
        });
      }
    } catch (error) {
        console.error(`Error fetching news for country: ${country}, category: ${category}`, error);
    }
   }
  }
 };
//  fetchNewsAndStore();

export const job = new CronJob(
  "*/15 * * * *",
  fetchNewsAndStore
);
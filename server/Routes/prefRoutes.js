import express from 'express';
import { Preferences } from '../Controller/prefController.js';
import {fetchNewsByCategory} from '../Controller/newsController.js';
import {getArticleDetailsFromRedis} from '../Controller/aiController.js';

const prefRoutes = express.Router();

prefRoutes.post('/preferences/:id/',Preferences);
prefRoutes.get('/news/:category',fetchNewsByCategory);
prefRoutes.get('/history/:id',getArticleDetailsFromRedis)

export default prefRoutes;
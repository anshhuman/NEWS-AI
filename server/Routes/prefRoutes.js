import express from 'express';
import { Preferences } from '../Controller/prefController.js';
import {fetchNewsByCategory} from '../Controller/newsController.js';

const prefRoutes = express.Router();

prefRoutes.post('/preferences/:id/',Preferences);
prefRoutes.get('/news/:category',fetchNewsByCategory);

export default prefRoutes;
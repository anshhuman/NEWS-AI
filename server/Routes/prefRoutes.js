import express from 'express';
import { Preferences } from '../Controller/prefController.js';

const prefRoutes = express.Router();

prefRoutes.post('/preferences/:id/',Preferences);

export default prefRoutes;
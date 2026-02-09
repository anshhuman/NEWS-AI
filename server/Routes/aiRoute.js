import express from 'express';

import {generateAIPoweredContent}   from '../Controller/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/generate-content', generateAIPoweredContent);

export default aiRouter;
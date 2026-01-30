import express from 'express';
import { addReadingHistory, deleteReadingHistory, getReadingHistory } from '../Controller/readHistoryController.js';

const readingHistoryRouter = express.Router();

readingHistoryRouter.post("/:id/readHistory", addReadingHistory);
readingHistoryRouter.get("/:id/readHistory", getReadingHistory);
readingHistoryRouter.delete("/:id/readHistory/:articleID", deleteReadingHistory);  

export default readingHistoryRouter;
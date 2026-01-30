import express from 'express';
import { addBookmark, getBookmark, deleteBookmark } from '../Controller/bookmarkController.js';

const bookmarkRouter = express.Router();

bookmarkRouter.post("/:id/bookmark", addBookmark);
bookmarkRouter.get("/:id/bookmark", getBookmark);
bookmarkRouter.delete("/:id/bookmark/:articleID", deleteBookmark);

export default bookmarkRouter;
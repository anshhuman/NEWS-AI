import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './Routes/userRoutes.js';

const app = express();
app.use(express.json());
dotenv.config();

dbConnect();

app.use("/auth" , userRoutes);

app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT} ✅`);
});


import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './Routes/userRoutes.js';
import prefRoutes from './Routes/prefRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

app.use(cors(
    {
        credentials : true,
        origin : 'http://localhost:5173'
    }
));
dbConnect();

app.use("/auth" , userRoutes);
app.use("/pref" , prefRoutes);


app.listen(process.env.PORT , () => {
    console.log(`Server is running on port ${process.env.PORT} ✅`);
});


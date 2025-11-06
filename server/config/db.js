import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log('Database Connected ✅');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default dbConnect;


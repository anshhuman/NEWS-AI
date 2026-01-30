import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}`);
        console.log('Database Container Connected ✅');
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

export default dbConnect;


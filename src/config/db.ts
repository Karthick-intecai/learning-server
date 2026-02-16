import mongoose from 'mongoose';
const DB = async () => {
    try {
        const db_url = process.env.MONGODB_URI;
        if (!db_url) {
            console.error('Error: MONGODB_URI is not defined in .env');
            process.exit(1);
        }
        const db = await mongoose.connect(db_url as string);
        console.log(`MongoDB Connected: ${db.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default DB;

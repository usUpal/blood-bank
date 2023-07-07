const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected: ${mongoose.connection.host}`.bgMagenta.black)
    } catch (error) {
        console.log(`MongoDB connection error: ${error.message}`.bgRed.white)

        
    }
};

module.exports = connectDB;

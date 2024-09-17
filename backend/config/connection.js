const mongoose = require('mongoose');
require("dotenv").config();
const config = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
        .then(() => {console.log('MongoDB connected')});
    } catch (error) {
        console.log('MongoDB connection failed');
    }
}

config();
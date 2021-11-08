const mongoose = require("mongoose");
const config = require("./index.js");

const connectDB = async () => {
    try {
        console.log(config)
        await mongoose.connect(config.mongoUri, config.mongoOptions);
        console.log("The DB is connected");
    } catch (error) {
        console.log('DB connection error :' , error);
    }
};

module.exports = connectDB;

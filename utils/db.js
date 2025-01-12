const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected successfully to DB");
  } catch (error) {
    console.log("database connection failure!");
    process.exit(0);
  }
};

module.exports = connectDb;

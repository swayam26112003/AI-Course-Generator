const mongoose = require("mongoose");
require("dotenv").config(); 

const mongo_url = process.env.MONGO_CONN;

if (!mongo_url) {
  console.error("MONGO_CONN is missing! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });

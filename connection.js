const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/crud");

const objectdb = mongoose.connection;

objectdb.on("connected", () => {
  console.log("Connected to MongoDb");
});
objectdb.on("error", () => {
  console.log("Error to Connect to MongoDb");
});

module.exports = mongoose;

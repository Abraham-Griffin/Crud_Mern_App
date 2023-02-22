const express = require("express");
const app = express();
const cors = require("cors");

//Import cors
app.use(cors());

//Import connection to MongoDb
const fileDB = require("./connection");

//Import routes and userModel
const userRoute = require("./routes/user");

//Import bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.end("Welcome to the server");
});

//Configure Basic server
app.listen(5000, () => {
  console.log(`Server is running correctly`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { handleNotFound } = require("./utils/helper");
require("dotenv").config();
try {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("Failed");
    });
} catch (ex) {
  console.log(ex);
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", require("./routes/user"));
app.use("/api/actors", require("./routes/actor"));
app.use("/api/movies", require("./routes/movie"));
app.use("/*", handleNotFound);
app.listen(8080, () => {
  console.log("the port is listening on port 8080");
});

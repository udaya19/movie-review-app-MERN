const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
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
app.listen(8080, () => {
  console.log("the port is listening on port 8080");
});

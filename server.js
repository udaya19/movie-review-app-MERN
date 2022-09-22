const express = require("express");
const app = express();
const mongoose = require("mongoose");
try {
  mongoose
    .connect("mongodb://localhost/mern_moviereview")
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch(() => {
      console.log("Failed");
    });
} catch (ex) {
  console.log(ex);
}
app.use(express.json());
app.use("/api/users", require("./routes/user"));
app.listen(8080, () => {
  console.log("the port is listening on port 8000");
});

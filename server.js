const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/users", require("./routes/user"));
app.listen(8080, () => {
  console.log("the port is listening on port 8000");
});

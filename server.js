const express = require("express");
const app = express();
const port = 3000;
const userroute= require("./routes")
app.use(express.json())
const bp= require("body-parser")
app.use(bp.urlencoded({ extended: true }))

app.set("view engine", "ejs");
app.path("./views");

app.use("/", userroute)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

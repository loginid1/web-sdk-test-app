const express = require("express");
const dotenv = require("dotenv");
const { join } = require("path");

dotenv.config({ path: "./.env" });

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static("assets"));
app.use(express.json());

app.get("/", (_, res) => {
  return res.render("home");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening at 3000");
});

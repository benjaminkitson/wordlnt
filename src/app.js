const path = require("path");
const express = require("express");
const hbs = require("hbs");
const words = require("./word-gen.js");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("", (_req, res) => {
  res.render("index.hbs");
});

let epoch;
let newWord;

app.get("/whywouldyouevencheatatthisgame", (_req, res) => {
  const word = newWord;
  res.send({
    word,
    epoch,
    currentTime: Date.now(),
  });
});

app.get("/thumbnailimageforwebsitepreviews", (_req, res) => {
  res.sendFile(path.join(__dirname, "../media/wordlnt.png"));
});

app.listen(PORT, () => {
  // The starting date for the clock to run
  const init = 1694995200000;
  const indexCalc = Math.floor((Date.now() - init) / 10800000);
  const indexToUse = indexCalc >= 0 ? indexCalc : 0;
  newWord = words[indexToUse];
});

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const wordGen = require('./word-gen.js')

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

app.use(express.static(
  path.join(__dirname, "../public")
));

app.get('', (req, res) => {
  res.render('index.hbs')
});

let newWord = "HELLO"
let epoch = 1643911200000

setInterval(() => {
  if (Date.now() > epoch) {
    newWord = wordGen()
    epoch += 14400000
  }
}, 1000);

app.get('/whywouldyouevencheatatthisgame', (req, res) => {
  const word = newWord
  res.send({
    word,
    epoch,
    currentTime: Date.now()
  })
});

app.listen(PORT, () => {
  console.log("It has begun!")
});

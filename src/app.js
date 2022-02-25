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

let epoch
let newWord

app.get('/whywouldyouevencheatatthisgame', (req, res) => {
  const word = newWord
  res.send({
    word,
    epoch,
    currentTime: Date.now()
  })
});

app.get('/thumbnailimageforwebsitepreviews', (req, res) => {
  res.sendFile(path.join(__dirname, "../media/wordlnt.png"))
})

app.listen(PORT, () => {
  epoch = Date.now() + (10800000 - (Date.now() % 10800000))
  let now = new Date(Date.now()).getHours()
  let hour
  setInterval(() => {
    if (now % 3 === 0 && now != hour) {
      if (hour) epoch += 10800000
      newWord = wordGen()
      hour = now
    }
  }, 100);
});

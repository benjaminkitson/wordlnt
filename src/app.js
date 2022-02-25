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

let newWord = wordGen()
let epoch

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
  console.log("It has begun!")
  let hour
  setInterval(() => {
    const now = new Date(Date.now())
    if (now.getHours() % 3 === 0 && now.getHours() !== hour && hour) {
        epoch = Date.now() + 10800000
        newWord = wordGen()
        hour = now
    } else {
      const currentHours = now.getHours()
      let threeHours = currentHours
      while (threeHours % 3 != 0) {
        threeHours++
      }
      const hours = (threeHours - currentHours) - 1
      const minutes = (60 - now.getMinutes()) - 1
      const seconds = (60 - now.getSeconds()) - 1
      const milliseconds = 1000 - now.getMilliseconds()
      console.log(hours, minutes, seconds, milliseconds)
    }
  }, 100);

});

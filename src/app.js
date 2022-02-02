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
))

app.get('', (req, res) => {
  const word = wordGen()
  res.render('index.hbs', {
    newWord: word
  })
})

app.listen(PORT, () => {
  console.log("It has begun!")
})

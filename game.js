const keyboard = document.querySelector('.keyboard');
const firstGuess = document.querySelector('.first-guess');
const secondGuess = document.querySelector('.second-guess');
const thirdGuess = document.querySelector('.third-guess');
const fourthGuess = document.querySelector('.fourth-guess');
const fifthGuess = document.querySelector('.fifth-guess');
const sixthGuess = document.querySelector('.sixth-guess');

let guessArray = []

keyboard.addEventListener('mouseup', (e) => {
  if (e.target.getAttribute("data-key") === 'pop') {
    guessArray.pop()
    guessArray.forEach((letter, i) => {
      firstGuess.children[i].innerHTML = letter
    })
  } else if (guessArray.length <= 4 && e.target.getAttribute("data-key")) {
    guessArray.push(e.target.getAttribute("data-key"))
    guessArray.forEach((letter, i) => {
      firstGuess.children[i].innerHTML = letter
    })
  }
  console.log(guessArray)
})

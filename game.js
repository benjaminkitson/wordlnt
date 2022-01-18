const keyboard = document.querySelector('.keyboard');
const guesses = document.querySelectorAll('.guess')

let guessArray = []
let guessCount = 0

keyboard.addEventListener('mouseup', (e) => {
  if (e.target.getAttribute('data-key') === 'try') {
    if (guessArray.length === 5) {
      guessCount++
      guessArray = []
    }
  } else if (e.target.getAttribute('data-key') === 'pop') {
    guessArray.pop()
    const guess = Array.from(guesses[guessCount].children)
    guess.forEach((cell, i) => {
      if (guessArray[i]) {
        cell.innerHTML = guessArray[i]
      } else {
        cell.innerHTML = ''
      }
    })
  } else if (guessArray.length <= 4 && e.target.getAttribute('data-key')) {
    guessArray.push(e.target.getAttribute('data-key'))
    const guess = Array.from(guesses[guessCount].children)
    guess.forEach((cell, i) => {
      if (guessArray[i]) {
        cell.innerHTML = guessArray[i]
      } else {
        cell.innerHTML = ''
      }
    })
  }
  console.log(guessArray)
})

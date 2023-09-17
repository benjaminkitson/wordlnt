import { allWords } from "./words";

const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Initialise a bunch of variables etc for use during the game

let wordToGuess;
let wArray;
let debug = false;

const keyboard = document.querySelector(".keyboard");
const guesses = document.querySelectorAll(".word-grid__guess");
const endOverlay = document.querySelector(".end.overlay");
const endOverlayDetails = document.querySelector(".end.overlay__details");
const nextTimer = document.querySelector(".next-timer");

let nextGame;

let guessArray = [];
let guessCount = 0;

// Initialise localstorage object

gameData = localStorage;

if (gameData.currentWord === "undefined") {
  gameData.removeItem("currentWord");
}
if (!gameData.isCompleted) gameData.isCompleted = JSON.stringify(false);
if (!gameData.inProgress) gameData.inProgress = JSON.stringify(false);
if (!gameData.turns) gameData.turns = JSON.stringify([]);
if (!gameData.keyboardState)
  gameData.keyboardState = JSON.stringify({
    incorrect: [],
    almost: [],
    correct: [],
  });

//Contacts the server and retrieves the latest word

function getWord() {
  fetch("/whywouldyouevencheatatthisgame")
    .then((response) => response.json())
    .then((data) => {
      gameData.nextWord = data.epoch;
      word = debug === true ? "DEBUG" : data.word;
      if (!gameData.currentWord || JSON.parse(gameData.currentWord) != word) {
        clearBoard();
        gameData.isCompleted = false;
        gameData.solved = false;
        gameData.currentWord = JSON.stringify(word);
      }
      wArray = JSON.parse(gameData.currentWord).split("");
      overlayGen();
    });
}

getWord();

// Regenerates the board on page refresh and wipes the board respectively

function restoreState() {
  // Called on page load on line 151

  const turns = JSON.parse(gameData.turns);
  for (let count = 0; count < turns.length; count++) {
    const guess = Array.from(guesses[count].children);
    turns[count].forEach((letter, i) => {
      guess[i].innerHTML = letter.value;
      guess[i].classList.add(letter.state);
    });
  }
  const keyboardStates = JSON.parse(gameData.keyboardState);
  const states = Object.keys(keyboardStates);
  states.forEach((state) => {
    keyboardStates[state].forEach((letter) => {
      let key = document.querySelector(`[data-key='${letter}']`);
      key.classList.add(state);
    });
  });
  guessCount = turns.length;
}

function clearBoard() {
  const turns = JSON.parse(gameData.turns);
  for (let count = 0; count < turns.length; count++) {
    const guess = Array.from(guesses[count].children);
    turns[count].forEach((letter, i) => {
      guess[i].innerHTML = "";
      guess[i].classList.remove(letter.state);
    });
  }
  const keyboardStates = JSON.parse(gameData.keyboardState);
  const states = Object.keys(keyboardStates);
  states.forEach((state) => {
    keyboardStates[state].forEach((letter) => {
      let key = document.querySelector(`[data-key='${letter}']`);
      if (key.classList.contains(state)) key.classList.remove(state);
    });
  });
  guessCount = 0;
  gameData.turns = JSON.stringify([]);
  gameData.keyboardState = JSON.stringify({
    incorrect: [],
    almost: [],
    correct: [],
  });
}

// Periodically regenerates the text for the next-game countdown -

function timerPromise() {
  new Promise((resolve, reject) => {
    resolve(gameData.nextWord - Date.now());
  }).then((result) => {
    const nextMinutes = Math.ceil(result / 60000);
    minsNum = nextMinutes === 1 ? "minute" : "minutes";
    const timerText = `${nextMinutes} ${minsNum}`;
    if (nextTimer.innerHTML != timerText && nextMinutes >= 0) {
      nextTimer.innerHTML = timerText;
    } else if (nextTimer.innerHTML != timerText && nextMinutes <= 0) {
      nextTimer.innerHTML = `0 minutes`;
    }
  });
}

function nextTimerGen() {
  timerPromise();
  setInterval(timerPromise, 1000);
}

//Determine whether the game-end overlay should be present or not, is always called on page initialisation

function overlayGen() {
  nextTimerGen();
  endOverlayDetails.firstElementChild.innerHTML = JSON.parse(
    gameData.currentWord
  );
  if (JSON.parse(gameData.isCompleted) === true) {
    endOverlay.style.display = "flex";
    endOverlay.classList.add("game-end");
  } else {
    endOverlay.style.display = "none";
    endOverlay.classList.remove("game-end");
  }
}

restoreState();

// A series of fairly self explanatory utility functions

function gameEnd() {
  gameData.inProgress = JSON.stringify(false);
  gameData.isCompleted = JSON.stringify(true);
  endOverlay.style.display = "flex";
  setTimeout(() => {
    endOverlay.classList.add("game-end");
  }, 1);
}

function del() {
  guessArray.pop();
  const guess = Array.from(guesses[guessCount].children);
  guess.forEach((cell, i) => {
    if (guessArray[i]) {
      cell.innerHTML = guessArray[i];
    } else {
      cell.innerHTML = "";
    }
  });
}

function add(letter) {
  if (letters.includes(letter)) {
    guessArray.push(letter);
    const guess = Array.from(guesses[guessCount].children);
    guess.forEach((cell, i) => {
      if (guessArray[i]) {
        cell.innerHTML = guessArray[i];
      } else {
        cell.innerHTML = "";
      }
    });
  }
}

function invalid() {
  const guess = Array.from(guesses[guessCount].children);
  guess.forEach((cell) => {
    cell.addEventListener("transitionend", (e) => {
      cell.classList.remove("blocked");
    });
    cell.classList.add("blocked");
  });
}

// A very large and unwieldy function that carries out most of the operations between turns - this should probably be split into smaller functions

function turn() {
  gameData.inProgress = true;
  const guess = Array.from(guesses[guessCount].children);
  const wArrayClone = wArray.slice();
  guess.forEach((cell, i) => {
    if (cell.innerHTML === wArrayClone[i]) {
      const index = wArrayClone.findIndex(
        (letter) => letter === cell.innerHTML
      );
      wArrayClone.splice(index, 1, "");
      cell.classList.add("correct");
      let key = document.querySelector(`[data-key='${cell.innerHTML}']`);
      if (key.classList.contains("almost")) {
        key.classList.replace("almost", "correct");
      } else {
        key.classList.add("correct");
      }
    }
  });
  guess.forEach((cell, i) => {
    if (
      wArrayClone.includes(cell.innerHTML) &&
      !cell.classList.contains("correct")
    ) {
      const index = wArrayClone.findIndex(
        (letter) => letter === cell.innerHTML
      );
      wArrayClone.splice(index, 1, "");
      cell.classList.add("almost");
      let key = document.querySelector(`[data-key='${cell.innerHTML}']`);
      if (!key.classList.contains("correct")) key.classList.add("almost");
    } else {
      cell.classList.add("incorrect");
      let key = document.querySelector(`[data-key='${cell.innerHTML}']`);
      if (
        !key.classList.contains("correct") &&
        !key.classList.contains("almost")
      )
        key.classList.add("incorrect");
    }
  });
  const turn = [];
  const keyboard = JSON.parse(gameData.keyboardState);

  // This chunk in particular is super unnecessary - by definition a letter can't be "incorrect" at first and then somehow "correct / almost" later on - some code can definitely be binned here. This logic likely applies elsewhere too.

  guess.forEach((cell) => {
    const letter = { value: cell.innerHTML };
    if (cell.classList.contains("correct")) {
      letter.state = "correct";
      if (!keyboard.correct.includes(cell.innerHTML))
        keyboard.correct.push(cell.innerHTML);
      if (keyboard.almost.includes(cell.innerHTML))
        keyboard.almost.splice(
          keyboard.almost.findIndex((letter) => letter === cell.innerHTML),
          1
        );
      if (keyboard.incorrect.includes(cell.innerHTML))
        keyboard.incorrect.splice(
          keyboard.incorrect.findIndex((letter) => letter === cell.innerHTML),
          1
        );
    } else if (cell.classList.contains("almost")) {
      letter.state = "almost";
      if (
        !keyboard.almost.includes(cell.innerHTML) &&
        !keyboard.correct.includes(cell.innerHTML)
      )
        keyboard.almost.push(cell.innerHTML);
      if (keyboard.incorrect.includes(cell.innerHTML))
        keyboard.incorrect.splice(
          keyboard.incorrect.findIndex((letter) => letter === cell.innerHTML),
          1
        );
    } else if (cell.classList.contains("incorrect")) {
      letter.state = "incorrect";
      if (
        !keyboard.incorrect.includes(cell.innerHTML) &&
        !keyboard.almost.includes(cell.innerHTML) &&
        !keyboard.correct.includes(cell.innerHTML)
      )
        keyboard.incorrect.push(cell.innerHTML);
    }
    turn.push(letter);
  });
  gameData.keyboardState = JSON.stringify(keyboard);
  const turns = JSON.parse(gameData.turns);
  turns.push(turn);
  gameData.turns = JSON.stringify(turns);
  if (guessArray.join() === wArray.join()) {
    gameData.solved = true;
    gameEnd();
  } else if (guessCount === 5) {
    gameData.solved = false;
    gameEnd();
  }
  guessCount++;
  guessArray = [];
}

// Functions to determine what various keys should do at different points, depending on when they are pressed etc

keyboard.addEventListener("mouseup", (e) => {
  if (e.target.getAttribute("data-key") === "turn") {
    if (allWordallW.includes(guessArray.join("").toLowerCase())) {
      turn();
    } else {
      invalid();
    }
  } else if (e.target.getAttribute("data-key") === "del") {
    del();
  } else if (guessArray.length <= 4 && e.target.getAttribute("data-key")) {
    const letter = e.target.getAttribute("data-key");
    add(letter);
  }
});

window.addEventListener("keyup", (e) => {
  if (!JSON.parse(gameData.isCompleted)) {
    if (e.key === "Enter") {
      if (allWords.includes(guessArray.join("").toLowerCase())) {
        turn();
      } else {
        invalid();
      }
    } else if (e.key === "Backspace") {
      del();
    } else if (guessArray.length <= 4) {
      const letter = e.key.toUpperCase();
      add(letter);
    }
  }
});

// Variables and logic relating to the info button (could go in a new file)

const infoButton = document.querySelector(".icon-right__info-button");
const infoOverlay = document.querySelector(".info.overlay");

infoButton.addEventListener("mouseup", () => {
  infoOverlay.style.display = "flex";
  setTimeout(() => {
    infoOverlay.classList.add("game-end");
    infoOverlay.addEventListener("mouseup", (e) => {
      if (e.target === infoOverlay) {
        infoOverlay.classList.remove("game-end");
        infoOverlay.style.display = "none";
      }
    });
  }, 1);
});

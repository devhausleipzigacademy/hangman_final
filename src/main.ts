// create buttons with letters of the alphabet
const alphabet: string = "abcdefghijklmnopqrstuvwxyz";
const guessed: string[] = [];
const wordlist = [
  "devhaus",
  "programming",
  "developer",
  "lunchbreak",
  "office",
];
let word: string;
let hiddenWord: string;
let lives = 9;
// save the eventListener callback function, to be able to reference them again later
const listeners: Record<string, () => void> = {}

const alphabetDiv = document.getElementById("alphabet") as HTMLDivElement;
const livesDiv = document.getElementById("lives") as HTMLDivElement

// iterate over alphabet and create letter buttons
for (let letter of alphabet) {
  createLetterButton(letter);
}

// function to create buttons with alphabet-letters
function createLetterButton(letter: string) {
  // create new button
  let newLetter = document.createElement("div");
  newLetter.innerHTML = `<button
  type="button"
  class="letter btn btn-primary"
  id=${letter}>${letter}</button>`;
  listeners[letter] = () => handleGuess(letter)
  // TODO add EventListener for click that calls 'handleGuess(letter)'
  newLetter.firstChild?.addEventListener("click", listeners[letter]);
  
  // append to alphabetDiv
  alphabetDiv?.appendChild(newLetter);
}

// function to start game
function startGame() {
  // choose a random word from wordlist
  word = wordlist[Math.floor(Math.random() * wordlist.length)];
  livesDiv.innerHTML = `Lives remaining: ${lives}`
  encryptWord();

  const hangmanItems: NodeListOf<HTMLDivElement> = document.querySelectorAll(".hangman-item")

  hangmanItems.forEach(item => item.style.display = "none")
}

// function to show encrypted word at top of page
function encryptWord() {
  // access div with id 'word'
  const wordDiv = document.getElementById("word");

  hiddenWord = word
    .split("")
    .map((letter) => {
      return guessed.includes(letter) ? letter : "_";
    })
    .join(" ");
  // show word inside of word div
  wordDiv!.innerHTML = `${hiddenWord}`;
}

function handleGuess(letter: string) {
  const letterButtons = document.querySelectorAll(".letter");
  // disable button after click
  console.log(letter);
  // disable letters that we already guessed
  const letterButton = document.getElementById(letter) as HTMLButtonElement;
  letterButton.disabled = true;

  // keep track of all the letters we already guessed
  guessed.push(letter);

  // check if the letter is in the answer
  if (word.match(letter)) {
    encryptWord();
    setTimeout(() => {
      if (!hiddenWord.includes("_")) {
        alert("You won!!!");
        letterButtons.forEach(btn => btn.removeEventListener("click", listeners[btn.id]))
      }
    }, 100);
  } else {
    if (lives > 0) {
      const item = document.getElementById(`hangman_${lives}`) as HTMLDivElement
      item.style.display = "inline"
      lives--;
      livesDiv.innerHTML = `Lives remaining: ${lives}`
    }
    setTimeout(() => {
      if (lives <= 0) {
        alert("You lost!!!");
        letterButtons.forEach(btn => btn.removeEventListener("click", listeners[btn.id]))
        }
    }, 300);
  }
}

startGame();

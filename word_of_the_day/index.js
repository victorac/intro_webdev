/*
    fetch word of the day
    set number of tries to zero
    set current letter to zero
    add event listener for keydown
        if key === Backspace
            get current letter box
            delete value
            subtract current letter if > 0
            return
        else
            return if is not letter
            get current letter box
            increase current letter
            if increased current letter === 6
                submit the word
                increase the number of tries
*/

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function validateWord(word) {
  const response = await fetch("https://words.dev-apis.com/validate-word", {
    method: "POST",
    body: JSON.stringify({
      word,
    }),
  });
  if (response.ok) {
    const { validWord } = await response.json();
    return validWord;
  }
  return false;
}

async function fetchWord() {
  const response = await fetch("https://words.dev-apis.com/word-of-the-day");
  if (response.ok) {
    const { word } = await response.json();
    return word;
  }
}

async function submitWord(row, wordOfTheDay) {
  let word = "";
  const children = [];
  for (let i = 0; i < row.children.length; i++) {
    children.push(row.children[i]);
    word += children[i].innerHTML;
  }
  word = word.toLowerCase();

  const isValid = await validateWord(word);
  if (!isValid) {
    console.log("invalid word");
    children.forEach((el) => {
      el.innerHTML = "";
    });
    return isValid;
  }

  if (word === wordOfTheDay) {
    children.forEach((el) => {
      el.classList.add("done", "right-letter", "right-position");
    });
    alert("Correct! The word of the day is " + wordOfTheDay);
  } else {
    // search for right letters
    let auxWordOfTheDay = wordOfTheDay;
    children.forEach((el) => {
      const char = el.innerHTML.toLowerCase();
      if (auxWordOfTheDay.includes(char)) {
        el.classList.add("done", "right-letter");
      } else {
        el.classList.add("done");
      }
      auxWordOfTheDay.replace(char, "");
    });
    // search for right position
    children.forEach((el, index) => {
      const char = el.innerHTML.toLowerCase();
      if (wordOfTheDay.charAt(index) === char) {
        el.classList.add("right-position");
      }
    });
  }

  return isValid;
}

async function init() {
  const wordOfTheDay = await fetchWord();
  let tries = 0;
  let letterCount = 0;

  document.addEventListener("keydown", async (event) => {
    const row = document.querySelector(`#w${tries}`);

    if (event.key === "Backspace") {
      if (letterCount > 0) {
        letterCount -= 1;
      }
      const currentLetterBox = row.children[letterCount];
      currentLetterBox.innerHTML = "";
      return;
    }

    if (!isLetter(event.key)) {
      event.preventDefault();
      return;
    }

    if (letterCount >= row.children.length) {
      return;
    }

    const currentLetterBox = row.children[letterCount];
    currentLetterBox.innerHTML = event.key.toUpperCase();
    letterCount += 1;
    if (letterCount > 4) {
      const isValid = await submitWord(row, wordOfTheDay);
      if (isValid) {
        tries += 1;
      }
      letterCount = 0;
      if (tries > 5) {
        alert("Game over. The correct word was " + wordOfTheDay);
        tries = 0;
      }
    }
  });
}

init();

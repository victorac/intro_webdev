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

function buildWord(children) {
  let word = "";
  for (let i = 0; i < children.length; i++) {
    word += children[i].innerHTML;
  }
  return word.toLowerCase();
}

function checkWord(word, wordOfTheDay, children) {
  if (word === wordOfTheDay) {
    children.forEach((el) => {
      el.classList.add("done", "right-letter", "right-position");
    });
    return true;
  }

  // search for right letters
  let auxWordOfTheDay = wordOfTheDay;
  // search for right position
  children.forEach((el, index) => {
    const char = el.innerHTML.toLowerCase();
    if (wordOfTheDay.charAt(index) === char) {
      el.classList.add("right-letter", "right-position");
      auxWordOfTheDay = auxWordOfTheDay.replace(char, "");
    }
  });
  console.log(auxWordOfTheDay)
  children.forEach((el) => {
    const char = el.innerHTML.toLowerCase();
    if (auxWordOfTheDay.includes(char)) {
      el.classList.add("done", "right-letter");
      auxWordOfTheDay = auxWordOfTheDay.replace(char, "");
    } else {
      el.classList.add("done");
    }
  });

  return false;
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
      const children = [];
      for (let i = 0; i < row.children.length; i++) {
        children.push(row.children[i]);
      }
      const word = buildWord(children);
      const isValid = await validateWord(word);
      if (isValid) {
        const isMatch = checkWord(word, wordOfTheDay, children);
        if (isMatch) {
          alert("Correct! The word of the day is " + wordOfTheDay);
        } else {
          tries += 1;
        }
      } else {
        children.forEach((el) => {
          el.innerHTML = "";
          el.classList.add("invalid-word");
          setTimeout(() => {
            el.classList.remove("invalid-word");
          }, 1000);
        });
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

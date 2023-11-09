let accumulatedValue = 0;
let currentValue = 0;
let currentOperation = null;
let resetDisplay = true;
let resetOperation = true;
let resetAccumulated = true;

const display = document.querySelector(".display .input");

const numbers = document.querySelectorAll(".number");
numbers.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (resetDisplay) {
      display.innerHTML = "0";
      currentValue = 0;
      resetDisplay = false;
    }
    const enteredNumber = event.target.value;
    if (currentValue !== 0) {
      currentValue = +`${currentValue}${enteredNumber}`;
    } else {
      currentValue = +enteredNumber;
    }
    display.innerHTML = currentValue;
  });
});

const handleClear = () => {
  display.innerHTML = "0";
  accumulatedValue = 0;
  currentValue = 0;
  currentOperation = null;
  resetDisplay = true;
  resetOperation = true;
  resetAccumulated = true;
};
const clear = document.querySelector(".clear");
clear.addEventListener("click", handleClear);

const handleDelete = () => {
  accumulatedValue = +display.innerHTML;
  console.log(accumulatedValue);
  if (Math.abs(accumulatedValue) > 9) {
    accumulatedValue = +`${accumulatedValue}`.slice(0, -1);
  } else {
    accumulatedValue = 0;
  }
  display.innerHTML = accumulatedValue;
  resetAccumulated = false
};
const del = document.querySelector(".delete");
del.addEventListener("click", handleDelete);

const handleCurrentOperation = () => {
  switch (currentOperation) {
    case "division":
      if (currentValue !== 0) {
        accumulatedValue = accumulatedValue / currentValue;
      }
      break;
    case "multiplication":
      accumulatedValue = accumulatedValue * currentValue;
      break;
    case "subtraction":
      accumulatedValue = accumulatedValue - currentValue;
      break;
    case "addition":
      accumulatedValue = accumulatedValue + currentValue;
      break;
  }
  display.innerHTML = accumulatedValue;
};

const operators = document.querySelectorAll(".operator");
operators.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (resetOperation) {
      currentOperation = null;
      resetOperation = false;
    }
    if (resetAccumulated) {
      accumulatedValue = currentValue;
      resetAccumulated = false;
    }
    handleCurrentOperation();
    currentValue = 0;
    currentOperation = event.target.value;
    resetDisplay = true;
  });
});

const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  handleCurrentOperation();
  resetDisplay = true;
  resetOperation = true;
});

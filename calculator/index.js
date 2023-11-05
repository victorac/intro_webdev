let accumulatedValue = null;
let currentValue = null;
let currentOperation = null;
let resetDisplay = true;
let resetOperation = true;

const display = document.querySelector(".display .input");

const numbers = document.querySelectorAll(".number");
numbers.forEach((el) => {
  el.addEventListener("click", (event) => {
    if (resetDisplay) {
      display.innerHTML = "0";
      currentValue = null;
      resetDisplay = false;
    }
    const enteredNumber = event.target.value;
    if (currentValue !== null) {
      currentValue = +`${currentValue}${enteredNumber}`;
    } else {
      currentValue = +enteredNumber;
    }
    display.innerHTML = currentValue;
  });
});

const handleClear = () => {
  display.innerHTML = "0";
  accumulatedValue = null;
  currentValue = null;
  currentOperation = null;
  resetDisplay = true;
  resetOperation = true;
};
const clear = document.querySelector(".clear");
clear.addEventListener("click", handleClear);

const handleDelete = () => {
  let currentValue = +display.innerHTML;
  if (Math.abs(currentValue) > 9) {
    currentValue = +`${currentValue}`.slice(0, -1);
  } else if (currentValue > 0) {
    currentValue = null;
  }
  if (currentValue !== null) {
    display.innerHTML = currentValue;
  } else {
    display.innerHTML = 0;
  }
};
const del = document.querySelector(".delete");
del.addEventListener("click", handleDelete);

const handleCurrentOperation = () => {
  if (currentOperation === "division") {
    accumulatedValue = accumulatedValue / currentValue;
  } else if (currentOperation === "multiplication") {
    accumulatedValue = accumulatedValue * currentValue;
  } else if (currentOperation === "subtraction") {
    accumulatedValue = accumulatedValue - currentValue;
  } else if (currentOperation === "addition") {
    accumulatedValue = accumulatedValue + currentValue;
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
    if (accumulatedValue === null) {
      accumulatedValue = currentValue;
    }
    if (currentValue !== null && accumulatedValue !== null) {
      handleCurrentOperation();
      currentValue = null;
    }
    currentOperation = event.target.value;
    resetDisplay = true;
  });
});

const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  if (currentValue !== null && accumulatedValue !== null) {
    handleCurrentOperation();
  }
  resetDisplay = true;
  resetOperation = true;
});

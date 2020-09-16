const calculator = document.querySelector(".calculator");
const display = document.querySelector(".calculator-display");
const keys = calculator.querySelector(".calculator-keys");

const calculate = (n1, operator, n2) => {
  // Perform calculation and return calculated value
  const firstNum = parseFloat(n1);
  const secondNum = parseFloat(n2);

  if (operator === "add") {
    return firstNum + secondNum;
  } else if (operator === "subtract") {
    return firstNum - secondNum;
  } else if (operator === "multiply") {
    return firstNum * secondNum;
  } else if (operator === "divide") {
    return firstNum / secondNum;
  }
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.value;

    const previousKeyType = calculator.dataset.previousKeyType;

    // Remove .is-depressed from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculator"
      ) {
        display.value = keyContent;
      } else {
        display.value = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (action === "decimal") {
      // Do nothing if string has a dot
      if (!displayedNum.includes(".")) {
        display.value = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculator"
      ) {
        display.value = "0.";
      }
      calculator.dataset.previousKeyType = "decimal";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;

      if (
        firstValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "calculate"
      ) {
        const calcValue = calculate(firstValue, operator, secondValue);
        display.value = calcValue;
        // Update calculated value as firstValue
        calculator.dataset.firstValue = calcValue;
      } else {
        // If there are no calculations, set displayedNum as the firstValue
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add("is-depressed");
      // Add custom attribute
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      display.value = 0;
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "all-clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstValue = "";
        calculator.dataset.modValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      }

      display.value = 0;
      calculator.dataset.previousKeyType = "all-clear";
    }

    if (action === "calculate") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = displayedNum;

      if (firstValue) {
        if (previousKeyType === "calculate") {
          firstValue = displayedNum;
          secondValue = calculator.dataset.modValue;
        }

        display.value = calculate(firstValue, operator, secondValue);
      }

      // Set modValue attribute
      calculator.dataset.modValue = secondValue;
      calculator.dataset.previousKeyType = "calculate";
    }
  }
});

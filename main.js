//check if the browser supports service worker
if ('serviceWorker' in navigator){
    navigator.serviceWorker
    //rerister the path to the service worker
    .register('/sw.js')
    .then(function(){
        console.log('Service Worker Registered');
    });
  }



// Variable to store the current display value
let display = "0";

// Variable to store the operator
let operator = "";

// Variable to store the previous value
let previousValue = "0";

// Get a reference to the <p> element inside the "display" div
const displayElement = document.querySelector('.display p');

// Function to update the display content
function updateDisplay() {
  displayElement.textContent = display;
}

// Function to handle numeric input
function handleNumericInput(num) {
  if (display === "0" || operator !== "") {
    // If the current display is "0" or an operator is set, start a new value.
    display = num;
  } else {
    // Concatenate digits when multiple numeric inputs are provided.
    display += num;
  }
  updateDisplay();
}

// Function to handle operators
function handleOperator(op) {
  if (operator !== "") {
    // If an operator is already set, perform the calculation.
    display = calculate(previousValue, operator, display);
    operator = "";
  }
  operator = op;
  previousValue = display;
}

// Function to handle the "AC" (clear) button
function handleClear() {
  display = "0";
  operator = "";
  previousValue = "0";
  updateDisplay();
}

// Function to handle the "=" (equals) button
function handleEquals() {
  if (operator !== "") {
    display = calculate(previousValue, operator, display);
    operator = "";
    previousValue = "0";
    updateDisplay();
  }
}

// Function to calculate the result
function calculate(num1, op, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (op) {
    case "+":
      return (num1 + num2).toString();
    case "-":
      return (num1 - num2).toString();
    case "*":
      return (num1 * num2).toString();
    case "/":
      if (num2 === 0) {
        return "Error"; // Handle division by zero
      }
      return (num1 / num2).toString();
    default:
      return num2.toString();
  }
}

// Function to toggle the sign of a number
function toggleSign(num) {
  if (num === "0") {
    return num; // No sign change for zero
  }
  return num.startsWith('-') ? num.substring(1) : `-${num}`;
}

// Get references to the <ol> elements
const olElements = document.querySelectorAll('ol');

// Add a click event listener to each <ol> element
olElements.forEach((ol) => {
  ol.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === "LI") {
      const id = clickedElement.id;
      if (!isNaN(id)) {
        // Handle numeric input
        handleNumericInput(id);
      } else {
        if (id === "AC") {
          // Handle clear button
          handleClear();
        } else if (id === "=") {
          // Handle equals button
          handleEquals();
        } else if (id === "+/-") {
          // Handle sign change button
          display = toggleSign(display);
          updateDisplay();
        } else {
          // Handle operators and other special cases
          handleOperator(id);
        }
      }
    }
  });
});
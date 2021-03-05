var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
var signs = ["/", "*", "-", "+", "=", "+-"];
var controls = ["CLS", "C", "del"];
var lastButton;
var decimal;

window.onload = initialize;

//Set buttons to button handler
function initialize() {
  resetDisplay("CLS");
  var buttons = document.getElementsByTagName("button"); //get list of buttons
  
  for (var i = 0; i < buttons.length; i++) {
    if (!buttons[i].getAttribute("id")) { //filter out the cells that has an id
      buttons[i].onclick = buttonClickHandler;
    }
  }
}

function resetDisplay(buttonClicked) {
  var display = document.getElementById("display");
  var expression = document.getElementById("expression");
  var currentExpression = expression.innerHTML.split("");
  lastButton = "";
  if (buttonClicked === "del") { 
    if ((currentExpression.slice(-1)[0]) === ".") decimal = false;
    if (signs.indexOf(currentExpression.slice(-2)[0]) !== -1) lastButton = "sign";
    expression.innerHTML = (currentExpression.slice(0, -1)).join("");
  } else {
    decimal = false;
    expression.innerHTML = ""; //for either cls or c expression will be cleared
    if (buttonClicked === "CLS") {
      display.innerHTML = "";  //clear display if cls
    }
  }
}

function buttonClickHandler() {
  var buttonClicked = this.innerHTML;
/* The following lines try to prevent
1. two operators following each other
2. operators or zero starting an expression
3. a zero directly following an operator
*/
  if (controls.indexOf(buttonClicked) === -1 && buttonClicked !== "=") {
    
    if (signs.indexOf(buttonClicked) !== -1 || buttonClicked === "0") {
      if (lastButton !== "sign" && expression.innerHTML !== "") {
        $(expression).append(buttonClicked);
        if (buttonClicked !== "0") {
          decimal = false;
          lastButton = "sign";
        }
      }
    }
    else {
      if (buttonClicked === ".") {
        if (decimal) return;
        else { 
          decimal = true; }
      }
      $(expression).append(buttonClicked);
      lastButton = "";
    }

  } else if (buttonClicked === "=") {
    if (lastButton === "sign") {
      alert("Last Button Cannot Be A Sign");
      return;
    }
    displayResult();
  
  } else {
    resetDisplay(buttonClicked);
  }
}

function displayResult() {
  try {
    display.innerHTML = eval(expression.innerHTML);
  }
  catch(e) {
    alert("Operation not allowed");
  }
}

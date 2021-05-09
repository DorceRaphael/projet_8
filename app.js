// MOMENT

// var moment = require("moment");
// var myDate = new Date();
// var myCoolDate = moment(myDate).format("LLL");
// console.log(myCoolDate);

// BASE
// const panelHeader = document.querySelector(".panel-header");
// const panel = document.querySelector(".panel");

// panelHeader.addEventListener("click", function () {
//   panel.classList.toggle("active");
//   panelHeader.classList.toggle("active-btn");
// });

const panels = document.querySelectorAll(".panel");

panels.forEach(function (panel) {
  const panelHeader = panel.querySelector(".panel-header");

  panelHeader.addEventListener("click", function () {
    // panels.forEach(function (item) {
    //   if (item !== panel) {
    //     item.classList.remove("active");
    //   }
    // });
    panel.classList.toggle("active");
    panelHeader.classList.toggle("active-btn");
  });
});

// METEO

var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var desc = document.querySelector(".desc");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".submit");

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    button.click();
  }
});
button.addEventListener("click", function (name) {
  async function getMeteo() {
    let response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=efa92f71bc6b12a9b2a917e520c8c9d5"
    );
    let data = await response.json();
    return data;
  }

  getMeteo()
    .then((data) => {
      var tempValue = data["main"]["temp"];
      var nameValue = data["name"];
      var descValue = data["weather"][0]["icon"];

      main.innerHTML = nameValue;
      desc.innerHTML = `<img class="city-icon" src="http://openweathermap.org/img/wn/${descValue}@4x.png" alt="">`;
      temp.innerHTML = `Température: ${(tempValue - 273.15).toFixed(2)}°C`;
      input.value = "";
      input.classList.remove("error");
    })

    .catch((err) => input.classList.add("error"));
});

// CALCULATRICE

(function () {
  "use strict";

  // Shortcut to get elements
  var el = function (element) {
    if (element.charAt(0) === "#") {
      // If passed an ID...
      return document.querySelector(element); // ... returns single element
    }

    return document.querySelectorAll(element); // Otherwise, returns a nodelist
  };

  // Variables
  var viewer = el("#viewer"), // Calculator screen where result is displayed
    equals = el("#equals"), // Equal button
    nums = el(".num"), // List of numbers
    ops = el(".ops"), // List of operators
    theNum = "", // Current number
    oldNum = "", // First number
    resultNum, // Result
    operator; // Batman

  // When: Number is clicked. Get the current number selected
  var setNum = function () {
    if (resultNum) {
      // If a result was displayed, reset number
      theNum = this.getAttribute("data-num");
      resultNum = "";
    } else {
      // Otherwise, add digit to previous number (this is a string!)
      theNum += this.getAttribute("data-num");
    }

    viewer.innerHTML = theNum; // Display current number
  };

  // When: Operator is clicked. Pass number to oldNum and save operator
  var moveNum = function () {
    oldNum = theNum;
    theNum = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", ""); // Reset result in attr
  };

  // When: Equals is clicked. Calculate result
  var displayNum = function () {
    // Convert string input to numbers
    oldNum = parseFloat(oldNum);
    theNum = parseFloat(theNum);

    // Perform operation
    switch (operator) {
      case "plus":
        resultNum = oldNum + theNum;
        break;

      case "minus":
        resultNum = oldNum - theNum;
        break;

      case "times":
        resultNum = oldNum * theNum;
        break;

      case "divided by":
        resultNum = oldNum / theNum;
        break;

      // If equal is pressed without an operator, keep number and continue
      default:
        resultNum = theNum;
    }

    // If NaN or Infinity returned
    if (!isFinite(resultNum)) {
      if (isNaN(resultNum)) {
        // If result is not a number; set off by, eg, double-clicking operators
        resultNum = "You broke it!";
      } else {
        // If result is infinity, set off by dividing by zero
        resultNum = "Nope";
      }
    }

    // Display result, finally!
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);

    // Now reset oldNum & keep result
    oldNum = 0;
    theNum = resultNum;
  };

  // When: Clear button is pressed. Clear everything
  var clearAll = function () {
    oldNum = "";
    theNum = "";
    viewer.innerHTML = "0";
    equals.setAttribute("data-result", resultNum);
  };

  /* The click events */

  // Add click event to numbers
  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  // Add click event to operators
  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  // Add click event to equal sign
  equals.onclick = displayNum;

  // Add click event to clear button
  el("#clear").onclick = clearAll;
})();

// CONVERSION

var inputFeet = document.getElementById("input-feet");
var inputMeters = document.getElementById("input-meters");
var inputCm = document.getElementById("input-cm");
var inputMm = document.getElementById("input-mm");

inputFeet.addEventListener("input", function () {
  inputMeters.value = inputFeet.value * 0.3048;
  inputCm.value = inputFeet.value * 30.48;
  inputMm.value = inputFeet.value * 304.8;
});
inputMeters.addEventListener("input", function () {
  inputFeet.value = inputMeters.value * 3.28084;
  inputCm.value = inputMeters.value * 100;
  inputMm.value = inputMeters.value * 1000;
});
inputCm.addEventListener("input", function () {
  inputFeet.value = inputCm.value * 0.0328084;
  inputMeters.value = inputCm.value * 0.01;
  inputMm.value = inputCm.value * 0.001;
});
inputMm.addEventListener("input", function () {
  inputFeet.value = inputMm.value * 0.00328084;
  inputMeters.value = inputMm.value * 0.001;
  inputCm.value = inputMm.value * 0.1;
});

// FETE DU JOUR

// async function getFete() {
//   let response = await fetch(
//     "https://fetedujour.fr/api/v2/xORhO8PB0wW2V1L6/text-normal"
//   );
//   let data = await response.json();
//   // response.set("Access-Control-Allow-Origin", "*");
//   return data;
// }

// getFete().then((data) => console.log(data));

//   .catch((err) => alert("HUH?"));

// axios
//   .get("https://fetedujour.fr/api/v2/bl37qFNeX6QYVsY6/text-normal")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => console.error(error));

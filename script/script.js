document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const form = document.getElementById("calc");
  const packTick = document.getElementById("packaging-box");
  const returnTick = document.getElementById("return-box");
  const parent = document.getElementById("place");
  const placeInputs = parent.getElementsByTagName("input");
  const floorInpt = document.getElementById("floor-field");
  let isValid = false;

  const regExpString = /^[A-Z]{1}[a-z]{1,}$|^[A-Z]{1}[a-z]{1,}\-[A-Z]{1}[a-z]{1,}$/;
  const regExpDigits = /^[1-9]{1,}$|^[1-9]{1,}[0-9]{1,}$/;

  const validate = (elem) => {
    switch (elem.name) {
      case "from":
        matchText(elem);
        break;
      case "to":
        matchText(elem);
        break;
      case "count":
        matchDigits(elem);
        break;
      case "price":
        matchDigits(elem);
        break;
      case "weight":
        matchDigits(elem);
        break;
      case "height":
        matchDigits(elem);
        break;
      case "width":
        matchDigits(elem);
        break;
      case "length":
        matchDigits(elem);
        break;
      default:
        break;
    }
  };

  const matchText = (elem) => {
    if (!regExpString.test(elem.value) && elem.value !== "") {
      elem.style.borderColor = "Red";
      isValid = false;
    } else {
      elem.style.borderColor = "Initial";
      isValid = true;
    }
  };

  const matchDigits = (elem) => {
    if (!regExpDigits.test(elem.value) && elem.value !== "") {
      elem.style.borderColor = "Red";
      isValid = false;
    } else {
      elem.style.borderColor = "Initial";
      isValid = true;
    }
  };

  const calcDeliver = (fields) => {
    let result =
      (0.05 * parseInt(fields[1].value, 10) +
        (parseInt(fields[2].value, 10) + 0.1) +
        (parseInt(fields[3].value, 10) *
          parseInt(fields[4].value, 10) *
          parseInt(fields[5].value, 10)) /
          4000) *
      parseInt(fields[0].value, 10);
    console.log(result);
    let packCheck = document.getElementById("packaging-box");
    if (packCheck.checked) {
      let boxSize = document.getElementById("package-type").value;
      let boxCount = document.getElementById("package-amount").value;
      switch (boxSize) {
        case "1":
          result += boxCount * 8;
          break;
        case "5":
          result += boxCount * 14;
          break;
        case "10":
          result += boxCount * 19;
          break;
        case "15":
          result += boxCount * 22;
          break;
        default:
          result = result;
      }
    }
    if (floorInpt.value !== "") {
      let elevator = document.getElementById("elevator-box");
      if (elevator.checked) {
        result += 20;
      } else {
        result += floorInpt.value * 5;
      }
    }

    let returnShip = document.getElementById("return-box");
    if (returnShip.checked) {
      let returnType = document.getElementById("return-type");
      switch (returnType.value) {
        case "money":
          result += 3;
          break;
        case "documents":
          result += 5;
        default:
          result = result;
      }
    }
    return Math.round(result);
  };

  for (let elem of form.elements) {
    if (elem.classList.contains("validate")) {
      elem.addEventListener("blur", () => {
        validate(elem);
      });
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    for (let elem of form.elements) {
      if (elem.classList.contains("validate")) {
        if (elem.value === "") {
          elem.style.borderColor = "Red";
          isValid = false;
        }
      }
    }

    console.log(isValid);

    if (isValid) {
      let result = calcDeliver(placeInputs);
      let resultBlock = document.getElementById("result-block");
      resultBlock.style.display = "Block";
      let resultText = document.getElementById("result__price");
      resultText.innerText = result + "UAH";
    } else {
      alert("Fields are empty!");
    }
  });

  packTick.addEventListener("change", () => {
    let packBlock = document.getElementById("package-block");
    if (packTick.checked) {
      packBlock.style.display = "Inline";
    } else {
      packBlock.style.display = "None";
    }
  });

  returnTick.addEventListener("change", () => {
    let returnBlock = document.getElementById("return-block");
    if (returnTick.checked) {
      returnBlock.style.display = "Block";
    } else {
      returnBlock.style.display = "None";
    }
  });
});

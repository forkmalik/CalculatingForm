var valid = true;

let packTick = document.getElementById("packaging-box");
packTick.addEventListener("change", (event) => {
  let packBlock = document.getElementById("package-block");
  if (packTick.checked) {
    packBlock.style.display = "Inline";
  } else {
    packBlock.style.display = "None";
  }
});
let returnTick = document.getElementById("return-box");
returnTick.addEventListener("change", (event) => {
  let returnBlock = document.getElementById("return-block");
  if (returnTick.checked) {
    returnBlock.style.display = "Block";
  } else {
    returnBlock.style.display = "None";
  }
});

let calcBtn = document.getElementById("calc-btn");
calcBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let fromRoute = document.getElementById("from-route");
  let toRoute = document.getElementById("to-route");
  let fromRight = matchCity(fromRoute);
  let toRight = matchCity(toRoute);

  validateInput(fromRoute, fromRight);
  validateInput(toRoute, toRight);

  let parent = document.getElementById("place");
  var placeInputs = parent.getElementsByTagName("input");

  for (i = 0; i < placeInputs.length; i++) {
    let rightValue = matchDigits(placeInputs[i]);
    validateInput(placeInputs[i], rightValue);
  }

  

  let result = calcDeliver(placeInputs);
  if (valid) {
    let resultBlock = document.getElementById("result-block");
    resultBlock.style.display = "Block";
    let resultText = document.getElementById('result__price');
    resultText.innerText = result + "UAH";
  }
  
  
});

var calcDeliver = (fields) => {
  for (i = 0; i < fields.length; i++) {
    fields[i] = parseInt(fields[i].value, 10);
    console.log(parseInt(fields[i].value, 10)); 
  }

  let result = ((0.05 * parseInt(fields[1].value, 10) + (parseInt(fields[2].value, 10) + 0.1) + (parseInt(fields[3].value, 10) * parseInt(fields[4].value, 10) * parseInt(fields[5].value, 10)) / 4000)) * parseInt(fields[0].value, 10);
  console.log(result);
  let packCheck = document.getElementById("packaging-box");
  if (packCheck.checked) {
    let boxSize = document.getElementById("package-type").value;
    let boxCount = document.getElementById("package-amount").value;
    switch (boxSize) {
      case '1':
        result += boxCount * 8;
        break;
      case '5':
        result += boxCount * 14;
        break;
      case '10':
        result += boxCount * 19;
        break;
      case '15':
        result += boxCount * 22;
        break;
      default:
        result = result;
    }
  }
  if (floorInpt.value) {
    let elevator = document.getElementById("elevator-box");
    if (elevator.checked) {
      result += 20;
    } else {
      result += floorInpt.value * 5;
    }
  }

  let returnShip = document.getElementById("return-box");
  if (returnShip.checked) {
    let returnType = document.getElementById('return-type');
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
  console.log(result);
  return result;
};

var floorInpt = document.getElementById("floor-field");
floorInpt.addEventListener("input", () => {
  let correct = matchDigits(floorInpt);
  validateInput(floorInpt, correct);
});

var validateInput = (field, value) => {
  if (!value) {
    valid = false;
    changeColor(field, "Red");
  }
  if (value) {
    valid = true;
    changeColor(field, "Initial");
  }
};

var matchDigits = (elem) => {
  let rightForm = elem.value.match(/^[1-9]{1,}$|^[1-9]{1,}[0-9]{1,}$/);
  return rightForm;
};

var matchCity = (elem) => {
  let rightForm = elem.value.match(/^[A-Z]{1}[a-z]{1,}$/);
  if (!rightForm) {
    rightForm = elem.value.match(/^[A-Z]{1}[a-z]{1,}\-[A-Z]{1}[a-z]{1,}$/);
  }
  return rightForm;
};

var changeColor = (element, color) => {
  element.style.borderColor = color;
};

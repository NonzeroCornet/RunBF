if (location.protocol != "https:") {
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}
var input = document.getElementsByTagName("textarea")[0];
var output = document.getElementsByTagName("p")[0];
var code = "";
var mobileBtnHandler = document.getElementById("mobileBtnHandler");

const ua = navigator.userAgent;
if (
  /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ||
  /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
    ua
  )
) {
  mobileBtnHandler.style.display = "block";
} else {
  mobileBtnHandler.style.display = "none";
}

function updateCode() {
  var inSplit = input.value.split("");
  for (let i = 0; i < inSplit.length; i++) {
    if (
      inSplit[i] != "<" &&
      inSplit[i] != ">" &&
      inSplit[i] != "+" &&
      inSplit[i] != "-" &&
      inSplit[i] != "[" &&
      inSplit[i] != "]" &&
      inSplit[i] != "," &&
      inSplit[i] != "." &&
      inSplit[i] != " " &&
      inSplit[i] != "\n"
    ) {
      inSplit[i] = "";
    }
  }
  input.value = inSplit.join("");
  code = input.value;
}

input.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 9) {
    event.preventDefault();
    if (document.selection) {
      input.focus();
      var sel = document.selection.createRange();
      sel.text = "    ";
    } else if (input.selectionStart || input.selectionStart == "0") {
      var startPos = input.selectionStart;
      var endPos = input.selectionEnd;
      input.value =
        input.value.substring(0, startPos) +
        "    " +
        input.value.substring(endPos, input.value.length);
    } else {
      input.value += "    ";
    }
  }
});

document.addEventListener("keydown", function (event) {
  var code = event.keyCode || event.which;
  if (code === 69) {
    toggleHide();
  } else if (code === 82) {
    event.preventDefault();
    run();
  }
});

function toggleHide() {
  if (input.style.visibility == "hidden") {
    input.style.visibility = "visible";
  } else {
    input.style.visibility = "hidden";
  }
}

function run() {
  var registers = [];
  var selectedRegister = 14999;
  registers[14999] = 0;
  var codes = code.split("");
  var outputStr = "";
  var inceptionA = 0;
  var inceptionB = 1;
  for (let i = 0; i < codes.length; i++) {
    if (codes[i] == "[") {
      inceptionA++;
      codes[i] += inceptionA.toString();
    }
  }
  console.log(codes);
  for (var i = 0; i < codes.length; i++) {
    if (
      codes[i] != "<" &&
      codes[i] != ">" &&
      codes[i] != "+" &&
      codes[i] != "-" &&
      codes[i].split("")[0] != "[" &&
      codes[i] != "]" &&
      codes[i] != "," &&
      codes[i] != "."
    ) {
      codes[i] = "";
    } else if (codes[i] == "<") {
      selectedRegister--;
      if (
        registers[selectedRegister] == NaN ||
        registers[selectedRegister] == undefined
      ) {
        registers[selectedRegister] = 0;
      }
    } else if (codes[i] == ">") {
      selectedRegister++;
      if (
        registers[selectedRegister] == NaN ||
        registers[selectedRegister] == undefined
      ) {
        registers[selectedRegister] = 0;
      }
    } else if (codes[i] == "+") {
      registers[selectedRegister]++;
    } else if (codes[i] == "-") {
      registers[selectedRegister]--;
    } else if (codes[i] == ".") {
      output.innerHTML += String.fromCharCode(registers[selectedRegister]);
      outputStr += String.fromCharCode(registers[selectedRegister]);
    } else if (codes[i] == ",") {
      registers[selectedRegister] = prompt(
        "Taking Input... (Will only take in first character)"
      ).charCodeAt(0);
    } else if (codes[i] == "]") {
      if (registers[selectedRegister] > 0) {
        for (let x = 0; x < codes.length; x++) {
          if (codes[x] == "[" + inceptionB.toString()) {
            i = x;
          }
        }
      }
    } else if (codes[i].split("")[0] != "[") {
      alert(codes[i]);
    }
  }
  if (outputStr != "") {
    output.innerHTML += "<br>";
  }
}
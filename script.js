if (location.protocol != "https:") {
  location.href =
    "https:" + window.location.href.substring(window.location.protocol.length);
}
var input = document.getElementsByTagName("textarea")[0];
var output = document.getElementsByTagName("p")[0];
var code = "";

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
    if (input.style.display == "none") {
      input.style.display = "block";
    } else {
      input.style.display = "none";
    }
  } else if (code === 83) {
    event.preventDefault();
    run();
  }
});

function run() {
  var registers = [];
  var selectedRegister = 14999;
  registers[14999] = 0;
  var codes = code.split("");
  var outputStr = "";
  for (let i = 0; i < codes.length; i++) {
    if (
      codes[i] != "<" &&
      codes[i] != ">" &&
      codes[i] != "+" &&
      codes[i] != "-" &&
      codes[i] != "[" &&
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
    } else {
      alert(codes[i]);
    }
  }
  if (outputStr != "") {
    output.innerHTML += "<br>";
  }
}
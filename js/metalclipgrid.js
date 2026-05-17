const parentElements = document.querySelectorAll(".parent");
const gridStyleInput = document.querySelectorAll(".grid-style");
let gridStyle;

gridStyleInput.forEach(input => {
  input.addEventListener("input", () => {
    if (input.checked) {
      gridStyle = input.value;
    }
    if (gridStyle === "adjusted-column-width") {
      parentElements.forEach(parent => {
        parent.classList.remove("parent--fixed-width");
        parent.classList.add("parent--adjusted-width");
      })
    }
    if (gridStyle === "fixed-column-width") {
      parentElements.forEach(parent => {
        parent.classList.remove("parent--adjusted-width");
        parent.classList.add("parent--fixed-width");
      })
    }
  });
});

const maxColsInput = document.getElementById("maxCols");
const maxColsOutput = document.querySelector("#maxCols + .output");
maxColsInput.value = +getComputedStyle(parentElements[0]).getPropertyValue("--max-cols");

maxColsInput.addEventListener("input", () => {
  setMaxCols();
});

const minColsInput = document.getElementById("minCols");
const minColsOutput = document.querySelector("#minCols + .output");
minColsInput.value = +getComputedStyle(parentElements[0]).getPropertyValue("--min-cols");

minColsInput.addEventListener("input", () => {
  setMinCols();
});

const colsMinWidthInput = document.getElementById("colsMinWidth");
const colsMinWidthOutput = document.querySelector("#colsMinWidth + .output");
colsMinWidthInput.value = getColsMinWidthValue();

function getColsMinWidthValue() {
  let value;
  const colsMinWidthValue = getComputedStyle(parentElements[0]).getPropertyValue("--cols-min-width");
  const colsMinWidthLowerCase = colsMinWidthValue.toLowerCase();
  if (colsMinWidthLowerCase.includes("rem")) {
    const colsMinWidthNumeric = +colsMinWidthLowerCase.replace("rem", "");
    value = colsMinWidthNumeric * parseFloat(getComputedStyle(document.documentElement).fontSize);
  } else if (colsMinWidthLowerCase.includes("%")) {
    const colsMinWidthNumeric = +colsMinWidthLowerCase.replace("%", "");
    const parentWidth = document.querySelector(".parent").offsetWidth;
    value = colsMinWidthNumeric * parentWidth / 100;
  } else if (colsMinWidthLowerCase.includes("px")) {
    const colsMinWidthNumeric = +colsMinWidthLowerCase.replace("rem", "");
    value = colsMinWidthNumeric;
  }
  if (!value) {
    alert("The 3rd parameter for the mixins (min-cols-width) should be set in 'rem', '%' or 'px' units");
    return 100;
  }
  if (value < 0 || value > 200) {
    alert("The 3rd parameter for the mixins (min-cols-width) must be between 0 and 200 pixels");
    return 100;
  }
  return value;
}

colsMinWidthInput.addEventListener("input", () => {
  setColsMinWidth();
});

function setMaxCols() {
  parentElements.forEach(parent => {
    parent.style.setProperty('--max-cols', maxColsInput.value);
    maxColsOutput.innerText = maxColsInput.value;
  });
  if (+maxColsInput.value < +minColsInput.value) {
    minColsInput.value = maxColsInput.value;
    setMinCols();
  }
}

setMaxCols();

function setMinCols() {
  parentElements.forEach(parent => {
    parent.style.setProperty('--min-cols', minColsInput.value);
    minColsOutput.innerText = minColsInput.value;
  });
  if (+minColsInput.value > +maxColsInput.value) {
    maxColsInput.value = minColsInput.value;
    setMaxCols();
  }
}

setMinCols();

function setColsMinWidth() {
  parentElements.forEach(parent => {
    parent.style.setProperty('--cols-min-width', colsMinWidthInput.value + "px");
    colsMinWidthOutput.innerText = colsMinWidthInput.value + "px";
  });
}

setColsMinWidth();

const settings = document.querySelector(".settings");
const toggleSettingsButton = document.getElementById("toggleSettings");

toggleSettingsButton.addEventListener("click", () => {
  settings.classList.toggle("is-hidden");
  toggleSettingsButton.classList.toggle("hide-settings");
})
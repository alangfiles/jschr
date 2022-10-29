import { Utility } from "./Utility.js";
import { WebStuff } from "./WebStuff.js";

let SECTION_TO_UPDATE;
let globalData;
let globalRow;
let globalColumn;

function dropHandler(e) {
  e.preventDefault();
  document.getElementById("loading").style.display = "block";

  let alldataflag = document.getElementById("all-data").checked;

  let reader = new FileReader();
  reader.onload = async function (e) {
    var rawData = reader.result;
    let data = await Utility.generateCHR(rawData, alldataflag);
    WebStuff.globalData = data;
    globalData = data;
    WebStuff.generate(data);
    document.getElementById("loading").style.display = "none";
    document.getElementById("palette-options").style.display = "flex";
  };

  reader.readAsArrayBuffer(e.dataTransfer.files[0]);
}

window.addEventListener("drop", dropHandler, false);
window.addEventListener("dragover", (e) => e.preventDefault(), false);
window.addEventListener("load", onLoad);

function removeSelectedColorPickerCss() {
  let colorPickers = document.getElementsByClassName("big-color-picker");
  for (let i = 0; i < colorPickers.length; i++) {
    colorPickers[i].classList.remove("selected");
  }
}
function onLoad() {
  document
    .getElementById("palette-1")
    .addEventListener(
      "click",
      () => setColors("#000000", "#a80020", "#fca044", "#f8d878"),
      false
    );

  document.getElementById("color-picker-0").addEventListener("click", () => {
    removeSelectedColorPickerCss();
    document.getElementById("color-picker-0").classList.add("selected");
    WebStuff.pickedColor = 0;
  });
  document.getElementById("color-picker-1").addEventListener("click", () => {
    removeSelectedColorPickerCss();
    document.getElementById("color-picker-1").classList.add("selected");
    WebStuff.pickedColor = 1;
  });
  document.getElementById("color-picker-2").addEventListener("click", () => {
    removeSelectedColorPickerCss();
    document.getElementById("color-picker-2").classList.add("selected");
    WebStuff.pickedColor = 2;
  });
  document.getElementById("color-picker-3").addEventListener("click", () => {
    removeSelectedColorPickerCss();
    document.getElementById("color-picker-3").classList.add("selected");
    WebStuff.pickedColor = 3;
  });

  document.addEventListener("mousedown", () => {
    WebStuff.mouseDown = true;
  });
  document.addEventListener("mouseup", () => {
    WebStuff.mouseDown = false;
  });

  document.getElementById("save-chr").addEventListener("click", async () => {
    let data = Utility.writeCHR(WebStuff.globalData);
    const fileHandle = await window.showSaveFilePicker();
    const fileStream = await fileHandle.createWritable();
    console.log("savechr:", typeof data, { data });
    await fileStream.write(
      new Blob([new Uint8Array(data)], { type: "text/plain" })
    );
    await fileStream.close();
  });

  document
    .getElementById("palette-2")
    .addEventListener(
      "click",
      () => setColors("#000000", "#008888", "#58f898", "#f8d878"),
      false
    );

  document
    .getElementById("palette-3")
    .addEventListener(
      "click",
      () => setColors("#000000", "#fcfcfc", "#f8b8f8", "#e40058"),
      false
    );

  document
    .getElementById("palette-random")
    .addEventListener("click", randomColors, false);

  document
    .getElementById("a-color")
    .addEventListener("click", () => selectCustomColor(".a"), false);
  document
    .getElementById("b-color")
    .addEventListener("click", () => selectCustomColor(".b"), false);
  document
    .getElementById("c-color")
    .addEventListener("click", () => selectCustomColor(".c"), false);
  document
    .getElementById("d-color")
    .addEventListener("click", () => selectCustomColor(".d"), false);

  Array.from(document.getElementsByClassName("custom-selector")).forEach(
    function (element) {
      element.addEventListener("click", selectNewColor);
    }
  );

  document.getElementById("hide-custom-palette-options").addEventListener(
    "click",
    () => {
      document.getElementById("custom-palette-options").style.display = "none";
    },
    false
  );

  document.getElementById("palette-custom").addEventListener(
    "click",
    () => {
      document.getElementById("custom-palette-options").style.display = "block";
    },
    false
  );
}

function setColors(color1, color2, color3, color4) {
  alterExistingCSSRuleAttrib(".a", "background-color", color1);
  alterExistingCSSRuleAttrib(".b", "background-color", color2);
  alterExistingCSSRuleAttrib(".c", "background-color", color3);
  alterExistingCSSRuleAttrib(".d", "background-color", color4);
}

function alterExistingCSSRuleAttrib(selectorText, attribName, newValue) {
  // only one css sheet so we can shortcut to `styleSheets[0]`
  Array.from(document.styleSheets[0].cssRules).forEach((e) => {
    if (e.selectorText == selectorText) {
      e.style[attribName] = newValue;
    }
  });
}

function customColor() {
  document.getElementById("custom-palette-options").style.display = "block";
}

function selectCustomColor(section) {
  //update border color
  SECTION_TO_UPDATE = section;
}

function selectNewColor(e) {
  if (SECTION_TO_UPDATE) {
    let newColor = window.getComputedStyle(e.target).backgroundColor;
    alterExistingCSSRuleAttrib(SECTION_TO_UPDATE, "background-color", newColor);
  }
}

function randomColors() {
  const colors =
    "#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000".split(
      ","
    );

  let shuffled = colors
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  setColors("#000000", shuffled[0], shuffled[1], shuffled[2]);
}

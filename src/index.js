import { Utility } from "./Utility.js";
import { WebStuff } from "./WebStuff.js";

let SECTION_TO_UPDATE;

function generateCHR(arrayBuff, showAllData) {
  const arrayBuffer = new Uint8Array(arrayBuff);

  console.log("array", arrayBuffer);

  let chr = [];

  let memoryAddress = 0;

  let header = {};
  header.MAGIC_NUMBER =
    String.fromCharCode(`${arrayBuffer[0]}`) +
    String.fromCharCode(`${arrayBuffer[1]}`) +
    String.fromCharCode(`${arrayBuffer[2]}`) +
    String.fromCharCode(`${arrayBuffer[3]}`);
  header.PRG_PAGES = arrayBuffer[4];
  header.CHR_PAGES = arrayBuffer[5];
  header.FLAG_6 = arrayBuffer[6];
  header.FLAG_7 = arrayBuffer[7];
  header.FLAG_8 = arrayBuffer[8];
  header.FLAG_9 = arrayBuffer[9];
  header.FLAG_10 = arrayBuffer[10];
  //PRG ROM data in 16kB blocks and one byte for the length of CHR ROM in 8kB blocks
  console.log("header", header);

  let MemorySize;
  let offset;

  if (showAllData || header.CHR_PAGES == 0) {
    MemorySize = arrayBuffer.byteLength;
    offset = 0;
  } else {
    MemorySize = header.CHR_PAGES * 0x2000;
    offset = 16 + header.PRG_PAGES * 0x4000;
  }

  //const MemorySize = 8191;

  while (memoryAddress < MemorySize) {
    const firstPlane = [];
    const secondPlane = [];

    //fill up both planes, then put that in the CHR
    while (firstPlane.length < 8) {
      const data = arrayBuffer[memoryAddress + offset];

      if (data) {
        const eightBits = "00000000" + data.toString(2);
        firstPlane.push(eightBits.substr(eightBits.length - 8));
      } else {
        firstPlane.push("00000000");
      }
      memoryAddress++;
    }

    while (secondPlane.length < 8) {
      const data = arrayBuffer[memoryAddress + offset];

      if (data) {
        const eightBits = "00000000" + data.toString(2);
        secondPlane.push(eightBits.substr(eightBits.length - 8));
      } else {
        secondPlane.push("00000000");
      }
      memoryAddress++;
    }

    const combined = Utility.combinePlanes(firstPlane, secondPlane);
    chr.push(combined);
  }

  // fs.writeFileSync("./data.txt", JSON.stringify(chr));
  return chr;
}

function dropHandler(e) {
  e.preventDefault();
  document.getElementById("loading").style.display = "block";

  let alldataflag = document.getElementById("all-data").checked;

  let reader = new FileReader();
  reader.onload = async function (e) {
    var rawData = reader.result;
    let data = await generateCHR(rawData, alldataflag);
    WebStuff.generate(data);
    document.getElementById("loading").style.display = "none";
    document.getElementById("palette-options").style.display = "flex";
  };

  reader.readAsArrayBuffer(e.dataTransfer.files[0]);
}

window.addEventListener("drop", dropHandler, false);
window.addEventListener("dragover", (e) => e.preventDefault(), false);

window.addEventListener("load", onLoad);

function onLoad() {
  document
    .getElementById("palette-1")
    .addEventListener(
      "click",
      () => setColors("#000000", "#a80020", "#fca044", "#f8d878"),
      false
    );

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

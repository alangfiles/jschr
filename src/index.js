import { Utility } from "./Utility.js";
import { WebStuff } from "./WebStuff.js";

function generateCHR(arrayBuff) {
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

  //const MemorySize = arrayBuffer.byteLength;

  const MemorySize = header.CHR_PAGES * 0x2000;

  let offset = 16 + header.PRG_PAGES * 0x4000;

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

  let reader = new FileReader();
  reader.onload = function (e) {
    var rawData = reader.result;
    let data = generateCHR(rawData);
    WebStuff.generate(data);
  };

  reader.readAsArrayBuffer(e.dataTransfer.files[0]);
}

window.addEventListener("drop", dropHandler, false);
window.addEventListener("dragover", (e) => e.preventDefault(), false);

window.addEventListener("load", onLoad);

function onLoad() {
  document
    .getElementById("newcolors-a")
    .addEventListener(
      "click",
      () => WebStuff.changeColor("a", Math.floor(Math.random() * 56)),
      false
    );

  document
    .getElementById("newcolors-b")
    .addEventListener(
      "click",
      () => WebStuff.changeColor("b", Math.floor(Math.random() * 56)),
      false
    );
  document
    .getElementById("newcolors-c")
    .addEventListener(
      "click",
      () => WebStuff.changeColor("c", Math.floor(Math.random() * 56)),
      false
    );

  document
    .getElementById("newcolors-d")
    .addEventListener(
      "click",
      () => WebStuff.changeColor("d", Math.floor(Math.random() * 56)),
      false
    );
}

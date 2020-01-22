import { Rom } from "./Rom.js";
import { Utility } from "./Utility.js";
import { WebStuff } from "./WebStuff.js";

function generateCHR(arrayBuff) {
  const arrayBuffer = arrayBuff;

  const rom = new Rom(arrayBuffer);

  const MemorySize = 8191;

  let chr = [];

  let memoryAddress = 0;

  while (memoryAddress < MemorySize) {
    const firstPlane = [];
    const secondPlane = [];

    //fill up both planes, then put that in the CHR
    while (firstPlane.length < 8) {
      const data = rom.load(memoryAddress);

      if (data) {
        const eightBits = "00000000" + data.toString(2);
        firstPlane.push(eightBits.substr(eightBits.length - 8));
      } else {
        firstPlane.push("00000000");
      }
      memoryAddress++;
    }

    while (secondPlane.length < 8) {
      const data = rom.load(memoryAddress);

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
  reader.onload = function(e) {
    var rawData = reader.result;
    let data = generateCHR(rawData);
    WebStuff.generate(data);
  };

  reader.readAsArrayBuffer(e.dataTransfer.files[0]);
}

window.addEventListener("drop", dropHandler, false);
window.addEventListener("dragover", e => e.preventDefault(), false);

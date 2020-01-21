import { Rom } from "./Rom.js";
import { Utility } from "./Utility.js";
import fs from "fs";

function generateCHR() {
  const arrayBuffer = fs.readFileSync("./nestest.nes");

  const rom = new Rom(arrayBuffer);

  const MemorySize = 8191;

  let chr = [];

  for (let memoryAddress = 0; memoryAddress < MemorySize; memoryAddress++) {
    const firstPlane = [];
    for (let i = 0; i < 8; i++) {
      const data = rom.load(memoryAddress);
      if (data) {
        const eightBits = "00000000" + data.toString(2);
        firstPlane.push(eightBits.substr(eightBits.length - 8));
        memoryAddress++;
      } else {
        firstPlane.push("00000000");
      }
    }
    const secondPlane = [];
    for (let i = 0; i < 8; i++) {
      const data = rom.load(memoryAddress);
      if (data) {
        const eightBits = "00000000" + data.toString(2);
        secondPlane.push(eightBits.substr(eightBits.length - 8));
        memoryAddress++;
      } else {
        secondPlane.push("00000000");
      }
    }
    try {
      const combined = Utility.combinePlanes(firstPlane, secondPlane);

      chr.push(combined);
    } catch (e) {
      console.log("Error: e:", e);
    }
  }

  fs.writeFileSync("./data.txt", JSON.stringify(chr));
  return chr;
}

generateCHR();

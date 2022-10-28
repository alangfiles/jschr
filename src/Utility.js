function Utility() {}

/**
 *
 */
Utility.convertDecToHexString = function (num, width, noPrefix) {
  var str = num.toString(16);

  var prefix = "";

  if (num < 0) prefix += "-";

  if (noPrefix !== true) prefix += "0x";

  if (width === undefined) return prefix + str;

  var base = "";

  for (var i = 0; i < width; i++) base += "0";

  return prefix + (base + str).substr(-1 * width);
};

Utility.combinePlanes = function (first, second) {
  let result = [];

  for (let byte = 0; byte < 8; byte++) {
    let string = "";
    for (let bit = 0; bit < 8; bit++) {
      if (first[byte][bit] == 0 && second[byte][bit] == 0) {
        string += "0";
      } else if (first[byte][bit] == 1 && second[byte][bit] == 0) {
        string += "1";
      } else if (first[byte][bit] == 0 && second[byte][bit] == 1) {
        string += "2";
      } else if (first[byte][bit] == 1 && second[byte][bit] == 1) {
        string += "3";
      }
    }
    result.push(string);
  }
  return result;
};

Utility.generateCHR = function (arrayBuff, showAllData) {
  //old function, not used anymore.
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
};

Utility.read2bppData = function (arrayBuff) {
  const arrayBuffer = new Uint8Array(arrayBuff);

  let chr = [];

  let memoryAddress = 0;
  let MemorySize = arrayBuffer.byteLength;
  let offset = 0;

  while (memoryAddress < MemorySize) {
    const firstPlane = [];
    const secondPlane = [];

    //fill up both planes, then put those pixels in the CHR
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
};

export { Utility };

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

// Utility.splitPlanes = function (currentRow) {
//   // this will take in a sprite (8 rows) and return
//   // 16 bytes from it.

//   let result = [];
//   for (let i = 0; i < 8; i++) {
//     let singleResult = Utility.splitSingleRow(currentRow[i]);
//     result.push(singleResult);
//   }
//   return result.flat();
// };

Utility.splitSingleRow = function (data) {
  if (!data) {
    return [parseInt("00000000", 2), parseInt("00000000", 2)];
  }
  // this takes a single row like "00112233"
  // and returns 2 bytes from it.
  let byteOne = "";
  let byteTwo = "";
  for (let i = 0; i < data.length; i++) {
    if (data[i] == "0") {
      byteOne += "0";
      byteTwo += "0";
    }
    if (data[i] == "1") {
      byteOne += "1";
      byteTwo += "0";
    }
    if (data[i] == "2") {
      byteOne += "0";
      byteTwo += "1";
    }
    if (data[i] == "3") {
      byteOne += "1";
      byteTwo += "1";
    }
  }

  return [parseInt(byteOne, 2), parseInt(byteTwo, 2)];
};

Utility.combinePlanes = function (first, second) {
  //takes in 2 sets of 8 bytes and compares bits in them.
  let result = [];
  // console.log("start");
  // console.log({ first, second });

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

Utility.writeCHR = function (spriteList) {
  console.log("writeCHR:", spriteList);
  const arrayBuffer = new Uint8Array(spriteList.length * 16);
  let memoryAddress = 0;

  // takes in the data (sprite[spriteNo] = array of 8 bytes)

  for (let spriteIndex = 0; spriteIndex < spriteList.length; spriteIndex++) {
    //for each sprite in the sprite List
    let currentSprite = spriteList[spriteIndex];
    //the sprite looks like this, 8 rows.
    /*
    00001100
    00001200
    00001300
    00011100
    00011110
    00111110
    00011110
    22311113
    */
    //we want to transform that into 16 bytes, two for each row,
    //but the tricky part is that the first 8 bytes are the first
    // split result of each of those. and the second 8 bytes are the
    // next split result

    let firstEightBytes = [];
    let secondEightBytes = [];

    for (let rowIndex = 0; rowIndex < currentSprite.length; rowIndex++) {
      let currentRow = currentSprite[rowIndex];
      let result = Utility.splitSingleRow(currentRow);
      firstEightBytes.push(result[0]);
      secondEightBytes.push(result[1]);
    }

    for (let i = 0; i < firstEightBytes.length; i++) {
      arrayBuffer[memoryAddress] = firstEightBytes[i];
      memoryAddress++;
    }
    for (let i = 0; i < secondEightBytes.length; i++) {
      arrayBuffer[memoryAddress] = secondEightBytes[i];
      memoryAddress++;
    }
  }

  return arrayBuffer;
};

Utility.generateCHR = function (arrayBuff, showAllData) {
  //old function, not used anymore.
  console.log("Entry", { arrayBuff });
  const arrayBuffer = new Uint8Array(arrayBuff);

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
    //each plane is 8 bytes.
    //so the memory looks like:
    //8 bytes for half the sprite
    //8 bytes for the other half of the sprite

    // the data is a bunch of sprites, but it takes 16 bytes
    // to define each sprite.
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

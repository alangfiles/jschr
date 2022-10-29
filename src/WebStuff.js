const WebStuff = {
  //data:
  globalData: null,
  pickedColor: 0,
  mouseDown: false,
  selectedSprite: 0,

  //functions:
  generateColorPalette: function () {
    // const colors =
    //   "#000000,#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000".split(
    //     ","
    //   );
    // for (let offset = 0; offset < 64; offset += 16) {
    //   const row = document.createElement("div");
    //   row.classList.add("row");
    //   for (let i = 0; i < 16; i++) {
    //     const cd = document.createElement("div");
    //     cd.classList.add("color-palette-block");
    //     cd.setAttribute("style", `background-color: ${colors[i + offset]}`);
    //     row.appendChild(cd);
    //   }
    //   document.getElementById("color-palette").appendChild(row);
    // }
  },

  changeColor: function (sprite, row, pixel) {
    let data = this.globalData[sprite][row]; //like "00112233"
    data = data.substr(0, pixel) + this.pickedColor + data.substr(pixel + 1);

    this.globalData[sprite][row] = data;

    this.drawChrZoom();
    this.generate();
  },
  drawChrZoom: function () {
    if (!this.globalData) {
      console.error("No CHR loaded yet");
      return;
    }
    this.TwoBPPWriter("chr-dump-zoom", false, true, this.selectedSprite, 4, 4);
  },
  generate: function () {
    this.TwoBPPWriter("chr-dump", true, false);
  },
  TwoBPPWriter: function (
    divName,
    linkZoomAction = false,
    colorPixelAction = false,
    startingSprite = 0,
    maxSpritesInRow = 16,
    maxRows = null
  ) {
    let spritesInRow = 0;
    let hexString;
    let numberOfSpritesDrawn = 0;
    let MAX_SPRITES = maxRows
      ? maxRows * maxSpritesInRow
      : this.globalData.length;
    let allContent = document.createElement("div");
    allContent.classList.add("allContent");

    let rowOfSprites = document.createElement("div");

    for (
      let sprite = startingSprite;
      numberOfSpritesDrawn < MAX_SPRITES;
      numberOfSpritesDrawn++
    ) {
      if (spritesInRow == maxSpritesInRow) {
        allContent.appendChild(rowOfSprites);
        rowOfSprites = document.createElement("div");
        spritesInRow = 0;

        sprite += 16 - maxSpritesInRow;
      }

      hexString = sprite.toString(16);
      if (hexString.length < 2) {
        hexString = "0" + hexString;
      }
      const spriteDiv = document.createElement("div");
      spriteDiv.classList.add("sprite");
      spriteDiv.setAttribute("title", "0x" + hexString);
      for (let row = 0; row < 8; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        for (let pixel = 0; pixel < 8; pixel++) {
          const pixelDiv = document.createElement("div");
          pixelDiv.classList.add("pixel");
          switch (this.globalData[sprite][row][pixel]) {
            case "0":
              pixelDiv.classList.add("a");
              break;
            case "1":
              pixelDiv.classList.add("b");
              break;
            case "2":
              pixelDiv.classList.add("c");
              break;
            case "3":
              pixelDiv.classList.add("d");
              break;
          }
          if (colorPixelAction) {
            pixelDiv.addEventListener("mouseover", (e) => {
              if (this.mouseDown) {
                this.changeColor(sprite - 1, row, pixel);
              }
            });
          }

          rowDiv.appendChild(pixelDiv);
        }
        spriteDiv.appendChild(rowDiv);
      }

      if (linkZoomAction) {
        spriteDiv.addEventListener("click", () => {
          this.selectedSprite = sprite - 1;
          this.drawChrZoom();
        });
      }

      rowOfSprites.appendChild(spriteDiv);
      spritesInRow++;
      sprite++;
    }

    allContent.appendChild(rowOfSprites);

    document.getElementById(divName).innerHTML = "";
    document.getElementById(divName).appendChild(allContent);
  },
};

export { WebStuff };

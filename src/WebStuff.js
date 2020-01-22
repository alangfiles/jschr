function WebStuff() {}

WebStuff.generateColorPalette = function() {
  const colors = "#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#000000,#000000,#000000,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#000000,#000000,#000000,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#000000,#000000,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000,#000000".split(
    ","
  );

  for (let offset = 0; offset < 64; offset += 16) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < 16; i++) {
      const cd = document.createElement("div");
      cd.classList.add("color-palette-block");
      cd.setAttribute("style", `background-color: ${colors[i + offset]}`);
      row.appendChild(cd);
    }
    document.getElementById("color-palette").appendChild(row);
  }
};

WebStuff.changeColor = function(group, color) {
  const elementsHTMLCollection = document.getElementsByClassName(group);

  const elements = Array.prototype.slice.call(elementsHTMLCollection);

  elements.map(e => {
    e.classList.remove(...e.classList);
    e.classList.add(group);
    e.classList.add("pixel");
    e.classList.add(`color_${color}`);
  });
};

WebStuff.generate = function(data) {
  const contentBlock = document.createElement("div");
  for (var plane = 0; plane < data.length; plane++) {
    const planeDiv = document.createElement("div");
    planeDiv.classList.add("plane");
    for (var row = 0; row < 8; row++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (var pixel = 0; pixel < 8; pixel++) {
        const pixelDiv = document.createElement("div");
        pixelDiv.classList.add("pixel");
        switch (data[plane][row][pixel]) {
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
        rowDiv.appendChild(pixelDiv);
      }
      planeDiv.appendChild(rowDiv);
    }
    contentBlock.appendChild(planeDiv);
  }

  document.getElementById("chr-dump").appendChild(contentBlock);
};

export { WebStuff };

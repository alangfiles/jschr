!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(){}function r(){}n.r(t),o.convertDecToHexString=function(e,t,n){var o=e.toString(16),r="";if(e<0&&(r+="-"),!0!==n&&(r+="0x"),void 0===t)return r+o;for(var a="",c=0;c<t;c++)a+="0";return r+(a+o).substr(-1*t)},o.combinePlanes=function(e,t){let n=[];for(let o=0;o<8;o++){let r="";for(let n=0;n<8;n++)0==e[o][n]&&0==t[o][n]?r+="0":1==e[o][n]&&0==t[o][n]?r+="1":0==e[o][n]&&1==t[o][n]?r+="2":1==e[o][n]&&1==t[o][n]&&(r+="3");n.push(r)}return n},r.generateColorPalette=function(){const e="#000000,#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000".split(",");for(let t=0;t<64;t+=16){const n=document.createElement("div");n.classList.add("row");for(let o=0;o<16;o++){const r=document.createElement("div");r.classList.add("color-palette-block"),r.setAttribute("style",`background-color: ${e[o+t]}`),n.appendChild(r)}document.getElementById("color-palette").appendChild(n)}},r.changeColors=function(){const e=[];for(;e.length<4;){const t=Math.floor(56*Math.random());-1==e.indexOf(t)&&e.push(t)}r.changeColor("a",e[0]),r.changeColor("b",e[1]),r.changeColor("c",e[2]),r.changeColor("d",e[3])},r.changeColor=function(e,t){const n=document.getElementsByClassName(e);Array.prototype.slice.call(n).map(n=>{n.classList.remove(...n.classList),n.classList.add(e),n.classList.add("pixel"),n.classList.add(`color_${t}`)})},r.generate=function(e){const t=document.createElement("div");for(var n=0;n<e.length;n++){const a=document.createElement("div");a.classList.add("plane");for(var o=0;o<8;o++){const t=document.createElement("div");t.classList.add("row");for(var r=0;r<8;r++){const a=document.createElement("div");switch(a.classList.add("pixel"),e[n][o][r]){case"0":a.classList.add("a");break;case"1":a.classList.add("b");break;case"2":a.classList.add("c");break;case"3":a.classList.add("d")}t.appendChild(a)}a.appendChild(t)}t.appendChild(a)}document.getElementById("chr-dump").innerHTML="",document.getElementById("chr-dump").appendChild(t),document.getElementById("color-section").style.display="block"},window.addEventListener("drop",(function(e){e.preventDefault();let t=new FileReader;t.onload=function(e){let n=function(e){const t=new Uint8Array(e);console.log("array",t);let n=[],r=0,a={};a.MAGIC_NUMBER=String.fromCharCode(`${t[0]}`)+String.fromCharCode(`${t[1]}`)+String.fromCharCode(`${t[2]}`)+String.fromCharCode(`${t[3]}`),a.PRG_PAGES=t[4],a.CHR_PAGES=t[5],a.FLAG_6=t[6],a.FLAG_7=t[7],a.FLAG_8=t[8],a.FLAG_9=t[9],a.FLAG_10=t[10],console.log("header",a);const c=8192*a.CHR_PAGES;let l=16+16384*a.PRG_PAGES;for(;r<c;){const e=[],a=[];for(;e.length<8;){const n=t[r+l];if(n){const t="00000000"+n.toString(2);e.push(t.substr(t.length-8))}else e.push("00000000");r++}for(;a.length<8;){const e=t[r+l];if(e){const t="00000000"+e.toString(2);a.push(t.substr(t.length-8))}else a.push("00000000");r++}const c=o.combinePlanes(e,a);n.push(c)}return n}(t.result);r.generate(n)},t.readAsArrayBuffer(e.dataTransfer.files[0])}),!1),window.addEventListener("dragover",e=>e.preventDefault(),!1),window.addEventListener("load",(function(){document.getElementById("newcolors-a").addEventListener("click",()=>r.changeColor("a",Math.floor(56*Math.random())),!1),document.getElementById("newcolors-b").addEventListener("click",()=>r.changeColor("b",Math.floor(56*Math.random())),!1),document.getElementById("newcolors-c").addEventListener("click",()=>r.changeColor("c",Math.floor(56*Math.random())),!1),document.getElementById("newcolors-d").addEventListener("click",()=>r.changeColor("d",Math.floor(56*Math.random())),!1)}))}]);
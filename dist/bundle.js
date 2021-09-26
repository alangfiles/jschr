!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(){}function o(){}function a(e,t,n,r){d(".a","background-color",e),d(".b","background-color",t),d(".c","background-color",n),d(".d","background-color",r)}function d(e,t,n){Array.from(document.styleSheets[0].cssRules).forEach(r=>{r.selectorText==e&&(r.style[t]=n)})}function c(){let e="#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000".split(",").map(e=>({value:e,sort:Math.random()})).sort((e,t)=>e.sort-t.sort).map(({value:e})=>e);a("#000000",e[0],e[1],e[2])}n.r(t),r.convertDecToHexString=function(e,t,n){var r=e.toString(16),o="";if(e<0&&(o+="-"),!0!==n&&(o+="0x"),void 0===t)return o+r;for(var a="",d=0;d<t;d++)a+="0";return o+(a+r).substr(-1*t)},r.combinePlanes=function(e,t){let n=[];for(let r=0;r<8;r++){let o="";for(let n=0;n<8;n++)0==e[r][n]&&0==t[r][n]?o+="0":1==e[r][n]&&0==t[r][n]?o+="1":0==e[r][n]&&1==t[r][n]?o+="2":1==e[r][n]&&1==t[r][n]&&(o+="3");n.push(o)}return n},o.generateColorPalette=function(){},o.generate=function(e){const t=document.createElement("div");for(var n=0;n<e.length;n++){const a=document.createElement("div");a.classList.add("plane");for(var r=0;r<8;r++){const t=document.createElement("div");t.classList.add("row");for(var o=0;o<8;o++){const a=document.createElement("div");switch(a.classList.add("pixel"),e[n][r][o]){case"0":a.classList.add("a");break;case"1":a.classList.add("b");break;case"2":a.classList.add("c");break;case"3":a.classList.add("d")}t.appendChild(a)}a.appendChild(t)}t.appendChild(a)}document.getElementById("chr-dump").innerHTML="",document.getElementById("chr-dump").appendChild(t)},window.addEventListener("drop",function(e){e.preventDefault(),document.getElementById("loading").style.display="block";let t=document.getElementById("all-data").checked,n=new FileReader;n.onload=async function(e){var a=n.result;let d=await function(e,t){const n=new Uint8Array(e);console.log("array",n);let o,a,d=[],c=0,l={};for(l.MAGIC_NUMBER=String.fromCharCode(`${n[0]}`)+String.fromCharCode(`${n[1]}`)+String.fromCharCode(`${n[2]}`)+String.fromCharCode(`${n[3]}`),l.PRG_PAGES=n[4],l.CHR_PAGES=n[5],l.FLAG_6=n[6],l.FLAG_7=n[7],l.FLAG_8=n[8],l.FLAG_9=n[9],l.FLAG_10=n[10],console.log("header",l),t||0==l.CHR_PAGES?(o=n.byteLength,a=0):(o=8192*l.CHR_PAGES,a=16+16384*l.PRG_PAGES);c<o;){const e=[],t=[];for(;e.length<8;){const t=n[c+a];if(t){const n="00000000"+t.toString(2);e.push(n.substr(n.length-8))}else e.push("00000000");c++}for(;t.length<8;){const e=n[c+a];if(e){const n="00000000"+e.toString(2);t.push(n.substr(n.length-8))}else t.push("00000000");c++}const o=r.combinePlanes(e,t);d.push(o)}return d}(a,t);o.generate(d),document.getElementById("loading").style.display="none",document.getElementById("palette-options").style.display="flex"},n.readAsArrayBuffer(e.dataTransfer.files[0])},!1),window.addEventListener("dragover",e=>e.preventDefault(),!1),window.addEventListener("load",function(){document.getElementById("palette-1").addEventListener("click",()=>a("#000000","#a80020","#fca044","#f8d878"),!1),document.getElementById("palette-2").addEventListener("click",()=>a("#000000","#008888","#58f898","#f8d878"),!1),document.getElementById("palette-3").addEventListener("click",()=>a("#000000","#fcfcfc","#f8b8f8","#e40058"),!1),document.getElementById("palette-random").addEventListener("click",c,!1)})}]);
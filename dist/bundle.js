!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(){}function o(){}n.r(t),r.convertDecToHexString=function(e,t,n){var r=e.toString(16),o="";if(e<0&&(o+="-"),!0!==n&&(o+="0x"),void 0===t)return o+r;for(var a="",d=0;d<t;d++)a+="0";return o+(a+r).substr(-1*t)},r.combinePlanes=function(e,t){let n=[];for(let r=0;r<8;r++){let o="";for(let n=0;n<8;n++)0==e[r][n]&&0==t[r][n]?o+="0":1==e[r][n]&&0==t[r][n]?o+="1":0==e[r][n]&&1==t[r][n]?o+="2":1==e[r][n]&&1==t[r][n]&&(o+="3");n.push(o)}return n},o.generateColorPalette=function(){},o.generate=function(e){const t=document.createElement("div");for(var n=0;n<e.length;n++){const a=document.createElement("div");a.classList.add("plane");for(var r=0;r<8;r++){const t=document.createElement("div");t.classList.add("row");for(var o=0;o<8;o++){const a=document.createElement("div");switch(a.classList.add("pixel"),e[n][r][o]){case"0":a.classList.add("a");break;case"1":a.classList.add("b");break;case"2":a.classList.add("c");break;case"3":a.classList.add("d")}t.appendChild(a)}a.appendChild(t)}t.appendChild(a)}document.getElementById("chr-dump").innerHTML="",document.getElementById("chr-dump").appendChild(t)},window.addEventListener("drop",function(e){e.preventDefault(),document.getElementById("loading").style.display="block";let t=document.getElementById("all-data").checked,n=new FileReader;n.onload=async function(e){var a=n.result;let d=await function(e,t){const n=new Uint8Array(e);console.log("array",n);let o,a,d=[],l=0,i={};for(i.MAGIC_NUMBER=String.fromCharCode(`${n[0]}`)+String.fromCharCode(`${n[1]}`)+String.fromCharCode(`${n[2]}`)+String.fromCharCode(`${n[3]}`),i.PRG_PAGES=n[4],i.CHR_PAGES=n[5],i.FLAG_6=n[6],i.FLAG_7=n[7],i.FLAG_8=n[8],i.FLAG_9=n[9],i.FLAG_10=n[10],console.log("header",i),t||0==i.CHR_PAGES?(o=n.byteLength,a=0):(o=8192*i.CHR_PAGES,a=16+16384*i.PRG_PAGES);l<o;){const e=[],t=[];for(;e.length<8;){const t=n[l+a];if(t){const n="00000000"+t.toString(2);e.push(n.substr(n.length-8))}else e.push("00000000");l++}for(;t.length<8;){const e=n[l+a];if(e){const n="00000000"+e.toString(2);t.push(n.substr(n.length-8))}else t.push("00000000");l++}const o=r.combinePlanes(e,t);d.push(o)}return d}(a,t);o.generate(d),document.getElementById("loading").style.display="none"},n.readAsArrayBuffer(e.dataTransfer.files[0])},!1),window.addEventListener("dragover",e=>e.preventDefault(),!1),window.addEventListener("load",function(){})}]);
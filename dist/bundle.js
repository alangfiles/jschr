!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(){}n.r(t),o.convertDecToHexString=function(e,t,n){var o=e.toString(16),r="";if(e<0&&(r+="-"),!0!==n&&(r+="0x"),void 0===t)return r+o;for(var l="",c=0;c<t;c++)l+="0";return r+(l+o).substr(-1*t)},o.combinePlanes=function(e,t){let n=[];for(let o=0;o<8;o++){let r="";for(let n=0;n<8;n++)0==e[o][n]&&0==t[o][n]?r+="0":1==e[o][n]&&0==t[o][n]?r+="1":0==e[o][n]&&1==t[o][n]?r+="2":1==e[o][n]&&1==t[o][n]&&(r+="3");n.push(r)}return n},o.generateCHR=function(e,t){const n=new Uint8Array(e);console.log("array",n);let r,l,c=[],d=0,s={};for(s.MAGIC_NUMBER=String.fromCharCode(""+n[0])+String.fromCharCode(""+n[1])+String.fromCharCode(""+n[2])+String.fromCharCode(""+n[3]),s.PRG_PAGES=n[4],s.CHR_PAGES=n[5],s.FLAG_6=n[6],s.FLAG_7=n[7],s.FLAG_8=n[8],s.FLAG_9=n[9],s.FLAG_10=n[10],console.log("header",s),t||0==s.CHR_PAGES?(r=n.byteLength,l=0):(r=8192*s.CHR_PAGES,l=16+16384*s.PRG_PAGES);d<r;){const e=[],t=[];for(;e.length<8;){const t=n[d+l];if(t){const n="00000000"+t.toString(2);e.push(n.substr(n.length-8))}else e.push("00000000");d++}for(;t.length<8;){const e=n[d+l];if(e){const n="00000000"+e.toString(2);t.push(n.substr(n.length-8))}else t.push("00000000");d++}const r=o.combinePlanes(e,t);c.push(r)}return c},o.read2bppData=function(e){const t=new Uint8Array(e);let n=[],r=0,l=t.byteLength;for(;r<l;){const e=[],l=[];for(;e.length<8;){const n=t[r+0];if(n){const t="00000000"+n.toString(2);e.push(t.substr(t.length-8))}else e.push("00000000");r++}for(;l.length<8;){const e=t[r+0];if(e){const t="00000000"+e.toString(2);l.push(t.substr(t.length-8))}else l.push("00000000");r++}const c=o.combinePlanes(e,l);n.push(c)}return n};const r={globalData:null,pickedColor:0,mouseDown:!1,selectedSprite:0,generateColorPalette:function(){},changeColor:function(e,t,n){let o=this.globalData[e][t];o=o.substr(0,n)+this.pickedColor+o.substr(n+1),this.globalData[e][t]=o,this.drawChrZoom(),this.generate()},drawChrZoom:function(){this.globalData?this.TwoBPPWriter("chr-dump-zoom",!1,!0,this.selectedSprite,4,4):console.error("No CHR loaded yet")},generate:function(){this.TwoBPPWriter("chr-dump",!0,!1)},TwoBPPWriter:function(e,t=!1,n=!1,o=0,r=16,l=null){let c,d=0,s=0,a=l?l*r:this.globalData.length,i=document.createElement("div");i.classList.add("allContent");let u=document.createElement("div");for(let e=o;s<a;s++){d==r&&(i.appendChild(u),u=document.createElement("div"),d=0,e+=16-r),c=e.toString(16),c.length<2&&(c="0"+c);const o=document.createElement("div");o.classList.add("sprite"),o.setAttribute("title","0x"+c);for(let t=0;t<8;t++){const r=document.createElement("div");r.classList.add("row");for(let o=0;o<8;o++){const l=document.createElement("div");switch(l.classList.add("pixel"),this.globalData[e][t][o]){case"0":l.classList.add("a");break;case"1":l.classList.add("b");break;case"2":l.classList.add("c");break;case"3":l.classList.add("d")}n&&l.addEventListener("mouseover",n=>{this.mouseDown&&this.changeColor(e-1,t,o)}),r.appendChild(l)}o.appendChild(r)}t&&o.addEventListener("click",()=>{this.selectedSprite=e-1,this.drawChrZoom()}),u.appendChild(o),d++,e++}i.appendChild(u),document.getElementById(e).innerHTML="",document.getElementById(e).appendChild(i)}};let l,c;function d(){let e=document.getElementsByClassName("big-color-picker");for(let t=0;t<e.length;t++)e[t].classList.remove("selected")}function s(e,t,n,o){a(".a","background-color",e),a(".b","background-color",t),a(".c","background-color",n),a(".d","background-color",o)}function a(e,t,n){Array.from(document.styleSheets[0].cssRules).forEach(o=>{o.selectorText==e&&(o.style[t]=n)})}function i(e){l=e}function u(e){if(l){let t=window.getComputedStyle(e.target).backgroundColor;a(l,"background-color",t)}}function m(){let e="#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000".split(",").map(e=>({value:e,sort:Math.random()})).sort((e,t)=>e.sort-t.sort).map(({value:e})=>e);s("#000000",e[0],e[1],e[2])}window.addEventListener("drop",(function(e){e.preventDefault(),document.getElementById("loading").style.display="block";let t=document.getElementById("all-data").checked,n=new FileReader;n.onload=async function(e){var l=n.result;let d=await o.generateCHR(l,t);r.globalData=d,c=d,r.generate(d),document.getElementById("loading").style.display="none",document.getElementById("palette-options").style.display="flex"},n.readAsArrayBuffer(e.dataTransfer.files[0])}),!1),window.addEventListener("dragover",e=>e.preventDefault(),!1),window.addEventListener("load",(function(){document.getElementById("palette-1").addEventListener("click",()=>s("#000000","#a80020","#fca044","#f8d878"),!1),document.getElementById("color-picker-0").addEventListener("click",()=>{d(),document.getElementById("color-picker-0").classList.add("selected"),r.pickedColor=0}),document.getElementById("color-picker-1").addEventListener("click",()=>{d(),document.getElementById("color-picker-1").classList.add("selected"),r.pickedColor=1}),document.getElementById("color-picker-2").addEventListener("click",()=>{d(),document.getElementById("color-picker-2").classList.add("selected"),r.pickedColor=2}),document.getElementById("color-picker-3").addEventListener("click",()=>{d(),document.getElementById("color-picker-3").classList.add("selected"),r.pickedColor=3}),document.addEventListener("mousedown",()=>{r.mouseDown=!0}),document.addEventListener("mouseup",()=>{r.mouseDown=!1}),document.getElementById("palette-2").addEventListener("click",()=>s("#000000","#008888","#58f898","#f8d878"),!1),document.getElementById("palette-3").addEventListener("click",()=>s("#000000","#fcfcfc","#f8b8f8","#e40058"),!1),document.getElementById("palette-random").addEventListener("click",m,!1),document.getElementById("a-color").addEventListener("click",()=>i(".a"),!1),document.getElementById("b-color").addEventListener("click",()=>i(".b"),!1),document.getElementById("c-color").addEventListener("click",()=>i(".c"),!1),document.getElementById("d-color").addEventListener("click",()=>i(".d"),!1),Array.from(document.getElementsByClassName("custom-selector")).forEach((function(e){e.addEventListener("click",u)})),document.getElementById("hide-custom-palette-options").addEventListener("click",()=>{document.getElementById("custom-palette-options").style.display="none"},!1),document.getElementById("palette-custom").addEventListener("click",()=>{document.getElementById("custom-palette-options").style.display="block"},!1)}))}]);
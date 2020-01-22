!function(t){var e={};function r(i){if(e[i])return e[i].exports;var s=e[i]={i:i,l:!1,exports:{}};return t[i].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(i,s,function(e){return t[e]}.bind(null,s));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";function i(){}function s(t){this.data=new t(1),this.data[0]=0}function n(){s.call(this,s.TYPE_8BIT)}function a(){}function o(t){this.rom=t,this.prgBankNum=t.header.getPRGROMBanksNum(),this.chrBankNum=t.header.getCHRROMBanksNum()}function c(t){o.call(this,t)}function h(t){o.call(this,t),this.controlRegister=new n,this.chrBank0Register=new n,this.chrBank1Register=new n,this.prgBankRegister=new n,this.latch=new n,this.registerWriteCount=0,this.controlRegister.store(12)}function u(t){o.call(this,t),this.reg=new n}function R(t){o.call(this,t),this.reg=new n}function g(t){o.call(this,t),this.register0=new n,this.register1=new n,this.register2=new n,this.register3=new n,this.register4=new n,this.register5=new n,this.register6=new n,this.register7=new n,this.programRegister0=new n,this.programRegister1=new n,this.characterRegister0=new n,this.characterRegister1=new n,this.characterRegister2=new n,this.characterRegister3=new n,this.characterRegister4=new n,this.characterRegister5=new n,this.irqCounter=0,this.irqCounterReload=!1,this.irqEnabled=!0}function d(t){o.call(this,t),this.addrReg=new n,this.chrReg0=new n,this.chrReg1=new n,this.chrReg2=new n,this.chrReg3=new n,this.prgReg0=new n,this.prgReg1=new n}function l(t){this.data=new Uint8Array(t)}function p(t){if(l.call(this,t),this.header=new f(this),!1===this.isNes())throw new Error("This rom doesn't seem iNES format.");this.mapper=(new a).create(this.header.getMapperNum(),this)}function f(t){this.rom=t}function _(){}r.r(e),i.convertDecToHexString=function(t,e,r){var i=t.toString(16),s="";if(t<0&&(s+="-"),!0!==r&&(s+="0x"),void 0===e)return s+i;for(var n="",a=0;a<e;a++)n+="0";return s+(n+i).substr(-1*e)},i.combinePlanes=function(t,e){let r=[];for(let i=0;i<8;i++){let s="";for(let r=0;r<8;r++)0==t[i][r]&&0==e[i][r]?s+="0":1==t[i][r]&&0==e[i][r]?s+="1":0==t[i][r]&&1==e[i][r]?s+="2":1==t[i][r]&&1==e[i][r]&&(s+="3");r.push(s)}return r},s.TYPE_8BIT=Uint8Array,s.TYPE_16BIT=Uint16Array,Object.assign(s.prototype,{isRegister:!0,getWidth:function(){return 8*this.data.byteLength},load:function(){return this.data[0]},loadBit:function(t){return this.data[0]>>t&1},loadBits:function(t,e){return this.data[0]>>t&(1<<e)-1},store:function(t){this.data[0]=t},storeBit:function(t,e){e&=1,this.data[0]=this.data[0]&~(1<<t)|e<<t},storeBits:function(t,e,r){var i=(1<<e)-1;r&=i,this.data[0]=this.data[0]&~(i<<t)|r<<t},clear:function(){this.data[0]=0},setBit:function(t){this.storeBit(t,1)},clearBit:function(t){this.storeBit(t,0)},isBitSet:function(t){return 1===this.loadBit(t)},increment:function(){this.data[0]++},incrementBy2:function(){this.data[0]+=2},add:function(t){this.data[0]+=t},decrement:function(){this.data[0]--},decrementBy2:function(){this.data[0]-=2},sub:function(t){this.data[0]-=t},shift:function(t){t&=1;var e=this.loadBit(this.getWidth()-1);return this.data[0]=this.data[0]<<1|t,e},dump:function(){return i.convertDecToHexString(this.load(),this.getWidth()/4)}}),n.prototype=Object.assign(Object.create(s.prototype),{isRegister8bit:!0}),Object.assign(Object.create(s.prototype),{isRegister16bit:!0,loadHigherByte:function(){return this.bytes[1]},loadLowerByte:function(){return this.bytes[0]},storeHigherByte:function(t){this.bytes[1]=t},storeLowerByte:function(t){this.bytes[0]=t}}),Object.assign(a.prototype,{isMapperFactory:!0,MAPPERS:{0:{name:"NROM",class:c},1:{name:"MMC1",class:h},2:{name:"UNROM",class:u},3:{name:"CNROM",class:R},4:{name:"MMC3",class:g},76:{name:"Mapper76",class:d}},create:function(t,e){return new(this.getMapperParam(t).class)(e)},getName:function(t){return this.getMapperParam(t).name},getMapperParam:function(t){if(void 0===this.MAPPERS[t])throw new Error("unsupport No."+t+" Mapper");return this.MAPPERS[t]}}),Object.assign(o.prototype,{isMapper:!0,map:function(t){return t-32768},mapForChrRom:function(t){return t},store:function(t,e){},getMirroringType:function(){return!0===this.rom.header.isHorizontalMirroring()?this.rom.MIRRORINGS.HORIZONTAL:this.rom.MIRRORINGS.VERTICAL}}),c.prototype=Object.assign(Object.create(o.prototype),{isNROMMapper:!0,map:function(t){return 1===this.prgBankNum&&t>=49152&&(t-=16384),t-32768}}),h.prototype=Object.assign(Object.create(o.prototype),{isMMC1Mapper:!0,map:function(t){var e=0,r=16383&t,i=15&this.prgBankRegister.load();switch(this.controlRegister.loadBits(2,2)){case 0:case 1:r|=16384&t,e=14&i;break;case 2:e=t<49152?0:i;break;case 3:e=t>=49152?this.prgBankNum-1:i}return 16384*e+r},mapForChrRom:function(t){var e,r=4095&t;return 0===this.controlRegister.loadBit(4)?(e=30&this.chrBank0Register.load(),r|=4096&t):e=31&(t<4096?this.chrBank0Register.load():this.chrBank1Register.load()),4096*e+r},store:function(t,e){if(128&e)this.registerWriteCount=0,this.latch.clear(),0==(24576&t)&&this.controlRegister.storeBits(2,2,3);else if(this.latch.store((1&e)<<4|this.latch.load()>>1),this.registerWriteCount++,this.registerWriteCount>=5){var r=this.latch.load();switch(24576&t){case 0:this.controlRegister.store(r);break;case 8192:this.chrBank0Register.store(r);break;case 16384:this.chrBank1Register.store(r);break;case 24576:this.prgBankRegister.store(r)}this.registerWriteCount=0,this.latch.clear()}},getMirroringType:function(){switch(this.controlRegister.loadBits(0,2)){case 0:case 1:return this.rom.MIRRORINGS.SINGLE_SCREEN;case 2:return this.rom.MIRRORINGS.VERTICAL;case 3:return this.rom.MIRRORINGS.HORIZONTAL}}}),u.prototype=Object.assign(Object.create(o.prototype),{isUNROMMapper:!0,map:function(t){return 16384*(t<49152?this.reg.load():this.prgBankNum-1)+(16383&t)},store:function(t,e){this.reg.store(15&e)}}),R.prototype=Object.assign(Object.create(o.prototype),{isCNROMMapper:!0,mapForChrRom:function(t){return 8192*this.reg.load()+(8191&t)},store:function(t,e){this.reg.store(15&e)}}),g.prototype=Object.assign(Object.create(o.prototype),{isMMC3Mapper:!0,map:function(t){var e=8191&(t&=65535);return 8192*(t>=32768&&t<40960?!0===this.register0.isBitSet(6)?2*this.prgBankNum-2:this.programRegister0.load():t>=40960&&t<49152?this.programRegister1.load():t>=49152&&t<57344?!0===this.register0.isBitSet(6)?this.programRegister0.load():2*this.prgBankNum-2:2*this.prgBankNum-1)+e},mapForChrRom:function(t){var e=1023&(t&=8191);return 1024*(!0===this.register0.isBitSet(7)?t>=0&&t<1024?this.characterRegister2.load():t>=1024&&t<2048?this.characterRegister3.load():t>=2048&&t<3072?this.characterRegister4.load():t>=3072&&t<4096?this.characterRegister5.load():t>=4096&&t<5120?254&this.characterRegister0.load():t>=5120&&t<6144?1|this.characterRegister0.load():t>=6144&&t<7168?254&this.characterRegister1.load():1|this.characterRegister1.load():t>=0&&t<1024?254&this.characterRegister0.load():t>=1024&&t<2048?1|this.characterRegister0.load():t>=2048&&t<3072?254&this.characterRegister1.load():t>=3072&&t<4096?1|this.characterRegister1.load():t>=4096&&t<5120?this.characterRegister2.load():t>=5120&&t<6144?this.characterRegister3.load():t>=6144&&t<7168?this.characterRegister4.load():this.characterRegister5.load())+e},store:function(t,e){if((t&=65535)>=32768&&t<40960)if(0==(1&t))this.register0.store(e);else switch(this.register1.store(e),this.register0.loadBits(0,3)){case 0:this.characterRegister0.store(254&e);break;case 1:this.characterRegister1.store(254&e);break;case 2:this.characterRegister2.store(e);break;case 3:this.characterRegister3.store(e);break;case 4:this.characterRegister4.store(e);break;case 5:this.characterRegister5.store(e);break;case 6:this.programRegister0.store(63&e);break;case 7:this.programRegister1.store(63&e)}else t>=40960&&t<49152?0==(1&t)?this.register2.store(e):this.register3.store(e):t>=49152&&t<57344?(0==(1&t)?this.register4.store(e):this.register5.store(e),this.irqCounterReload=!0):0==(1&t)?(this.register6.store(e),this.irqEnabled=!1):(this.register7.store(e),this.irqEnabled=!0)},getMirroringType:function(){return!0===this.register2.isBitSet(0)?this.rom.MIRRORINGS.HORIZONTAL:this.rom.MIRRORINGS.VERTICAL},driveIrqCounter:function(t){!0===this.irqCounterReload?(this.irqCounter=this.register4.load(),this.irqCounterReload=!1):!0===this.irqEnabled&&this.irqCounter>0&&(this.irqCounter--,0===this.irqCounter&&(t.interrupt(t.INTERRUPTS.IRQ),this.irqCounterReload=!0))}}),d.prototype=Object.assign(Object.create(o.prototype),{isMapper76:!0,map:function(t){var e,r=8191&t;switch(57344&t){case 32768:e=this.prgReg0.load();break;case 40960:e=this.prgReg1.load();break;case 49152:e=2*this.prgBankNum-2;break;case 57344:e=2*this.prgBankNum-1}return 8192*e+r},mapForChrRom:function(t){var e,r=2047&t;switch(6144&t){case 0:e=this.chrReg0.load();break;case 2048:e=this.chrReg1.load();break;case 4096:e=this.chrReg2.load();break;case 6144:e=this.chrReg3.load()}return 2048*e+r},store:function(t,e){switch(57345&t){case 32768:this.addrReg.store(7&e);break;case 32769:var r;switch(this.addrReg.load()){case 0:case 1:return;case 2:r=this.chrReg0;break;case 3:r=this.chrReg1;break;case 4:r=this.chrReg2;break;case 5:r=this.chrReg3;break;case 6:r=this.prgReg0;break;case 7:r=this.prgReg1}r.store(63&e)}}}),Object.assign(l.prototype,{isMemory:!0,clear:function(){for(var t=0,e=this.getCapacity();t<e;t++)this.storeWithoutMapping(t,0)},getCapacity:function(){return this.data.byteLength},load:function(t){return this.data[t]},loadWithoutMapping:function(t){return this.data[t]},store:function(t,e){this.data[t]=e},storeWithoutMapping:function(t,e){this.data[t]=e},dump:function(){for(var t="",e=!1,r=this._getStartDumpAddress(),s=this._getEndDumpAddress(),n=r;n<s;n++){if(n%16==0){if(e){for(var a=!1;this._checkNext16BytesIsZero(n+16);)n+=16,a=!0;a&&(t+="...\n")}t+=i.convertDecToHexString(n-r,4)+" ",e=!0}var o=this._loadForDump(n);t+=i.convertDecToHexString(o,2,!0)+" ",0!=o&&(e=!1),n%16==15&&(t+="\n")}return t},_loadForDump:function(t){return this.loadWithoutMapping(t)},_getStartDumpAddress:function(){return 0},_getEndDumpAddress:function(){return this.getCapacity()},_checkNext16BytesIsZero:function(t){if(t+16>=this._getEndDumpAddress())return!1;for(var e=0,r=t;r<t+16;r++)e+=this._loadForDump(r);return 0===e}}),p.MIRRORINGS={SINGLE_SCREEN:0,HORIZONTAL:1,VERTICAL:2,FOUR_SCREEN:3},p.prototype=Object.assign(Object.create(l.prototype),{isRom:!0,MIRRORINGS:p.MIRRORINGS,load:function(t){var e=this.getHeaderSize();return t<8192?(e+=16384*this.header.getPRGROMBanksNum(),e+=this.mapper.mapForChrRom(t)):e+=this.mapper.map(t),this.data[e]},store:function(t,e){this.mapper.store(t,e)},isNes:function(){return this.header.isNes()},getHeaderSize:function(){return this.header.getSize()},hasChrRom:function(){return this.header.hasChrRom()},getMirroringType:function(){return this.mapper.getMirroringType()},dumpHeader:function(){return this.header.dump()},dumpCHRData:function(){return this.header.getCHRROMBanksNum()},_getStartDumpAddress:function(){return this.getHeaderSize()},_getEndDumpAddress:function(){return this.getCapacity()}}),Object.assign(f.prototype,{isRomHeader:!0,size:16,VALID_SIGNATURE:"NES",VALID_MAGIC_NUMBER:26,SIGNATURE_ADDRESS:0,SIGNATURE_SIZE:3,MAGIC_NUMBER_ADDRESS:3,MAGIC_NUMBER_SIZE:1,PRG_ROM_BANKS_NUM_ADDRESS:4,PRG_ROM_BANKS_NUM_SIZE:1,CHR_ROM_BANKS_NUM_ADDRESS:5,CHR_ROM_BANKS_NUM_SIZE:1,CONTROL_BYTE1_ADDRESS:6,CONTROL_BYTE1_SIZE:1,CONTROL_BYTE2_ADDRESS:7,CONTROL_BYTE2_SIZE:1,RAM_BANKS_NUM_ADDRESS:8,RAM_BANKS_NUM_SIZE:1,UNUSED_ADDRESS:9,UNUSED_SIZE:7,MIRRORING_TYPE_BIT:0,MIRRORING_TYPE_BITS_WIDTH:1,MIRRORING_TYPE_HORIZONTAL:0,MIRRORING_TYPE_VERTICAL:1,BATTERY_BACKED_RAM_BIT:1,BATTERY_BACKED_RAM_BITS_WIDTH:1,TRAINER_512BYTES_BIT:2,TRAINER_512BYTES_BITS_WIDTH:1,FOUR_SCREEN_MIRRORING_BIT:3,FOUR_SCREEN_MIRRORING_BITS_WIDTH:1,MAPPER_LOWER_BIT:4,MAPPER_LOWER_BITS_WIDTH:4,MAPPER_HIGHER_BIT:4,MAPPER_HIGHER_BITS_WIDTH:4,getSize:function(){return this.size},isNes:function(){return this.getSignature()===this.VALID_SIGNATURE&&this.getMagicNumber()===this.VALID_MAGIC_NUMBER},load:function(t){return this.rom.loadWithoutMapping(t)},getSignature:function(){for(var t="",e=0;e<this.SIGNATURE_SIZE;e++)t+=String.fromCharCode(this.load(this.SIGNATURE_ADDRESS+e));return t},getMagicNumber:function(){return this.load(this.MAGIC_NUMBER_ADDRESS)},getPRGROMBanksNum:function(){return this.load(this.PRG_ROM_BANKS_NUM_ADDRESS)},getCHRROMBanksNum:function(){return this.load(this.CHR_ROM_BANKS_NUM_ADDRESS)},hasChrRom:function(){return this.getCHRROMBanksNum()>0},getControlByte1:function(){return this.load(this.CONTROL_BYTE1_ADDRESS)},getControlByte2:function(){return this.load(this.CONTROL_BYTE2_ADDRESS)},getRAMBanksNum:function(){return this.load(this.RAM_BANKS_NUM_ADDRESS)},getUnusedField:function(){for(var t=0,e=0;e<this.UNUSED_SIZE;e++)t=t<<8|this.load(this.UNUSED_ADDRESS+e);return t},extractBits:function(t,e,r){return t>>e&(1<<r)-1},getMirroringType:function(){return this.extractBits(this.getControlByte1(),this.MIRRORING_TYPE_BIT,this.MIRRORING_TYPE_BITS_WIDTH)},getMirroringTypeAsStrings:function(){return this.getMirroringType()===this.MIRRORING_TYPE_HORIZONTAL?"horizontal":"vertical"},isHorizontalMirroring:function(){return this.getMirroringType()===this.MIRRORING_TYPE_HORIZONTAL},getBatteryBackedRAM:function(){return this.extractBits(this.getControlByte1(),this.BATTERY_BACKED_RAM_BIT,this.BATTERY_BACKED_RAM_BITS_WIDTH)},getTrainer512Bytes:function(){return this.extractBits(this.getControlByte1(),this.TRAINER_512BYTES_BIT,this.TRAINER_512BYTES_BITS_WIDTH)},getFourScreenMirroring:function(){return this.extractBits(this.getControlByte1(),this.FOUR_SCREEN_MIRRORING_BIT,this.FOUR_SCREEN_MIRRORING_BITS_WIDTH)},getMapperNum:function(){var t=this.extractBits(this.getControlByte1(),this.MAPPER_LOWER_BIT,this.MAPPER_LOWER_BITS_WIDTH);return this.extractBits(this.getControlByte2(),this.MAPPER_HIGHER_BIT,this.MAPPER_HIGHER_BITS_WIDTH)<<this.MAPPER_LOWER_BITS_WIDTH|t},dump:function(){var t="";t+="0x ";for(var e=0;e<this.getSize();e++)t+=i.convertDecToHexString(this.load(e),2,!0)+" ";return t+="\n\n",t+="Signature: "+this.getSignature()+"\n",t+="Magic Number: "+i.convertDecToHexString(this.getMagicNumber(),2)+"\n",t+="PRG-ROM banks num: "+i.convertDecToHexString(this.getPRGROMBanksNum(),2)+"\n",t+="CHR-ROM banks num: "+i.convertDecToHexString(this.getCHRROMBanksNum(),2)+"\n",t+="Control1: "+i.convertDecToHexString(this.getControlByte1(),2)+"\n",t+="Control2: "+i.convertDecToHexString(this.getControlByte2(),2)+"\n",t+="RAM banks num: "+i.convertDecToHexString(this.getRAMBanksNum(),2)+"\n",t+="Unused field: "+i.convertDecToHexString(this.getUnusedField(),14)+"\n",t+="\n",t+="In control bytes\n",t+="Mirroring type: "+i.convertDecToHexString(this.getMirroringType())+"("+this.getMirroringTypeAsStrings()+")\n",t+="Battery-backed RAM: "+i.convertDecToHexString(this.getBatteryBackedRAM())+"\n",t+="512-byte trainer: "+i.convertDecToHexString(this.getTrainer512Bytes())+"\n",t+="Four screen mirroring: "+i.convertDecToHexString(this.getFourScreenMirroring())+"\n",t+="Mapper number: "+i.convertDecToHexString(this.getMapperNum(),2)+"("+(new a).getName(this.getMapperNum())+")"}}),_.generateColorPalette=function(){const t="#7C7C7C,#0000FC,#0000BC,#4428BC,#940084,#A80020,#A81000,#881400,#503000,#007800,#006800,#005800,#004058,#000000,#000000,#000000,#BCBCBC,#0078F8,#0058F8,#6844FC,#D800CC,#E40058,#F83800,#E45C10,#AC7C00,#00B800,#00A800,#00A844,#008888,#000000,#000000,#000000,#F8F8F8,#3CBCFC,#6888FC,#9878F8,#F878F8,#F85898,#F87858,#FCA044,#F8B800,#B8F818,#58D854,#58F898,#00E8D8,#787878,#000000,#000000,#FCFCFC,#A4E4FC,#B8B8F8,#D8B8F8,#F8B8F8,#F8A4C0,#F0D0B0,#FCE0A8,#F8D878,#D8F878,#B8F8B8,#B8F8D8,#00FCFC,#F8D8F8,#000000,#000000".split(",");for(let e=0;e<64;e+=16){const r=document.createElement("div");r.classList.add("row");for(let i=0;i<16;i++){const s=document.createElement("div");s.classList.add("color-palette-block"),s.setAttribute("style",`background-color: ${t[i+e]}`),r.appendChild(s)}document.getElementById("color-palette").appendChild(r)}},_.changeColor=function(t,e){const r=document.getElementsByClassName(t);Array.prototype.slice.call(r).map(r=>{r.classList.remove(...r.classList),r.classList.add(t),r.classList.add("pixel"),r.classList.add(`color_${e}`)})},_.generate=function(t){const e=document.createElement("div");for(var r=0;r<t.length;r++){const n=document.createElement("div");n.classList.add("plane");for(var i=0;i<8;i++){const e=document.createElement("div");e.classList.add("row");for(var s=0;s<8;s++){const n=document.createElement("div");switch(n.classList.add("pixel"),t[r][i][s]){case"0":n.classList.add("a");break;case"1":n.classList.add("b");break;case"2":n.classList.add("c");break;case"3":n.classList.add("d")}e.appendChild(n)}n.appendChild(e)}e.appendChild(n)}document.getElementById("chr-dump").innerHTML="",document.getElementById("chr-dump").appendChild(e)},window.addEventListener("drop",(function(t){t.preventDefault();let e=new FileReader;e.onload=function(t){let r=function(t){const e=new p(t);let r=[],s=0;for(;s<8191;){const t=[],n=[];for(;t.length<8;){const r=e.load(s);if(r){const e="00000000"+r.toString(2);t.push(e.substr(e.length-8))}else t.push("00000000");s++}for(;n.length<8;){const t=e.load(s);if(t){const e="00000000"+t.toString(2);n.push(e.substr(e.length-8))}else n.push("00000000");s++}const a=i.combinePlanes(t,n);r.push(a)}return r}(e.result);_.generate(r)},e.readAsArrayBuffer(t.dataTransfer.files[0])}),!1),window.addEventListener("dragover",t=>t.preventDefault(),!1)}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{371:function(e,t,o){var content=o(385);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(131).default)("e59ba9de",content,!0,{sourceMap:!1})},384:function(e,t,o){"use strict";o(371)},385:function(e,t,o){var n=o(130)(!1);n.push([e.i,".codeSettings[data-v-542002e0]{display:flex;align-items:baseline}.codeSetting[data-v-542002e0]{display:flex;flex-wrap:wrap}.generateCustom[data-v-542002e0]{display:none}.settingControl[data-v-542002e0]{display:flex;justify-content:space-between}.codeTitle[data-v-542002e0],.settingControl.showGenerateSolo[data-v-542002e0]{display:none}.codeTitle[data-v-542002e0]{margin-top:0;width:100%}@media screen and (max-width:767px){.generateCustom[data-v-542002e0]{display:block}.codeSettings[data-v-542002e0]{flex-wrap:wrap}.codeSettings .codeSetting[data-v-542002e0]{width:100%}.codeSettings .codeSolo[data-v-542002e0]{width:100%;display:none;flex-wrap:wrap}.codeSettings .codeSolo .dmxStyleImg[data-v-542002e0]{width:100%}.codeSettings.showGenerateSolo .codeSetting[data-v-542002e0]{display:none}.codeSettings.showGenerateSolo .codeSolo[data-v-542002e0]{display:flex}.codeTitle[data-v-542002e0]{display:block}.listBarcode.showGenerateSolo[data-v-542002e0]{display:none}}",""]),e.exports=n},397:function(e,t,o){"use strict";o.r(t);o(339),o(10),o(344),o(346),o(347),o(348),o(349),o(350),o(351),o(352),o(353),o(354),o(355),o(356),o(357),o(358),o(359),o(361),o(362),o(363),o(364),o(365),o(366),o(367),o(368),o(369),o(21),o(46),o(89),o(42),o(24),o(67);var n={data:function(){return{codeNumber:20,from:0,to:0,type:"barcode",barcodeType:{name:"UPC-A",suffix:"UPCA",numberNeeded:11},barcodeTypes:[{name:"UPC-A",suffix:"UPCA",numberNeeded:11},{name:"UPC-E",suffix:"UPCE",numberNeeded:7},{name:"EAN-8",suffix:"EAN8",numberNeeded:7},{name:"EAN-13",suffix:"EAN13",numberNeeded:12}],codes:[],onlyOne:!1,showSolo:!1,codeToShow:0,existingCode:"",savedCodes:[],selectedSavedCode:"",openSavedCode:!1,openconfirmation:!1,openLastUsedCode:!1,showGenerateCustom:!1,selectedCode:""}},computed:{linkSufix:function(){if("barcode"===this.barcodeType)return"&code=UPCA"}},watch:{type:function(e){"DMX"===e&&this.$router.push("/dmx")},existingCode:function(e){(null==e?void 0:e.length)>7?e.length>11?this.barcodeType=this.barcodeTypes[3]:this.barcodeType=this.barcodeTypes[0]:this.barcodeType=this.barcodeTypes[1]}},methods:{generate:function(){var e=this;this.codes=[],this.codeToShow=0;var t=new Uint32Array(parseInt(this.codeNumber));window.crypto.getRandomValues(t).forEach((function(t){var o=Math.floor(Math.random(t)*t),n="".concat(o).concat(t);e.codes.push(n.toString().substring(0,e.barcodeType.numberNeeded))})),this.saveLastGeneratedCode()},generateSolo:function(){this.showSolo=!0},resetSolo:function(){this.existingCode="",this.showSolo=!1},randomN:function(){return Math.floor(10*Math.random())},reset:function(){this.codes=[]},next:function(){this.codeToShow<parseInt(this.codeNumber)?this.codeToShow+=1:this.onlyOne=!1},prev:function(){0!==this.codeToShow&&(this.codeToShow-=1)},saveLastGeneratedCode:function(){var e=this,t=this.codes.map((function(t){return{code:t,suffix:e.barcodeType.suffix}}));localStorage.setItem("save_last_".concat(this.type),JSON.stringify(t))},getLastSavedGeneratedCode:function(){this.code=localStorage.getItem("save_last_".concat(this.type)).split(",")},savedSelectedCode:function(code){this.savedCodes.push(code),localStorage.setItem("save_".concat(this.type),this.savedCodes)},getLastSavedCode:function(){this.savedCodes=localStorage.getItem("save_last_".concat(this.type)).split(",")},savedDMX:function(e){this.selectedSavedCode=e,this.openconfirmation=!0},showMe:function(code){this.selectedCode=code},showAll:function(){this.selectedCode=""}}},d=(o(384),o(49)),component=Object(d.a)(n,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"pa-4"},[o("div",{staticClass:"container w-100"},[o("div",{class:["codeSettings",{showGenerateSolo:e.showGenerateCustom}]},[o("h3",{staticClass:"codeTitle"},[e._v("\n        Code info:\n        "),e.showGenerateCustom?e._e():o("span",{staticClass:"btn generateCustom",on:{click:function(t){e.showGenerateCustom=!0}}},[e._v("\n          Generate customs")]),e._v(" "),e.showGenerateCustom?o("span",{staticClass:"btn generateCustom",on:{click:function(t){e.showGenerateCustom=!1}}},[e._v("\n          Generate Multiples")]):e._e()]),e._v(" "),o("div",{staticClass:"codeSetting"},[o("label",{staticClass:"w-100 d-flex"},[o("div",{staticClass:"d-flex w-100"},[o("span",{staticStyle:{"margin-right":"16px"}},[e._v("\n              DMX:\n              "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",value:"DMX"},domProps:{checked:e._q(e.type,"DMX")},on:{change:function(t){e.type="DMX"}}})]),e._v(" "),o("span",[e._v("\n              barcode:\n              "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.type,expression:"type"}],attrs:{type:"radio",value:"barcode"},domProps:{checked:e._q(e.type,"barcode")},on:{change:function(t){e.type="barcode"}}})])])]),e._v(" "),o("label",{staticClass:"w-100"},[e._v("\n          Type de barcode :\n          "),o("select",{directives:[{name:"model",rawName:"v-model",value:e.barcodeType,expression:"barcodeType"}],on:{change:function(t){var o=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.barcodeType=t.target.multiple?o:o[0]}}},e._l(e.barcodeTypes,(function(code){return o("option",{key:code.name,domProps:{value:code}},[e._v(e._s(code.name))])})),0),e._v(" "),o("span",[e._v("("+e._s(e.barcodeType.numberNeeded)+") number")])]),e._v(" "),o("label",{staticClass:"w-100"},[e._v("\n          Nombre de code:\n          "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.codeNumber,expression:"codeNumber"}],attrs:{type:"text"},domProps:{value:e.codeNumber},on:{input:function(t){t.target.composing||(e.codeNumber=t.target.value)}}})]),e._v(" "),o("label",{staticClass:"w-100"},[e._v("\n          Only one at the time:\n          "),o("span",[o("input",{directives:[{name:"model",rawName:"v-model",value:e.onlyOne,expression:"onlyOne"}],attrs:{type:"checkbox",value:"DMX"},domProps:{checked:Array.isArray(e.onlyOne)?e._i(e.onlyOne,"DMX")>-1:e.onlyOne},on:{change:function(t){var o=e.onlyOne,n=t.target,d=!!n.checked;if(Array.isArray(o)){var c=e._i(o,"DMX");n.checked?c<0&&(e.onlyOne=o.concat(["DMX"])):c>-1&&(e.onlyOne=o.slice(0,c).concat(o.slice(c+1)))}else e.onlyOne=d}}})])])]),e._v(" "),o("div",{staticClass:"codeSolo"},[o("div",{staticStyle:{display:"flex","flex-wrap":"wrap"}},[o("label",{staticClass:"w-100"},[e._v("\n            Code à générer\n            "),o("input",{directives:[{name:"model",rawName:"v-model",value:e.existingCode,expression:"existingCode"}],attrs:{type:"text"},domProps:{value:e.existingCode},on:{input:function(t){t.target.composing||(e.existingCode=t.target.value)}}}),e._v(" "),o("span",{staticClass:"w-100 d-flex"},[e._v("\n              "+e._s(e.existingCode.length+"/"+e.barcodeType.numberNeeded)+"\n            ")])]),e._v(" "),o("span",{staticClass:"w-100"},[o("span",{staticClass:"btn",on:{click:e.generateSolo}},[e._v(" Generate ")]),e._v(" "),e.showSolo?o("span",{staticClass:"btn",on:{click:e.resetSolo}},[e._v(" reset ")]):e._e()])]),e._v(" "),e.showSolo?o("Barcode",{attrs:{code:e.existingCode.toString(),"link-suffix":e.barcodeType.suffix},scopedSlots:e._u([{key:"control",fn:function(){return[o("div",{staticClass:"control"},[o("div",{staticClass:"btn",on:{click:function(t){return e.savedDMX(e.existingCode)}}},[e._v("Save")])])]},proxy:!0}],null,!1,1062239373)}):e._e()],1)]),e._v(" "),o("div",{class:["w-100 settingControl",,{showGenerateSolo:e.showGenerateCustom}]},[o("span",[o("span",{staticClass:"btn",on:{click:e.generate}},[e._v(" Generate ")]),e._v(" "),o("span",{staticClass:"btn",on:{click:e.reset}},[e._v(" Reset ")])]),e._v(" "),o("div",[e.onlyOne&&0!==e.codeToShow?o("span",{staticClass:"btn",on:{click:e.prev}},[e._v(" Prev ")]):e._e(),e._v(" "),e.onlyOne?o("span",{staticStyle:{"margin-right":"4px"}},[e._v(e._s(e.codeToShow+1))]):e._e(),e._v(" "),e.onlyOne?o("span",{staticClass:"btn",on:{click:e.next}},[e._v(" Next ")]):e._e()])]),e._v(" "),o("div",{staticClass:"margin-top:10px"},[o("span",{staticClass:"btn",on:{click:function(t){e.openSavedCode=!0}}},[e._v(" Open saved code ")]),e._v(" "),o("span",{staticClass:"btn",on:{click:function(t){e.openLastUsedCode=!0}}},[e._v(" Open last used code ")])])]),e._v(" "),e.codes.length>0?o("div",{class:["listBarcode",,{showGenerateSolo:e.showGenerateCustom}]},e._l(e.codes,(function(code,t){return o("Barcode",{directives:[{name:"show",rawName:"v-show",value:!e.onlyOne||e.onlyOne&&t===e.codeToShow,expression:"!onlyOne || (onlyOne && index === codeToShow)"}],key:e.type+code,class:{hide:e.selectedCode&&e.selectedCode!==code},attrs:{code:code.toString(),"link-suffix":e.barcodeType.suffix},scopedSlots:e._u([{key:"control",fn:function(){return[o("div",{staticClass:"control"},[o("div",{staticClass:"btn",on:{click:function(t){return e.savedDMX(code)}}},[e._v("Save")]),e._v(" "),e.selectedCode?e._e():o("div",{staticClass:"btn blue",on:{click:function(t){return e.showMe(code)}}},[e._v("Show only me")]),e._v(" "),e.selectedCode===code?o("div",{staticClass:"btn blue",on:{click:function(t){return e.showAll()}}},[e._v("Show All")]):e._e()])]},proxy:!0}],null,!0)})})),1):e._e(),e._v(" "),o("SavedCode",{attrs:{type:e.type,code:e.selectedSavedCode,"barcode-suffix":e.barcodeType.suffix},model:{value:e.openconfirmation,callback:function(t){e.openconfirmation=t},expression:"openconfirmation"}}),e._v(" "),o("ShowSavedCode",{attrs:{type:e.type},model:{value:e.openSavedCode,callback:function(t){e.openSavedCode=t},expression:"openSavedCode"}}),e._v(" "),o("ShowLastUsedCode",{attrs:{type:e.type},model:{value:e.openLastUsedCode,callback:function(t){e.openLastUsedCode=t},expression:"openLastUsedCode"}})],1)}),[],!1,null,"542002e0",null);t.default=component.exports;installComponents(component,{Barcode:o(318).default,SavedCode:o(336).default,ShowSavedCode:o(337).default,ShowLastUsedCode:o(338).default})}}]);
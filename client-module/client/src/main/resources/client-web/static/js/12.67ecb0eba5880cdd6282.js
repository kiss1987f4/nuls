webpackJsonp([12],{ANj2:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var r=t("LPk9"),a=t("+1pJ"),o=t("FJop"),n=t("x47x"),i=t("YgNb");var c={data:function(){var e=this;return{selectAddress:localStorage.getItem("newAccountAddress"),submitId:"transferSubmit",usable:this.$route.query.balance,fee:0,maxAmount:0,transferForm:{address:this.selectAddress,joinAddress:"",joinNo:"",gas:"",price:"",remark:""},transferRules:{selectAddress:[{validator:function(s,t,r){t?r():r(new Error(e.$t("message.addressNull")))},trigger:"blur"}],joinAddress:[{validator:function(s,t,r){t?t.length<20||t.length>35?r(new Error(e.$t("message.c168"))):t===e.selectAddress?r(new Error(e.$t("message.addressOrTransfer"))):setTimeout(function(){e.isContractAddress&&"NULS"===e.$route.query.asset?e.isPayable?r():r(new Error(e.$t("message.c258"))):r()},500):r(new Error(e.$t("message.transferNull")))},trigger:"blur"}],joinNo:[{validator:function(s,t,r){t?/^[+-]?\d+(?:\.\d{1,8})?$/.test(t)?t<e.fee?r(new Error(e.$t("message.transferNO3"))):parseFloat(t)>parseFloat(e.usable)?r(new Error(e.$t("message.c107"))):e.seniorIf?r():setTimeout(function(){Object(i.e)(e.transferForm.joinNo).toString()===Object(i.e)(e.usable).toString()?e.transferForm.joinNo=Object(i.b)(Object(i.c)(Object(i.e)(e.usable),Object(i.e)(e.fee))).toString():parseInt(Object(i.e)(t).toString())>e.maxAmount&&!e.seniorIf?r(new Error(e.$t("message.c202")+Object(i.b)(e.maxAmount).toString())):r()},100):r(new Error(e.$t("message.c136"))):r(new Error(e.$t("message.transferNO")))},trigger:"blur"}],gas:[{validator:function(s,t,r){t?t<1||t>1e7?r(new Error(e.$t("message.c204"))):r():r(new Error(e.$t("message.c204")))},trigger:"blur"}],price:[{validator:function(s,t,r){t?t<1?r(new Error(e.$t("message.c205"))):r():r(new Error(e.$t("message.c205")))},trigger:"blur"}]},outAddressIf:!0,seniorIf:!1,decimalsNo:0,systemGas:0,callSeniorValue:!1,isContractAddress:!1,isPayable:!1,userAddressList:[],dialogTableVisible:!1}},components:{Back:r.a,AccountAddressBar:a.a,Password:o.a},created:function(){this.decimalsNo=Object(i.d)(this.$route.query.decimals),this.$route.query.address&&(this.seniorIf=!0,this.outAddressIf=!1)},methods:{getBalanceAddress:function(e){var s=this;this.$fetch(e).then(function(e){e.success&&(s.usable=Object(i.b)(e.data.usable.value).toString())})},chenckAccountAddress:function(e){this.selectAddress=e,localStorage.setItem("newAccountAddress",this.selectAddress),this.getBalanceAddress("/accountledger/balance/"+e),this.$refs.transferForm.validateField("joinAddress"),this.$refs.transferForm.validateField("joinNo"),this.countFee()},accountCopy:function(){Object(i.h)(this.selectAddress),this.$message({message:this.$t("message.c129"),type:"success",duration:"800"})},toUsersAddressList:function(){var e=this;if(this.dialogTableVisible=!0,"indexedDB"in window){var s={dbName:"usersDB",dbVersion:1,dbInstance:{}},t=window.indexedDB.open(s.dbName,s.dbVersion);t.onupgradeneeded=function(e){var s=e.target.result;s.objectStoreNames.contains("addressList")||s.createObjectStore("addressList",{keyPath:"userAddress",autoIncrement:!1})},t.onsuccess=function(s){var t=[];event.target.result.transaction(["addressList"],"readonly").objectStore("addressList").openCursor().onsuccess=function(s){var r=s.target.result;r&&(t.push(r.value),r.continue()),setTimeout(function(){e.userAddressList=t},50)}},t.onerror=function(e){console.log("数据库打开失败..."),console.dir(e)}}else console.log("对不起，您的浏览器不支持indexedDB，建议您使用google浏览器")},checkedAddress:function(e){this.transferForm.joinAddress=e,this.$refs.transferForm.validateField("joinAddress"),this.dialogTableVisible=!1},dbcheckedAddress:function(e,s){this.transferForm.joinAddress=e.userAddress,this.dialogTableVisible=!1},ifContractAddres:function(){var e=this;this.$fetch("/contract/"+this.transferForm.joinAddress).then(function(s){console.log(s),s.success&&(s.data.isContractAddress?(e.isContractAddress=s.data.isContractAddress,e.isPayable=s.data.isPayable,e.transferForm.gas="",e.transferForm.price="",e.seniorIf=!0):(e.transferForm.gas="1",e.transferForm.price="1"))})},countFee:function(){var e=this,s=this;if(this.seniorIf){if(""!==this.transferForm.joinAddress&&this.transferForm.joinNo>0){var t=new n.BigNumber(this.transferForm.joinNo),r="";this.seniorIf&&this.outAddressIf?(r='{"sender":"'+this.selectAddress+'","contractAddress":"'+this.transferForm.joinAddress+'","value":"'+t.times(this.decimalsNo).toString()+'","methodName":"_payable","methodDesc":"() return void","price":1}',setTimeout(function(){var s='{"address":"'+e.selectAddress+'","toAddress":"'+e.transferForm.joinAddress+'","gasLimit":"'+e.transferForm.gas+'","price":"'+e.transferForm.price+'","amount":"'+Object(i.e)(e.transferForm.joinNo).toString()+'","remark":"'+Object(i.k)(e.transferForm.remark)+'"}';e.$post("/contract/transfer/fee",s).then(function(s){s.success&&(e.fee=Object(i.b)(s.data.fee).toString(),e.maxAmount=s.data.maxAmount)})},500)):r='{"sender":"'+this.selectAddress+'","contractAddress":"'+this.$route.query.address+'","value":0,"methodName":"transfer","methodDesc":"","price":1,"args":["'+this.transferForm.joinAddress+'","'+t.times(this.decimalsNo).toString()+'"]}';var a='{"sender":"'+localStorage.getItem("newAccountAddress")+'"}';this.$post("/contract/imputedgas/call",r).then(function(t){t.success?(e.systemGas=t.data.gasLimit,e.transferForm.gas=t.data.gasLimit,s.$post("/contract/imputedprice",a).then(function(s){s.success?e.transferForm.price=s.data:console.log("估算price失败")})):console.log("估算gas失败")})}}else if(""!==this.transferForm.joinAddress&&this.transferForm.joinNo>0){var o="address="+this.selectAddress+"&toAddress="+this.transferForm.joinAddress+"&amount="+Object(i.e)(this.transferForm.joinNo).toString()+"&remark="+Object(i.k)(this.transferForm.remark);this.$fetch("/accountledger/transfer/fee?"+o).then(function(s){s.success&&(e.fee=Object(i.b)(s.data.fee).toString(),e.maxAmount=s.data.maxAmount)})}},zeroToWhole:function(){this.$router.push({name:"zeroToWhole"})},transferSubmit:function(e){var s=this;this.$refs[e].validate(function(e){if(!e)return!1;"true"===localStorage.getItem("encrypted")?s.$refs.password.showPassword(!0):s.$confirm(s.$t("message.c172"),"",{confirmButtonText:s.$t("message.confirmButtonText"),cancelButtonText:s.$t("message.cancelButtonText")}).then(function(){s.toSubmit("")}).catch(function(){console.log("")})})},toSubmit:function(e){var s=this,t=new n.BigNumber(1e8),r="",a="";if(this.seniorIf){var o=new n.BigNumber(this.transferForm.joinNo);this.$route.query.address?(r="/contract/call",a='{"sender":"'+this.selectAddress+'","gasLimit":'+this.transferForm.gas+',"price":'+this.transferForm.price+',"password":"'+e+'","remark":"'+Object(i.k)(this.transferForm.remark)+'","contractAddress":"'+this.$route.query.address+'","value":0,"methodName":"transfer","methodDesc":"","args":["'+this.transferForm.joinAddress+'","'+o.times(this.decimalsNo)+'"]}'):(r="/contract/transfer",a='{"address":"'+this.selectAddress+'","toAddress":"'+this.transferForm.joinAddress+'","gasLimit":'+this.transferForm.gas+',"price":'+this.transferForm.price+',"password":"'+e+'","amount":"'+t.times(this.transferForm.joinNo)+'","remark":"'+Object(i.k)(this.transferForm.remark)+'"}')}else r="/accountledger/transfer",a='{"address":"'+this.selectAddress+'","toAddress":"'+this.transferForm.joinAddress+'","amount":'+t.times(this.transferForm.joinNo)+',"password":"'+e+'","remark":"'+Object(i.k)(this.transferForm.remark)+'"}';this.$post(r,a).then(function(e){e.success?(s.$message({message:s.$t("message.passWordSuccess"),type:"success"}),s.transferForm.joinAddress="",s.transferForm.joinNo="",s.transferForm.remark="",s.getBalanceAddress("/accountledger/balance/"+s.transferForm.address),sessionStorage.setItem("walletActiveName","second"),s.$router.push({name:"/wallet"})):s.$message({message:s.$t("message.passWordFailed")+e.data.msg,type:"warning"})})}}},d={render:function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("div",{staticClass:"transfer"},[t("Back",{attrs:{backTitle:this.$t("message.walletManagement")}}),e._v(" "),t("div",{staticClass:"transfer-info"},[t("h2",[e._v(e._s(this.$route.query.asset)+" "+e._s(e.$t("message.transfer")))]),e._v(" "),t("el-form",{ref:"transferForm",attrs:{model:e.transferForm,rules:e.transferRules}},[t("el-form-item",{staticClass:"out-address",attrs:{label:e.$t("message.sourceAddress")+"："}},[t("AccountAddressBar",{directives:[{name:"show",rawName:"v-show",value:e.outAddressIf,expression:"outAddressIf"}],on:{chenckAccountAddress:e.chenckAccountAddress}}),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.seniorIf&&!e.outAddressIf,expression:"seniorIf && !outAddressIf"}],staticClass:"contract-address"},[e._v(e._s(this.selectAddress))]),e._v(" "),t("i",{staticClass:"copy_icon copyBtn cursor-p",on:{click:e.accountCopy}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.destinationAddress")+"：",prop:"joinAddress"}},[t("el-input",{ref:"joinAddress",attrs:{type:"text"},on:{change:e.ifContractAddres},model:{value:e.transferForm.joinAddress,callback:function(s){e.$set(e.transferForm,"joinAddress","string"==typeof s?s.trim():s)},expression:"transferForm.joinAddress"}}),e._v(" "),t("i",{staticClass:"cursor-p icons",on:{click:e.toUsersAddressList}})],1),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.transferAmount")+"：",prop:"joinNo"}},[t("span",{staticClass:"allUsable"},[e._v(e._s(e.$t("message.currentBalance"))+": "+e._s(e.usable)+" "+e._s(this.$route.query.asset))]),e._v(" "),t("el-input",{attrs:{type:"text",maxlength:17},on:{change:e.countFee},model:{value:e.transferForm.joinNo,callback:function(s){e.$set(e.transferForm,"joinNo",s)},expression:"transferForm.joinNo"}})],1),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:e.seniorIf,expression:"seniorIf"}],staticClass:"contract-t"},[t("div",{staticClass:"call-senior"},[e._v("\n          "+e._s(e.$t("message.c203"))+"\n          "),t("el-switch",{attrs:{width:35},model:{value:e.callSeniorValue,callback:function(s){e.callSeniorValue=s},expression:"callSeniorValue"}})],1),e._v(" "),t("div",{directives:[{name:"show",rawName:"v-show",value:this.callSeniorValue,expression:"this.callSeniorValue"}],staticClass:"seniorInfo"},[t("el-form-item",{attrs:{label:"Gas Limit",prop:"gas"}},[t("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:e.transferForm.gas,callback:function(s){e.$set(e.transferForm,"gas",s)},expression:"transferForm.gas"}}),e._v(" "),t("p",{directives:[{name:"show",rawName:"v-show",value:this.transferForm.gas<this.systemGas&&this.transferForm.gas>1,expression:"this.transferForm.gas < this.systemGas && this.transferForm.gas > 1"}],staticClass:"price-min"},[e._v("\n              "+e._s(e.$t("message.c206")))])],1),e._v(" "),t("el-form-item",{attrs:{label:"Price",prop:"price"}},[t("el-input",{attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')"},model:{value:e.transferForm.price,callback:function(s){e.$set(e.transferForm,"price",s)},expression:"transferForm.price"}})],1)],1)]),e._v(" "),t("el-form-item",{attrs:{label:e.$t("message.remarks")+"："}},[t("el-input",{attrs:{type:"textarea",maxlength:30},on:{change:e.countFee},model:{value:e.transferForm.remark,callback:function(s){e.$set(e.transferForm,"remark","string"==typeof s?s.trim():s)},expression:"transferForm.remark"}})],1),e._v(" "),t("el-form-item",{directives:[{name:"show",rawName:"v-show",value:e.outAddressIf,expression:"outAddressIf"}],attrs:{label:e.$t("message.c28")+": "+this.fee+" NULS"}},[t("h5",[e._v(e._s(e.$t("message.zeroToWhole1"))+" "),t("span",{staticClass:"cursor-p text-ds",on:{click:e.zeroToWhole}},[e._v(e._s(e.$t("message.type51")))])])]),e._v(" "),t("el-form-item",{staticClass:"transfer-submit"},[t("el-button",{attrs:{type:"primary",id:"transferSubmit"},on:{click:function(s){e.transferSubmit("transferForm")}}},[e._v("\n          "+e._s(e.$t("message.c114"))+"\n        ")])],1)],1),e._v(" "),t("el-dialog",{staticClass:"transfer-dialog",attrs:{visible:e.dialogTableVisible},on:{"update:visible":function(s){e.dialogTableVisible=s}}},[t("el-table",{attrs:{data:e.userAddressList},on:{"row-dblclick":e.dbcheckedAddress}},[t("el-table-column",{attrs:{property:"userAddress",label:e.$t("message.tabName"),"min-width":"280",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{property:"userHelp",label:e.$t("message.remarks"),width:"110",align:"center"}}),e._v(" "),t("el-table-column",{attrs:{label:e.$t("message.operation"),width:"100",align:"center"},scopedSlots:e._u([{key:"default",fn:function(s){return[t("span",{staticClass:"cursor-p text-d",on:{click:function(t){e.checkedAddress(s.row.userAddress)}}},[e._v(e._s(e.$t("message.select")))])]}}])})],1)],1),e._v(" "),t("Password",{ref:"password",attrs:{submitId:e.submitId},on:{toSubmit:e.toSubmit}})],1)],1)},staticRenderFns:[]};var l=t("vSla")(c,d,!1,function(e){t("O3Xo")},null,null);s.default=l.exports},O3Xo:function(e,s){}});
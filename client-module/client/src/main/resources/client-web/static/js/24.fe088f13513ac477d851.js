webpackJsonp([24],{"0bPT":function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("LPk9"),o=e("FJop"),n=e("x47x"),i={data:function(){return{txHash:this.$route.params.txHash,myNodeInfo:[]}},components:{Back:a.a,Password:o.a},mounted:function(){this.getMyNodeInfo("/consensus/agent/"+this.txHash)},methods:{getMyNodeInfo:function(s){var t=this;this.$fetch(s).then(function(s){if(s.success){var e=new n.BigNumber(1e-8);s.data.deposit=parseFloat(e.times(s.data.deposit).toString()),s.data.totalDeposit=parseFloat(e.times(s.data.totalDeposit).toString()),t.myNodeInfo=s.data}})},closedNode:function(){var s=this;this.$confirm(this.$t("message.c98")+" "+this.myNodeInfo.agentId+" "+this.$t("message.c99")+this.$t("message.miningFee"),this.$t("message.c86"),{confirmButtonText:this.$t("message.confirmButtonText"),cancelButtonText:this.$t("message.cancelButtonText")}).then(function(){"true"===localStorage.getItem("encrypted")?s.$refs.password.showPassword(!0):s.toSubmit("")}).catch(function(){s.$message({type:"waring",message:s.$t("message.c59"),duration:"1000"})})},toSubmit:function(s){var t=this,e={address:localStorage.getItem("newAccountAddress"),password:s};this.$post("/consensus/agent/stop",e).then(function(s){s.success?(t.$message({type:"success",message:t.$t("message.passWordSuccess")}),t.$router.push({name:"/consensus",params:{activeName:"first"}})):t.$message({type:"waring",message:t.$t("message.passWordFailed")+s.msg})})},toallPledge:function(){this.$router.push({name:"/allPledge",params:{agentName:this.myNodeInfo.agentId,txHash:this.myNodeInfo.txHash}})}}},c={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"node-info"},[e("Back",{attrs:{backTitle:this.$t("message.consensusManagement")}}),s._v(" "),e("h2",[s._v(s._s(this.myNodeInfo.agentId))]),s._v(" "),e("ul",[e("li",[e("label",[s._v(s._s(s.$t("message.c16")))]),e("span",[s._v(s._s(this.myNodeInfo.agentName?this.myNodeInfo.agentName:this.myNodeInfo.agentAddress))])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.state")))]),e("span",[s._v(" "+s._s(s.$t("message.status"+this.myNodeInfo.status)))])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.c25")))]),e("span",[s._v(s._s(this.myNodeInfo.deposit))])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.c17")))]),e("span",[s._v(s._s(this.myNodeInfo.commissionRate)+" %")])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.c18")))]),e("span",[s._v(s._s(this.myNodeInfo.creditVal))])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.c19")))]),e("span",[s._v(s._s(this.myNodeInfo.memberCount))])]),s._v(" "),e("li",[e("label",[s._v(s._s(s.$t("message.c1")))]),e("span",{staticClass:"cursor-p text-d",on:{click:s.toallPledge}},[s._v(s._s(this.myNodeInfo.totalDeposit))])])]),s._v(" "),e("el-button",{staticClass:"bottom-btn",attrs:{type:"button"},on:{click:s.closedNode}},[s._v(s._s(s.$t("message.c62")))]),s._v(" "),e("Password",{ref:"password",on:{toSubmit:s.toSubmit}})],1)},staticRenderFns:[]};var m=e("vSla")(i,c,!1,function(s){e("V9av")},null,null);t.default=m.exports},V9av:function(s,t){}});
import Vue from "vue"
import Content from "./vue/Content.vue"

import "./css/_main.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(Content)
}).$mount("#content")

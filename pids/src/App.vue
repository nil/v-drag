<template>
  <div id="app">
    <div v-drag class="d1">all, default</div>
    <div v-drag:x class="d1" style="position: absolute">x, arg</div>
    <div v-drag="{ axis: 'y' }" class="d1">y, obj</div>

    <div v-drag:x="{axis: dataAxis}" class="d2" id="elm" style="left: 20px; transform: rotate(20deg) translate(20px, 10px) scaleX(1.3)">
      {{ dataAxis }}
      <button @click="update">Update axis</button>
    </div>

    <div v-drag="dataClass" :water="dataClass" class="d1">
      <div class="d4 h-h1 c1">1</div>
      <div class="d4 h-h2 c2">2</div>
      <div class="d4 h-h1 c1">1</div>
    </div>

    <div v-drag:x class="d1">x</div>

    <button @click="update3" class="b1">Update class</button>
    <button @click="update2" class="b1">Update handle</button>
    <div v-drag='dataID' class="d1" id="element">
      <div id="id1" class="d3">Handle?</div>
    </div>
    <div id="id2" class="d1">Handle?</div>
  </div>
</template>

<script>
import "./style.css"

import Vue from "vue"
import drag from "../../dist/main.js"
// const drag = require("../../dist/main.js");

Vue.use(drag);

export default {
  name: 'app',
  data: function(){
    return {
      dataAxis: "all",
      dataID: "#id1",
      dataClass: '.h-h1'
    }
  },
  methods: {
    update: function (event) {
      if (this.dataAxis == "x") {
        this.dataAxis = "all"
      } else if (this.dataAxis == "all") {
        this.dataAxis = "y"
      } else {
        this.dataAxis = "x"
      }
    },
    update2: function (event) {
      if (this.dataID == "#id1") {
        this.dataID = "#id2";
      } else if (this.dataID == '#id2') {
        this.dataID = false;
      } else {
        this.dataID = '#id1';
      }
    },
    update3: function (event) {
      if (this.dataClass == ".h-h1") {
        this.dataClass = ".h-h2";
      } else if (this.dataClass == '.h-h2') {
        this.dataClass = '.h-h3';
      } else {
        this.dataClass = '.h-h1';
      }
    }
  }
}
</script>

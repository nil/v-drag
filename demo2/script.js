/* eslint-disable */

var app = new Vue({
  el: '#app',
  data: {
    message: 'Drag me!'
  },
  methods: {
    update: function(e) {
      this.message = "Not you!"
    }
  }
})

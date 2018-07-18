import Vue from "vue"

let data = {
  element: null,
  positionX: 0,
  positionY: 0,
  direction: ""
}

function mouseDown(arg, e) {
  var x = e.pageX || e.touches[0].pageX;
  var y = e.pageY || e.touches[0].pageY;

  data.element = e.target;
  data.direction = arg;
  data.positionX = data.element.offsetLeft - x;
  data.positionY = data.element.offsetTop - y;

  if (data.direction != "x") {
    document.addEventListener("mousemove", updateY);
    document.addEventListener("touchmove", updateY);
  }
  if (data.direction != "y") {
    document.addEventListener("mousemove", updateX);
    document.addEventListener("touchmove", updateX);
  }
}

function updateX(e) {
  var x = e.pageX || e.touches[0].pageX;
  data.element.style.left = data.positionX + x + "px";
}

function updateY(e) {
  var y = e.pageY || e.touches[0].pageY;
  data.element.style.top = data.positionY + y + "px";
}

function mouseUp() {
  document.removeEventListener("mousemove", updateX);
  document.removeEventListener("touchmove", updateX);
  document.removeEventListener("mousemove", updateY);
  document.removeEventListener("touchmove", updateY);
}

export default Vue.directive("drag", {
  inserted: function (el, binding, vnode) {
    var arg = binding.arg;

    /* Start dragging */
    el.addEventListener("mousedown", e => mouseDown(arg, e));
    el.addEventListener("touchstart", e => mouseDown(arg, e));

    /* End dragging */
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("touchend", mouseUp);
  }
})

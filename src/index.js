import Vue from "vue"

let data = {
  element: null,
  handle: false,
  axis: "all",

  offsetX: 0,
  offsetY: 0,

  initialX: 0,
  initialY: 0,

  absoluteX: 0,
  absoluteY: 0
}

/* Start dragging */
function dragDown(arg, val, e) {
  var x = e.pageX || e.touches[0].pageX;
  var y = e.pageY || e.touches[0].pageY;

  if (document.getElementById(val)) {
    data.element = document.getElementById(val);
    data.handle = e.target;
  } else {
    data.element = e.target;
    data.handle = false;
  }

  data.axis = arg || "all";

  data.offsetX = data.element.offsetLeft - x;
  data.offsetY = data.element.offsetTop - y;

  data.initialX = data.element.offsetLeft;
  data.absoluteX = data.element.offsetLeft;

  data.initialY = data.element.offsetTop;
  data.absoluteY = data.element.offsetTop;

  if (data.axis != "x") {
    document.addEventListener("mousemove", updateY);
    document.addEventListener("touchmove", updateY);
  }
  if (data.axis != "y") {
    document.addEventListener("mousemove", updateX);
    document.addEventListener("touchmove", updateX);
  }
}

/* Dragging */
function updateX(e) {
  var position = data.offsetX + (e.pageX || e.touches[0].pageX);

  data.element.style.left = position + "px";
  data.absoluteX = position;
}
function updateY(e) {
  var position = data.offsetY + (e.pageY || e.touches[0].pageY);

  data.element.style.top = position + "px";
  data.absoluteY = position;
}

/* End dragging */
function dragUp() {
  document.removeEventListener("mousemove", updateX);
  document.removeEventListener("touchmove", updateX);
  document.removeEventListener("mousemove", updateY);
  document.removeEventListener("touchmove", updateY);
}

export const exportData = {
  get element() {
    return data.element;
  },
  get handle() {
    return data.handle;
  },
  get axis() {
    return data.axis;
  },
  get absolute() {
    return {
      x: data.absoluteX,
      y: data.absoluteY
    }
  },
  get relative() {
    return {
      x: data.absoluteX - data.initialX,
      y: data.absoluteY - data.initialY
    }
  }
}

export default Vue.directive("drag", {
  inserted: function (el, binding, vnode) {
    var arg = binding.arg;
    var val = binding.value;

    if (val && !document.getElementById(val)) {
      console.error(`Element with id "${val}" doesn't exist`);
    }

    /* Start dragging */
    el.addEventListener("mousedown", e => dragDown(arg, val, e));
    el.addEventListener("touchstart", e => dragDown(arg, val, e));

    /* End dragging */
    document.addEventListener("mouseup", dragUp);
    document.addEventListener("touchend", dragUp);
  }
})

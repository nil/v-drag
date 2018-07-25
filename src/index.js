import Vue from "vue"

let data = {
  element: null,
  handle: false,
  axis: "all",

  initialX: 0,
  initialY: 0,

  cursorInitialX: 0,
  cursorInitialY: 0
}

/* Start dragging */
function dragDown(arg, val, el, e) {
  var x = e.pageX || e.touches[0].pageX;
  var y = e.pageY || e.touches[0].pageY;

  if (document.getElementById(val)) {
    data.element = document.getElementById(val);
    data.handle = el;
    data.handle.style.cursor = "grabbing";
    data.element.style.position = "relative";
  } else {
    data.element = el;
    data.handle = false;
    data.element.style.cursor = "grabbing";
  }

  data.axis = arg || "all";

  data.cursorInitialX = x;
  data.cursorInitialY = y;

  data.initialX = Number(window.getComputedStyle(data.element).left.replace("px", ""));
  data.initialY = Number(window.getComputedStyle(data.element).top.replace("px", ""));

  data.element.style.transform = `translate(${data.initialX}px, ${data.initialY}px)`;
  data.element.style.left = 0;
  data.element.style.top = 0;

  document.addEventListener("mousemove", updatePosition)
  document.addEventListener("touchmove", updatePosition)
}

/* Dragging */
function updatePosition(e) {
  var x = (e.pageX || e.touches[0].pageX) - data.cursorInitialX;
  var y = (e.pageY || e.touches[0].pageY) - data.cursorInitialY;

  if (data.axis == "x") {
    y = 0;
    data.element.style.transform = `translateX(${data.initialX + x}px)`;
  } else if (data.axis == "y") {
    x = 0;
    data.element.style.transform = `translateY(${data.initialY + y}px)`;
  } else {
    data.element.style.transform = `translate(${data.initialX + x}px, ${data.initialY + y}px)`;
  }

  data.relativeX = x;
  data.relativeY = y;
}

/* End dragging */
function dragUp() {
  data.element.style.transform = "none";
  data.element.style.left = data.initialX + data.relativeX + "px";
  data.element.style.top = data.initialY + data.relativeY + "px";

  if (data.handle) {
    data.handle.style.cursor = "grab";
  } else {
    data.element.style.cursor = "grab";
  }

  document.removeEventListener("mousemove", updatePosition);
  document.removeEventListener("touchmove", updatePosition);
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
  get relative() {
    return {
      x: data.relativeX,
      y: data.relativeY
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

    el.style.position = "relative";
    el.style.cursor = "grab";

    /* Start dragging */
    el.addEventListener("mousedown", e => dragDown(arg, val, el, e));
    el.addEventListener("touchstart", e => dragDown(arg, val, el, e));

    /* End dragging */
    document.addEventListener("mouseup", dragUp);
    document.addEventListener("touchend", dragUp);
  }
})

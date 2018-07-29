import Vue from "vue"

let data = {
  grabElement: null,
  moveElement: null,
  axis: "all",

  isStyleAdded: false,

  transform: {
    declared: false,
    string: ""
  },

  initialX: 0,
  initialY: 0,

  cursorInitialX: 0,
  cursorInitialY: 0
}

let stylesheet = ".drag-draggable { position: relative; } .drag-draggable:not(.drag-uses-handle), .drag-handle { cursor: move; cursor: grab; cursor: -moz-grab; cursor: -webkit-grab; } .drag-down { z-index: 999; cursor: grabbing; cursor: -moz-grabbing; cursor: -webkit-grabbing; }"

function returnPositionString(a, b) {
  return `matrix(${data.transform.string} ${a}, ${b})`
}

/* --- Start dragging ---------- */
function dragDown(axis, grabElement, moveElement, e) {

  data.grabElement = grabElement;
  data.moveElement = moveElement;

  data.axis = axis || "all";

  data.cursorInitialX = e.pageX || e.touches[0].pageX;
  data.cursorInitialY = e.pageY || e.touches[0].pageY;

  data.initialX = Number(window.getComputedStyle(moveElement).left.replace("px", ""));
  data.initialY = Number(window.getComputedStyle(moveElement).top.replace("px", ""));

  let transformMatrix = window.getComputedStyle(moveElement).transform;
  if (transformMatrix == "none") {
    data.transform.declared = false;
    data.transform.string = "1, 0, 0, 1,";
  } else {
    data.transform.declared = true;
    data.transform.string = transformMatrix.match(/\d([^,]*,){4}/g)[0];
  }

  moveElement.style.transform = returnPositionString(data.initialX, data.initialY);
  moveElement.style.left = 0;
  moveElement.style.top = 0;

  moveElement.classList.add("drag-down");

  document.addEventListener("mousemove", updatePosition)
  document.addEventListener("touchmove", updatePosition)
}

/* --- Dragging ---------- */
function updatePosition(e) {
  let x = (e.pageX || e.touches[0].pageX) - data.cursorInitialX;
  let y = (e.pageY || e.touches[0].pageY) - data.cursorInitialY;

  data.moveElement.classList.add("drag-move");

  if (data.axis == "x") {
    y = 0;
  } else if (data.axis == "y") {
    x = 0;
  }

  data.moveElement.style.transform = returnPositionString(data.initialX + x, data.initialY + y);

  data.relativeX = x;
  data.relativeY = y;
}

/* --- End dragging ---------- */
function dragUp() {
  if (data.moveElement) {
    data.moveElement.style.transform = data.transform.declared ? returnPositionString(0, 0) : "none";
    data.moveElement.style.left = data.initialX + data.relativeX + "px";
    data.moveElement.style.top = data.initialY + data.relativeY + "px";

    data.moveElement.classList.remove("drag-down");
    data.moveElement.classList.remove("drag-move");

    document.removeEventListener("mousemove", updatePosition);
    document.removeEventListener("touchmove", updatePosition);
  }
}

export default Vue.directive("drag", {
  inserted: function (el, binding, vnode) {
    let val = binding.value;
    let axis, handle, grabElement, moveElement;

    /* Creates stylesheet with basic styling (position, z-index and cursors) */
    if (!data.isStyleAdded) {
      data.isStyleAdded = true;

      let styleElement = document.createElement("style");
      styleElement.innerHTML = stylesheet;
      document.body.appendChild(styleElement);
    }

    if (typeof val === "object") {
      axis = val.axis;
      handle = val.handle;
    } else {
      axis = binding.arg;
      handle = val;
    }

    let valueElement = document.getElementById(handle)

    if (val && !valueElement && val.handle) {
      console.error(`Element with id “${val.handle || val}” doesn’t exist`);
    } else {
      if (valueElement) {
        grabElement = valueElement;
        moveElement = el;
        moveElement.classList.add("drag-uses-handle");
        grabElement.classList.add("drag-handle");
      } else {
        grabElement = el;
        moveElement = el;
      }

      moveElement.classList.add("drag-draggable");

      /* Start dragging */
      grabElement.addEventListener("mousedown", e => dragDown(axis, grabElement, moveElement, e));
      grabElement.addEventListener("touchstart", e => dragDown(axis, grabElement, moveElement, e));
    }

    /* End dragging */
    document.addEventListener("mouseup", dragUp);
    document.addEventListener("touchend", dragUp);
  }
})

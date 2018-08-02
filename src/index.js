let data = {
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

let elements = {
  grab: null,
  move: null
}

let eventClass = {
  initial: "drag-draggable",
  hasHandle: "drag-uses-handle",
  handle: "drag-handle",
  down: "drag-down",
  move: "drag-move"
}

let stylesheet = `.${eventClass.initial} { position: relative; } .${eventClass.initial}:not(.${eventClass.hasHandle}), .${eventClass.handle} { cursor: move; cursor: grab; cursor: -webkit-grab; cursor: -moz-grab; } .${eventClass.handle}.${eventClass.down}, .${eventClass.initial}:not(.${eventClass.hasHandle}).${eventClass.down} { z-index: 999; cursor: grabbing; cursor: -webkit-grabbing; cursor: -moz-grabbing; }`;

function returnPositionString(a, b) {
  return `matrix(${data.transform.string}, ${a}, ${b})`
}

function getPosition(str, el, dir) {
  let list = getMatrixSection(str)
  let pos = parseInt(window.getComputedStyle(el)[dir].slice(0, -2));

  if (dir === "left" && str !== "none") {
    pos += parseInt(str.slice(list[3] + 2, list[4]));
  } else if (dir === "top" && str !== "none") {
    pos += parseInt(str.slice(list[4] + 2, -1));
  }

  return pos;
}

function getMousePosition(e) {
  return {
    x: (e.pageX || e.touches[0].pageX) - data.cursorInitialX,
    y: (e.pageY || e.touches[0].pageY) - data.cursorInitialY
  }
}

function getMatrixSection(str) {
  let list = [], i;
  for(i = 0; i < str.length; i++) {
    if (str[i] === ",") {
      list.push(i);
    }
  }
  return list;
}

/* --- Start dragging ---------- */
function dragDown(axis, grabElement, moveElement, e) {
  elements.grab = grabElement;
  elements.move = moveElement;

  data.axis = axis;

  data.cursorInitialX = e.pageX || e.touches[0].pageX;
  data.cursorInitialY = e.pageY || e.touches[0].pageY;

  data.relativeX = 0;
  data.relativeY = 0;

  let matrix = window.getComputedStyle(moveElement).transform;

  if (matrix == "none") {
    data.transform.declared = false;
    data.transform.string = "1, 0, 0, 1";
  } else {
    data.transform.declared = true;
    data.transform.string = matrix.slice(7, getMatrixSection(matrix)[3]);
  }

  data.initialX = getPosition(matrix, moveElement, "left");
  data.initialY = getPosition(matrix, moveElement, "top");

  moveElement.style.transform = returnPositionString(data.initialX, data.initialY);
  moveElement.style.left = 0;
  moveElement.style.top = 0;

  grabElement.classList.add(eventClass.down);

  document.addEventListener("mousemove", updatePosition[axis]);
  document.addEventListener("touchmove", updatePosition[axis]);
}

/* --- Dragging ---------- */
const updatePosition = {
  addClass: function() {
    elements.move.classList.add(eventClass.move);
    updatePosition.addClass = function() {}
  },
  x: function(e) {
    let pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeX = pos.x;
    elements.move.style.transform = returnPositionString(data.initialX + pos.x, data.initialY);
  },
  y: function(e) {
    let pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeY = pos.y;
    elements.move.style.transform = returnPositionString(data.initialX, data.initialY + pos.y);
  },
  all: function(e) {
    let pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeX = pos.x;
    data.relativeY = pos.y;
    elements.move.style.transform = returnPositionString(data.initialX + pos.x, data.initialY + pos.y);
  }
}

/* --- End dragging ---------- */
function dragUp() {
  if (elements.move) {
    elements.move.style.transform = data.transform.declared ? returnPositionString(0, 0) : "none";
    elements.move.style.left = data.initialX + data.relativeX + "px";
    elements.move.style.top = data.initialY + data.relativeY + "px";

    updatePosition.addClass = function() {
      elements.move.classList.add(eventClass.move);
      updatePosition.addClass = function() {}
    };

    elements.grab.classList.remove(eventClass.down);
    elements.move.classList.remove(eventClass.move);

    document.removeEventListener("mousemove", updatePosition[data.axis]);
    document.removeEventListener("touchmove", updatePosition[data.axis]);
  }
}

const vueTouch = {
  install(Vue, options) {
    Vue.directive("drag", {
      inserted: function(el, binding, vnode) {
        let val = binding.value;
        let axis, handle, grabElement, moveElement;

        /* Creates stylesheet with basic styling (position, z-index and cursors) */
        if (!data.isStyleAdded) {
          data.isStyleAdded = true;

          let styleElement = document.createElement("style");
          styleElement.innerHTML = stylesheet;
          document.body.appendChild(styleElement);
        }

        if (val instanceof Object) {
          axis = val.axis;
          handle = val.handle;
        } else {
          axis = binding.arg;
          handle = val;
        }

        if (axis != "x" && axis != "y") {
          axis = "all";
        }

        let valueElement = document.getElementById(handle);

        if (val && !valueElement && val.handle) {
          console.error(`Element with id “${val.handle || val}” doesn’t exist`);
        } else {
          if (valueElement) {
            grabElement = valueElement;
            moveElement = el;
            moveElement.classList.add(eventClass.hasHandle);
            grabElement.classList.add(eventClass.handle);
          } else {
            grabElement = el;
            moveElement = el;
          }

          moveElement.classList.add(eventClass.initial);

          /* Start dragging */
          grabElement.addEventListener("mousedown", e => dragDown(axis, grabElement, moveElement, e));
          grabElement.addEventListener("touchstart", e => dragDown(axis, grabElement, moveElement, e));
        }

        /* End dragging */
        document.addEventListener("mouseup", dragUp);
        document.addEventListener("touchend", dragUp);


      }
    })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueTouch)
} else {
  module.exports = vueTouch
}

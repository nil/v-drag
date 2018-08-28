/*!
 * v-drag v1.2.4
 * by Nil Vila
 */

const data = {
  axis: 'all',

  isStyleAdded: false,

  transform: {
    declared: false,
    string: ''
  },

  initialX: 0,
  initialY: 0,

  cursorInitialX: 0,
  cursorInitialY: 0
};

const elements = {
  grab: null,
  move: null
};

const eventClass = {
  initial: 'drag-draggable',
  hasHandle: 'drag-uses-handle',
  handle: 'drag-handle',
  down: 'drag-down',
  move: 'drag-move'
};

function returnPositionString(a, b) {
  return `matrix(${data.transform.string}, ${a}, ${b})`;
}

function getMatrixSection(str) {
  const list = []; let i;
  for (i = 0; i < str.length; i += 1) {
    if (str[i] === ',') {
      list.push(i);
    }
  }
  return list;
}

function getPosition(str, el, dir) {
  const list = getMatrixSection(str);
  let pos = parseInt(window.getComputedStyle(el)[dir].slice(0, -2), 10);

  if (dir === 'left' && str !== 'none') {
    pos += parseInt(str.slice(list[3] + 2, list[4]), 10);
  } else if (dir === 'top' && str !== 'none') {
    pos += parseInt(str.slice(list[4] + 2, -1), 10);
  }

  return pos;
}

function getMousePosition(e) {
  return {
    x: (e.pageX || e.touches[0].pageX) - data.cursorInitialX,
    y: (e.pageY || e.touches[0].pageY) - data.cursorInitialY
  };
}

/* --- While dragging ---------- */
const updatePosition = {
  addClass() {
    elements.move.classList.add(eventClass.move);
    updatePosition.addClass = function () {};
  },
  x(e) {
    const pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeX = pos.x;
    elements.move.style.transform = returnPositionString(data.initialX + pos.x, data.initialY);
  },
  y(e) {
    const pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeY = pos.y;
    elements.move.style.transform = returnPositionString(data.initialX, data.initialY + pos.y);
  },
  all(e) {
    const pos = getMousePosition(e);

    updatePosition.addClass();
    data.relativeX = pos.x;
    data.relativeY = pos.y;

    elements.move.style.transform = returnPositionString(
      data.initialX + pos.x,
      data.initialY + pos.y
    );
  }
};

/* --- Start dragging ---------- */
function dragDown(axis, grabElement, moveElement, e) {
  const grabEl = grabElement;
  const moveEl = moveElement;

  elements.grab = grabEl;
  elements.move = moveEl;

  data.axis = axis;

  data.cursorInitialX = e.pageX || e.touches[0].pageX;
  data.cursorInitialY = e.pageY || e.touches[0].pageY;

  data.relativeX = 0;
  data.relativeY = 0;

  const matrix = window.getComputedStyle(moveElement).transform;

  if (matrix === 'none') {
    data.transform.declared = false;
    data.transform.string = '1, 0, 0, 1';
  } else {
    data.transform.declared = true;
    data.transform.string = matrix.slice(7, getMatrixSection(matrix)[3]);
  }

  data.initialX = getPosition(matrix, moveEl, 'left');
  data.initialY = getPosition(matrix, moveEl, 'top');

  moveEl.style.transform = returnPositionString(data.initialX, data.initialY);
  moveEl.style.left = 0;
  moveEl.style.top = 0;

  grabEl.classList.add(eventClass.down);

  document.addEventListener('mousemove', updatePosition[axis]);
  document.addEventListener('touchmove', updatePosition[axis]);
}

/* --- End dragging ---------- */
function dragUp() {
  if (elements.move) {
    elements.move.style.transform = data.transform.declared ? returnPositionString(0, 0) : 'none';
    elements.move.style.left = `${data.initialX + data.relativeX}px`;
    elements.move.style.top = `${data.initialY + data.relativeY}px`;

    updatePosition.addClass = function () {
      elements.move.classList.add(eventClass.move);
      updatePosition.addClass = function () {};
    };

    elements.grab.classList.remove(eventClass.down);
    elements.move.classList.remove(eventClass.move);

    document.removeEventListener('mousemove', updatePosition[data.axis]);
    document.removeEventListener('touchmove', updatePosition[data.axis]);
  }
}

function createDraggable(el, binding) {
  const val = binding.value;
  let axis; let handle; let grabElement; let moveElement;

  /* Creates stylesheet with basic styling (position, z-index and cursors) */
  if (!data.isStyleAdded) {
    data.isStyleAdded = true;

    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${eventClass.initial}{position:relative;}.${eventClass.initial}:not(.${eventClass.hasHandle}),.${eventClass.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;cursor:-moz-grab;}.${eventClass.handle}.${eventClass.down},.${eventClass.initial}:not(.${eventClass.hasHandle}).${eventClass.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;cursor:-moz-grabbing;}`;
    document.body.appendChild(styleElement);
  }

  if (val instanceof Object) {
    [axis, handle] = [val.axis, val.handle];
  } else {
    [axis, handle] = [binding.arg, val];
  }

  if (axis !== 'x' && axis !== 'y') {
    axis = 'all';
  }

  const valueElement = document.getElementById(handle);

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
    grabElement.onmousedown = e => dragDown(axis, grabElement, moveElement, e);
    grabElement.ontouchstart = e => dragDown(axis, grabElement, moveElement, e);
  }

  /* End dragging */
  document.addEventListener('mouseup', dragUp);
  document.addEventListener('touchend', dragUp);
}

const vDrag = {
  install(Vue, options) {
    if (options) {
      const classes = options.eventClass;
      eventClass.forEach((key) => {
        if (classes[key]) {
          eventClass[key] = classes[key];
        }
      });
    }

    Vue.directive('drag', {
      inserted(el, binding) {
        createDraggable(el, binding);
      },
      update(el, binding) {
        if (binding.oldValue) {
          const oldHandle = document.getElementById(binding.oldValue)
            || document.getElementById(binding.oldValue.handle);

          if (oldHandle) {
            oldHandle.onmousedown = null;
            oldHandle.ontouchstart = null;
            oldHandle.classList.remove(eventClass.handle);
          }
        }
        createDraggable(el, binding);
      }
    });
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vDrag);
} else {
  module.exports = vDrag;
}

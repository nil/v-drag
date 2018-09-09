/*!
 * v-drag v1.2.10
 * by Nil Vila
 */

const data = {
  axis: 'all',

  transform: {
    declared: false,
    string: ''
  }
};

const elements = {
  grab: null,
  move: null
};

const coord = {
  mouse: { // Current mouse/touch positon
    x: 0,
    y: 0
  },
  matrix: { // Element's position given by matrix
    x: 0,
    y: 0
  },
  initial: { // Position of mouse/touch when drag begins
    x: 0,
    y: 0
  },
  relative: { // Difference between element's initial and current position
    x: 0,
    y: 0
  }
};

const eventClass = {
  initial: 'drag-draggable',
  hasHandle: 'drag-uses-handle',
  handle: 'drag-handle',
  down: 'drag-down',
  move: 'drag-move'
};

let posAnimation;
let isMoveStarted = false;


/*
 * Utils
 */

// Shorthand for muliple events with the same function
function eventListener(types, func, state = 'add', target = document) {
  if (state === 'add') {
    types.forEach((type) => {
      target.addEventListener(type, func);
    });
  } else if (state === 'remove') {
    types.forEach((type) => {
      target.removeEventListener(type, func);
    });
  }
}

// Add styling to the move element
function moveElementTransform(transform, left, top) {
  elements.move.style.transform = transform;
  elements.move.style.left = left;
  elements.move.style.top = top;
}

// Return a matrix with transform and translate values
function returnPositionString(a, b) {
  return `matrix(${data.transform.string} ${a}, ${b})`;
}

// Return element's left or top position from matrix
function getTransformValue(str, dir) {
  let value = Number(window.getComputedStyle(elements.move)[dir].replace('px', ''));

  if (str !== 'none') {
    const itemsArray = str.match(/[0-9., -]+/)[0].split(', ');
    if (dir === 'left') {
      value += Number(itemsArray[4]);
    } else if (dir === 'top') {
      value += Number(itemsArray[5]);
    }
  }
  return value;
}

// Update mouse's x and y coordinates
function updateMousePosition(e) {
  coord.mouse.x = (e.pageX || e.touches[0].pageX) - coord.initial.x;
  coord.mouse.y = (e.pageY || e.touches[0].pageY) - coord.initial.y;
}


/*
 * External functions
 */

function setAndStoreTransformValue() {
  // Get transform value of the move element
  const matrix = window.getComputedStyle(elements.move).transform;

  // Retrun move element's transform value
  if (matrix === 'none') {
    data.transform.declared = false;
    data.transform.string = '1, 0, 0, 1,';
  } else {
    data.transform.declared = true;
    data.transform.string = matrix.match(/\d([^,]*,){4}/g);
  }

  // Apply transform to the move element
  const left = getTransformValue(matrix, 'left');
  const top = getTransformValue(matrix, 'top');

  moveElementTransform(returnPositionString(left, top), 0, 0);

  // Set matrix's transform value on the dataset
  coord.matrix.x = left;
  coord.matrix.y = top;
}


/*
 * While dragging
 */

const updatePosition = {
  addClass() {
    elements.move.classList.add(eventClass.move);
    updatePosition.addClass = function () {};
  },
  x() {
    coord.relative.x = coord.mouse.x;
    elements.move.style.transform = returnPositionString(
      coord.matrix.x + coord.mouse.x,
      coord.matrix.y
    );
  },
  y() {
    coord.relative.y = coord.mouse.y;
    elements.move.style.transform = returnPositionString(
      coord.matrix.x,
      coord.matrix.y + coord.mouse.y
    );
  },
  all() {
    coord.relative.x = coord.mouse.x;
    coord.relative.y = coord.mouse.y;
    elements.move.style.transform = returnPositionString(
      coord.matrix.x + coord.mouse.x,
      coord.matrix.y + coord.mouse.y
    );
  }
};

function posUpdate() {
  updatePosition[data.axis]();
  posAnimation = requestAnimationFrame(posUpdate);
}

function startMovement() {
  if (!isMoveStarted) {
    updatePosition.addClass();
    isMoveStarted = true;
    posAnimation = requestAnimationFrame(posUpdate);
  } else {
    eventListener(['mousemove', 'touchmove'], startMovement, 'remove');
  }
}


/*
 * Start dragging
 */

function dragDown(grabElement, moveElement, axis, e) {
  // Store grab and move elements
  elements.grab = grabElement;
  elements.move = moveElement;

  // Store axis value
  data.axis = axis;

  // Store current mouse or touch position
  coord.initial.x = e.pageX || e.touches[0].pageX;
  coord.initial.y = e.pageY || e.touches[0].pageY;

  // Reset relative coordinates
  coord.relative.x = 0;
  coord.relative.y = 0;

  // Apply transform styling to the move element
  setAndStoreTransformValue();

  // Set CSS class to grab element
  grabElement.classList.add(eventClass.down);

  // Add events for mouse or touch movement
  eventListener(['mousemove', 'touchmove'], updateMousePosition);
  eventListener(['mousemove', 'touchmove'], startMovement);
}


/*
 * End dragging
 */

function dragUp() {
  cancelAnimationFrame(posAnimation);

  isMoveStarted = false;
  eventListener(['mousemove', 'touchmove'], startMovement, 'remove');

  moveElementTransform(
    data.transform.declared ? returnPositionString(0, 0) : 'none',
    `${coord.matrix.x + coord.relative.x}px`,
    `${coord.matrix.y + coord.relative.y}px`
  );

  updatePosition.addClass = function () {
    elements.move.classList.add(eventClass.move);
    updatePosition.addClass = function () {};
  };

  elements.grab.classList.remove(eventClass.down);
  elements.move.classList.remove(eventClass.move);

  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}

function createDrag(el, binding) {
  const val = binding.value;
  let axis; let handle; let grabElement; let moveElement;

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

    // Start dragging
    grabElement.onmousedown = e => dragDown(grabElement, moveElement, axis, e);
    grabElement.ontouchstart = e => dragDown(grabElement, moveElement, axis, e);
  }

  // End dragging
  eventListener(['mouseup', 'touchend'], dragUp);
}

export default {
  install(Vue, options) {
    // Replace default event classes with custom ones
    if (options) {
      const classes = options.eventClass;
      Object.keys(classes).forEach((key) => {
        if (classes[key]) {
          eventClass[key] = classes[key];
        }
      });
    }

    // Create stylesheet with basic styling (position, z-index and cursors)
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `.${eventClass.initial}{position:relative;}.${eventClass.initial}:not(.${eventClass.hasHandle}),.${eventClass.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;cursor:-moz-grab;}.${eventClass.handle}.${eventClass.down},.${eventClass.initial}:not(.${eventClass.hasHandle}).${eventClass.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;cursor:-moz-grabbing;}`;
    document.body.appendChild(styleElement);

    // Register 'v-drag' directive
    Vue.directive('drag', {

      // Add draggable configuration to element for the first time
      inserted(el, binding) {
        createDrag(el, binding);
      },

      // Update the drag configuration, remove events and styling to previous handle
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
        createDrag(el, binding);
      }
    });
  }
};

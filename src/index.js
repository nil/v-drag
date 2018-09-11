/*!
 * v-drag v1.2.10
 * by Nil Vila
 */

const data = {
  axis: 'all',
  matrix: false
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


/*
 * Helpers
 */

// Return a matrix with transform and translate values
function returnPositionString(a, b) {
  return `matrix(${data.matrix ? data.matrix : '1, 0, 0, 1,'} ${a}, ${b})`;
}

// Return element's left or top position
function getTransformValue(str, dir) {
  // Get top or left position, without translate
  let pos = Number(window.getComputedStyle(elements.move)[dir].replace('px', ''));

  // Only consider translation when matrix is defined
  if (str !== 'none') {
    // Get all matrix's values
    const itemsArray = str.match(/[0-9.-]+/g);

    // Get matrix translate value, based on the x + y = 8 equation
    pos += Number(itemsArray[8 - dir.length]);
  }

  return pos;
}

// Shorthand for muliple events with the same function
function eventListener(types, func, state = 'add') {
  types.forEach((type) => {
    document[`${state}EventListener`](type, func);
  });
}

// Add styling to the move element
function moveElementTransform(transform, left, top) {
  elements.move.style.transform = transform;
  elements.move.style.left = left;
  elements.move.style.top = top;
}

// Update mouse's x and y coordinates
function updateMousePosition(e) {
  coord.mouse.x = (e.pageX || e.touches[0].pageX) - coord.initial.x;
  coord.mouse.y = (e.pageY || e.touches[0].pageY) - coord.initial.y;
}


/*
 * While dragging
 */

function updatePosition(x, y) {
  // Store relative coordinates
  coord.relative.x = coord.mouse.x * x;
  coord.relative.y = coord.mouse.y * y;

  // Apply transformation to move element
  elements.move.style.transform = returnPositionString(
    coord.matrix.x + coord.mouse.x * x,
    coord.matrix.y + coord.mouse.y * y
  );
}

// Call updatePosition() based on the axis
const callPositionUpdate = {
  x() { updatePosition(true, false); },
  y() { updatePosition(false, true); },
  all() { updatePosition(true, true); }
};

// Function to execute every frame
function repeatRaf() {
  callPositionUpdate[data.axis]();
  posAnimation = requestAnimationFrame(repeatRaf);
}

function setUpMovement() {
  // Apply CSS class to move element
  elements.move.classList.add(eventClass.move);

  // Begin moving animation
  posAnimation = requestAnimationFrame(repeatRaf);

  // Avoid this function to fire another time
  eventListener(['mousemove', 'touchmove'], setUpMovement, 'remove');
}


/*
 * Start dragging
 */

function dragStart(grabElement, moveElement, axis, e) {
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

  // Get transform string of the move element
  const matrix = window.getComputedStyle(moveElement).transform;

  // Update dataset with matrix value
  if (matrix === 'none') {
    data.matrix = false;
  } else {
    data.matrix = matrix.match(/\d([^,]*,){4}/g);
  }

  // Apply transform to the move element
  const left = getTransformValue(matrix, 'left');
  const top = getTransformValue(matrix, 'top');

  // Replace left and top properties with transform
  moveElementTransform(returnPositionString(left, top), 0, 0);

  // Store move element's coordinates in the dataset
  coord.matrix.x = left;
  coord.matrix.y = top;

  // Apply CSS class to grab element
  grabElement.classList.add(eventClass.down);

  // Add events for mouse or touch movement
  eventListener(['mousemove', 'touchmove'], updateMousePosition);
  eventListener(['mousemove', 'touchmove'], setUpMovement);
}


/*
 * End dragging
 */

function dragEnd() {
  // Stop move animation
  cancelAnimationFrame(posAnimation);

  // Remove setUpMovement() if mouse/touch hasn't moved
  eventListener(['mousemove', 'touchmove'], setUpMovement, 'remove');

  // Replace transform properties with left and top
  moveElementTransform(
    data.matrix ? returnPositionString(0, 0) : 'none',
    `${coord.matrix.x + coord.relative.x}px`,
    `${coord.matrix.y + coord.relative.y}px`
  );

  // Remove CSS classes
  elements.grab.classList.remove(eventClass.down);
  elements.move.classList.remove(eventClass.move);

  // Stop updating mouse position
  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}


/*
 * Set up dragging
 */

function dragSetup(el, binding) {
  const val = binding.value;
  let axis; let handle; let grabElement; let moveElement;

  // Update axis and handle values
  if (val instanceof Object) {
    [axis, handle] = [val.axis, val.handle];
  } else {
    [axis, handle] = [binding.arg, val];
  }

  // Set axis to 'all' when its neither 'x' nor 'y'
  if (axis !== 'x' && axis !== 'y') {
    axis = 'all';
  }

  const valueElement = document.getElementById(handle);

  if (val && !valueElement && val.handle) {
    // Throw error when handle is defined but doesn't exist
    console.error(`Element with id “${val.handle || val}” doesn’t exist`);
  } else {
    if (valueElement) {
      // Define roles of the elements
      grabElement = valueElement;
      moveElement = el;

      // Apply CSS classes related to the handle
      moveElement.classList.add(eventClass.hasHandle);
      grabElement.classList.add(eventClass.handle);
    } else {
      // Define roles of the elements
      grabElement = el;
      moveElement = el;
    }

    // Apply CSS class to move element
    moveElement.classList.add(eventClass.initial);

    // Add event to start drag
    grabElement.onmousedown = e => dragStart(grabElement, moveElement, axis, e);
    grabElement.ontouchstart = e => dragStart(grabElement, moveElement, axis, e);
  }

  // Add event listener to end drag
  eventListener(['mouseup', 'touchend'], dragEnd);
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
        dragSetup(el, binding);
      },

      // Update the drag configuration
      update(el, binding) {
        // Remove events from updated element
        el.onmousedown = null;
        el.ontouchstart = null;

        const oldHandle = document.getElementById(binding.oldValue)
          || document.getElementById(binding.oldValue.handle);

        if (oldHandle) {
          // Remove events from the old handle
          oldHandle.onmousedown = null;
          oldHandle.ontouchstart = null;

          // Remove CSS classes related to old handle
          oldHandle.classList.remove(eventClass.handle);
          el.classList.remove(eventClass.hasHandle);
        }

        // Add draggable configuration to element another time
        dragSetup(el, binding);
      }
    });
  }
};

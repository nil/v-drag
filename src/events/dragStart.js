import dragMove from './dragMove';

import getTransformValue from '../utils/getTransformValue';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import eventListener from '../utils/eventListener';
import updateMousePosition from '../utils/updateMousePosition';
import vueDragEvent from '../utils/vueDragEvent';

export default function (grabElement, moveElement, options, e) {
  e.preventDefault();

  // Store elements
  window.data.grab = grabElement;
  window.data.move = moveElement;

  // Store axis
  window.data.axis = options.axis;

  // Store current mouse or touch position
  window.data.initialX = e.pageX;
  window.data.initialY = e.pageY;

  // Reset relative coordinates
  window.data.relativeX = 0;
  window.data.relativeY = 0;

  // Store snapping values
  window.data.snapX = options.snap.x;
  window.data.snapY = options.snap.y;

  console.warn(options.axis);
  // console.warn(window.data.axis);

  // Get transform string of the move element
  const matrix = window.getComputedStyle(window.data.move).transform;

  // Store matrix value
  if (matrix === 'none') {
    window.data.matrix = false;
  } else {
    window.data.matrix = matrix.match(/\d([^,]*,){4}/g);
  }

  // Apply transform to the move element
  const elementsByCoordinates = ['rect', 'circle', 'text', 'ellipse', 'image', 'path'];
  const leftProperty = elementsByCoordinates.includes(window.data.move.nodeName) ? 'x' : 'left';
  const topProperty = elementsByCoordinates.includes(window.data.move.nodeName) ? 'y' : 'top';
  const left = getTransformValue(matrix, leftProperty);
  const top = getTransformValue(matrix, topProperty);

  // Replace left and top properties with transform
  moveElementTransform(
    returnPositionString(window.data.matrix, left, top),
    0,
    0,
  );

  window.data.matrixX = left;
  window.data.matrixY = top;

  // Apply CSS class to grab element
  window.data.grab.classList.add(window.data.class.down);

  // Vue event on drag down
  vueDragEvent(moveElement, 'down');

  // Add events to move drag
  eventListener(['pointermove'], updateMousePosition);
  eventListener(['pointermove'], dragMove);
}

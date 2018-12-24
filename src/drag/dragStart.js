import dragMove from './dragMove';

import getTransformValue from '../utils/getTransformValue';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import eventListener from '../utils/eventListener';
import updateMousePosition from '../utils/updateMousePosition';


export default function (grabElement, moveElement, axis, e) {
  // Store elements
  window.data.grab = grabElement;
  window.data.move = moveElement;

  // Store axis
  window.data.axis = axis;

  // Store current mouse or touch position
  window.data.initialX = e.pageX || e.touches[0].pageX;
  window.data.initialY = e.pageY || e.touches[0].pageY;

  // Reset relative coordinates
  window.data.relativeX = 0;
  window.data.relativeY = 0;

  // Get transform string of the move element
  const matrix = window.getComputedStyle(window.data.move).transform;

  // Store matrix value
  if (matrix === 'none') {
    window.data.matrix = false;
  } else {
    window.data.matrix = matrix.match(/\d([^,]*,){4}/g);
  }

  // Apply transform to the move element
  const left = getTransformValue(window.data.move, matrix, 'left');
  const top = getTransformValue(window.data.move, matrix, 'top');

  // Replace left and top properties with transform
  moveElementTransform(
    window.data.move,
    returnPositionString(window.data.matrix, left, top),
    0, 0
  );

  window.data.matrixX = left;
  window.data.matrixY = top;

  // TDOO: Apply CSS class to grab element

  // Add events to move drag
  eventListener(['mousemove', 'touchmove'], updateMousePosition);
  eventListener(['mousemove', 'touchmove'], dragMove);
}

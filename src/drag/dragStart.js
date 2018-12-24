import dragMove from './dragMove';

import getTransformValue from '../utils/getTransformValue';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import eventListener from '../utils/eventListener';
import updateMousePosition from '../utils/updateMousePosition';


export default function (grabElement, moveElement, axis, e) {
  // Store elements
  window.vnode.grab = grabElement;
  window.vnode.move = moveElement;

  // Store axis
  window.vnode.axis = axis;

  // Store current mouse or touch position
  window.vnode.initialX = e.pageX || e.touches[0].pageX;
  window.vnode.initialY = e.pageY || e.touches[0].pageY;

  // Reset relative coordinates
  window.vnode.relativeX = 0;
  window.vnode.relativeY = 0;

  // Get transform string of the move element
  const matrix = window.getComputedStyle(window.vnode.move).transform;

  // Store matrix value
  if (matrix === 'none') {
    window.vnode.matrix = false;
  } else {
    window.vnode.matrix = matrix.match(/\d([^,]*,){4}/g);
  }

  // Apply transform to the move element
  const left = getTransformValue(window.vnode.move, matrix, 'left');
  const top = getTransformValue(window.vnode.move, matrix, 'top');

  // Replace left and top properties with transform
  moveElementTransform(
    window.vnode.move,
    returnPositionString(window.vnode.matrix, left, top),
    0, 0
  );

  window.vnode.matrixX = left;
  window.vnode.matrixY = top;

  // TDOO: Apply CSS class to grab element

  // Add events to move drag
  eventListener(['mousemove', 'touchmove'], updateMousePosition);
  eventListener(['mousemove', 'touchmove'], dragMove);
}

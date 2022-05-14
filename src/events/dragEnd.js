import dragMove from './dragMove';

import eventListener from '../utils/eventListener';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import updateMousePosition from '../utils/updateMousePosition';
import vueDragEvent from '../utils/vueDragEvent';
import closestValueToSnap from '../utils/closestValueToSnap';

export default function () {
  // Prevent TypeError from showing
  if (!(window.data.grab && window.data.move)) return;

  // Stop move animation
  cancelAnimationFrame(window.data.posAnimation);

  // Remove setUpMovement() if mouse/touch hasn't moved
  eventListener(['mousemove', 'touchmove'], dragMove, 'remove');

  // Replace transform properties with left and top
  moveElementTransform(
    window.data.matrix ? returnPositionString(window.data.matrix, 0, 0) : 'none',
    `${window.data.matrixX + closestValueToSnap(window.data.relativeX, 'x')}px`,
    `${window.data.matrixY + closestValueToSnap(window.data.relativeY, 'y')}px`,
  );

  // Remove CSS classes
  window.data.grab.classList.remove(window.data.class.down);
  window.data.move.classList.remove(window.data.class.move);

  // Vue event on drag end
  vueDragEvent(window.data.move, 'end');

  // Stop updating mouse position
  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}

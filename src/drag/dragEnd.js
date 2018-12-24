import dragMove from './dragMove';

import eventListener from '../utils/eventListener';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import updateMousePosition from '../utils/updateMousePosition';

export default function () {
  // Stop move animation
  cancelAnimationFrame(window.data.posAnimation);

  // Remove setUpMovement() if mouse/touch hasn't moved
  eventListener(['mousemove', 'touchmove'], dragMove, 'remove');

  // Replace transform properties with left and top
  moveElementTransform(
    window.data.matrix ? returnPositionString(window.data.matrix, 0, 0) : 'none',
    `${window.data.matrixX + window.data.relativeX}px`,
    `${window.data.matrixY + window.data.relativeY}px`,
  );

  // Remove CSS classes
  window.data.grab.classList.remove(window.data.class.down);
  window.data.move.classList.remove(window.data.class.move);

  // Stop updating mouse position
  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}

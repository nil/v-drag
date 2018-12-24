import dragMove from './dragMove';

import eventListener from '../utils/eventListener';
import moveElementTransform from '../utils/moveElementTransform';
import returnPositionString from '../utils/returnPositionString';
import updateMousePosition from '../utils/updateMousePosition';

export default function () {
  // Stop move animation
  cancelAnimationFrame(window.vnode.posAnimation);

  // Remove setUpMovement() if mouse/touch hasn't moved
  eventListener(['mousemove', 'touchmove'], dragMove, 'remove');

  // Replace transform properties with left and top
  moveElementTransform(
    window.vnode.move,
    window.vnode.matrix ? returnPositionString(window.vnode.matrix, 0, 0) : 'none',
    `${window.vnode.matrixX + window.vnode.relativeX}px`,
    `${window.vnode.matrixY + window.vnode.relativeY}px`,
  );

  // TODO: Remove CSS classes

  // Stop updating mouse position
  eventListener(['mousemove', 'touchmove'], updateMousePosition, 'remove');
}

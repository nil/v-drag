/* eslint no-undef: "off" */
/* eslint import/extensions: "off" */

import isValidAxisValue from '../utils/isValidAxisValue';
import returnPositionString from '../utils/returnPositionString';
import getTransformValue from '../utils/getTransformValue';
import moveElementTransform from '../utils/moveElementTransform';

import dragSetup from '../events/dragSetup';
import dragEnd from '../events/dragEnd';

// Create element
document.body.innerHTML = `
  <div id='e1'></div>
  <div id='e2'></div>
  <div id='e3' style='left: 20px; transform: rotate(30deg) translate(20px, 10px) scaleX(1.3)'></div>
  <div id='e4'></div>
`;

const e1 = document.getElementById('e1');
const e2 = document.getElementById('e2');
const e3 = document.getElementById('e3');

/*
 * Set up dragging
 */

describe('Set up dragging', () => {
  const empty = {};
  const argOther = { arg: 'other' };
  const valueUndefined = { value: 'und' };
  const valueArg = { value: 'e2', arg: 'x' };
  const valueAxisHandle = { value: { axis: 'x', handle: 'e2' } };
  const valueAxisArgValid = { value: { axis: 'x' }, arg: 'y' };
  const valueAxisArgInvalid = { value: { axis: 'other' }, arg: 'y' };

  describe('Axis', () => {
    // 001
    test('Get axis from object', () => {
      const result = dragSetup(e1, valueAxisHandle);
      expect(result.axis).toBe('x');
    });

    // 002
    test('Get axis from argument', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.axis).toBe('x');
    });

    // 004
    test('Get object if both object and argument are declared', () => {
      const result = dragSetup(e1, valueAxisArgValid);
      expect(result.axis).toBe('x');
    });

    // 005
    test('Get axis from arg if object is invalid', () => {
      const result = dragSetup(e1, valueAxisArgInvalid);
      expect(result.axis).toBe('y');
    });

    // 006
    test('Get axis when it is not declared', () => {
      const result = dragSetup(e1, empty);
      expect(result.axis).toBe('all');
    });

    // 007
    test("Validate axis if it is not 'x' or 'y'", () => {
      const result = dragSetup(e1, argOther);
      expect(result.axis).toBe('all');
    });
  });

  describe('Handle', () => {
    // 005
    test('Get handle from object', () => {
      const result = dragSetup(e1, valueAxisHandle);
      expect(result.handle).toBe(e2.id);
    });

    // 006
    test('Get handle from value', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.handle).toBe(e2.id);
    });

    // 007
    test('Return same element if handle is undefined', () => {
      const result = dragSetup(e1, valueUndefined);
      expect(result.grabElement).toBe(result.moveElement);
    });

    // 008
    test('Return different elements if handle is defined', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.grabElement).not.toBe(result.moveElement);
    });

    // 009
    test('Grab element has CSS class .drag-handle', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.grabElement.classList).toContain('drag-handle');
    });

    // 010
    test('Move element has CSS class .drag-uses-handle', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.moveElement.classList).toContain('drag-uses-handle');
    });
  });

  describe('Other', () => {
    // 011
    test('Move element has CSS class .drag-draggable', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.moveElement.classList).toContain('drag-draggable');
    });

    // 012
    test('Grab element has the initial events', () => {
      const result = dragSetup(e1, valueArg);
      expect(result.grabElement.onmousedown).not.toBeNull();
      expect(result.grabElement.ontouchstart).not.toBeNull();
    });
  });
});

/*
 * End dragging
 */

describe('End dragging', () => {
  test("Grab element doesn't have CSS class .drag-down", () => {
    const result = dragEnd();
    expect(result.grabElement.classList).not.toContain('drag-down');
  });
  test("Move element doesn't have CSS class .drag-move", () => {
    const result = dragEnd();
    expect(result.movebElement.classList).not.toContain('drag-move');
  });
});

/*
 * Helpers
 */

describe('Helpers', () => {
  describe('isValidAxisValue', () => {
    test("Validate axis when the value is 'x'", () => {
      expect(isValidAxisValue('x')).toBeTruthy();
    });
    test("Validate axis when the value is 'y'", () => {
      expect(isValidAxisValue('y')).toBeTruthy();
    });
    test("Validate axis when the value is 'all'", () => {
      expect(isValidAxisValue('all')).toBeTruthy();
    });
    test('Validate axis when the value is another one', () => {
      expect(isValidAxisValue('fall')).toBeFalsy();
    });
    test('Validate axis when the value is empty', () => {
      expect(isValidAxisValue('')).toBeFalsy();
    });
  });

  describe('returnPositionString', () => {
    test('Return string when matrix is defined', () => {
      const data = { matrix: '1, 2, 3, 4,' };
      expect(returnPositionString(20, 30, data)).toBe('matrix(1, 2, 3, 4, 20, 30)');
    });
    test('Return string when matrix is not defined', () => {
      const data = { matrix: false };
      expect(returnPositionString(20, 30, data)).toBe('matrix(1, 0, 0, 1, 20, 30)');
    });
  });

  describe('getTransformValue', () => {
    test('Get position when matrix is not defined', () => {
      const elements = { move: e1 };
      expect(getTransformValue('none', 'top', elements)).toBe(0);
      expect(getTransformValue('none', 'left', elements)).toBe(0);
    });
    test('Get position when matrix is defined', () => {
      const elements = { move: e3 };
      expect(getTransformValue('matrix(1.12583, 0.65, -0.5, 0.866025, 12.3205, 18.6603)', 'top', elements)).toBeCloseTo(18.66);
      expect(getTransformValue('matrix(1.12583, 0.65, -0.5, 0.866025, 12.3205, 18.6603)', 'left', elements)).toBeCloseTo(32.32);
    });
  });

  // TODO: find a way to emulate events and test eventListener()

  describe('moveElementTransform', () => {
    test('Update position when matrix is defined', () => {
      moveElementTransform('matrix(1, 0, 0, 1, 20, 1)', '40px', '5px', e1);

      expect(window.getComputedStyle(e1).transform).toBe('matrix(1, 0, 0, 1, 20, 1)');
    });
    test('Update position when axis is undefined', () => {
      moveElementTransform('none', 0, 0, e1);

      expect(window.getComputedStyle(e1).transform).toBe('none');
    });
    test('Update position when left and top are strings', () => {
      moveElementTransform('matrix(1, 0, 0, 1, 20, 1)', '40px', '5px', e1);

      expect(window.getComputedStyle(e1).left).toBe('40px');
      expect(window.getComputedStyle(e1).top).toBe('5px');
    });
    test('Update position when left and top are 0', () => {
      moveElementTransform('none', 0, 0, e1);

      expect(window.getComputedStyle(e1).left).toBe('0px');
      expect(window.getComputedStyle(e1).top).toBe('0px');
    });
  });

  describe('moveElementTransform', () => {
    test('Update position when matrix is defined', () => {
      moveElementTransform('matrix(1, 0, 0, 1, 20, 1)', '40px', '5px', e1);

      expect(window.getComputedStyle(e1).transform).toBe('matrix(1, 0, 0, 1, 20, 1)');
    });
    test('Update position when axis is undefined', () => {
      moveElementTransform('none', 0, 0, e1);

      expect(window.getComputedStyle(e1).transform).toBe('none');
    });
    test('Update position when left and top are strings', () => {
      moveElementTransform('matrix(1, 0, 0, 1, 20, 1)', '40px', '5px', e1);

      expect(window.getComputedStyle(e1).left).toBe('40px');
      expect(window.getComputedStyle(e1).top).toBe('5px');
    });
    test('Update position when left and top are 0', () => {
      moveElementTransform('none', 0, 0, e1);

      expect(window.getComputedStyle(e1).left).toBe('0px');
      expect(window.getComputedStyle(e1).top).toBe('0px');
    });
  });
});

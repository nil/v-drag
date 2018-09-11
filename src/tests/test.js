/* eslint-disable */

import {
  dragSetup
} from '../index.js';

// Create element
document.body.innerHTML = `
  <div id='el'></div>
  <div id='id'></div>
`;

const el = document.getElementById('el');
const elId = document.getElementById('id');

/*
 * Set up dragging
 */

describe('Set up dragging', () => {
  const empty = {};
  const argOther = { arg: 'other' };
  const valueUndefined = { value: 'und' };
  const valueArg = { value: 'id', arg: 'x' };
  const valueAxisHandle = { value: { axis: 'x', handle: 'id' } };
  const valueAxisArgValid = { value: { axis: 'x' }, arg: 'y' };
  const valueAxisArgInvalid = { value: { axis: 'other' }, arg: 'y' };

  describe('Axis', () => {
    test('Get axis from object', () => {
      const result = dragSetup(el, valueAxisHandle);
      expect(result.axis).toBe('x');
    });

    test('Get axis from arg', () => {
      const result = dragSetup(el, valueArg);
      expect(result.axis).toBe('x');
    });

    test('Get object if object and arg are declared', () => {
      const result = dragSetup(el, valueAxisArgValid);
      expect(result.axis).toBe('x');
    });

    test('Get axis from arg if object is invalid', () => {
      const result = dragSetup(el, valueAxisArgInvalid);
      expect(result.axis).toBe('y');
    });

    test('Get axis when it is not declared', () => {
      const result = dragSetup(el, empty);
      expect(result.axis).toBe('all');
    });

    test("Validate axis if it is not 'x' or 'y'", () => {
      const result = dragSetup(el, argOther);
      expect(result.axis).toBe('all');
    });
  });

  describe('Handle', () => {
    test('Get handle from object', () => {
      const result = dragSetup(el, valueAxisHandle);
      expect(result.handle).toBe(elId.id);
    });

    test('Get handle from value', () => {
      const result = dragSetup(el, valueArg);
      expect(result.handle).toBe(elId.id);
    });

    test('Same element when undefined handle', () => {
      const result = dragSetup(el, valueUndefined);
      expect(result.grabElement).toBe(result.moveElement);
    });

    test('Different element when defined handle', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement).not.toBe(result.moveElement);
    });

    test('.drag-handle on grab element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement.classList).toContain('drag-handle');
    });

    test('.drag-uses-handle on move element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.moveElement.classList).toContain('drag-uses-handle');
    });
  });

  describe('Other', () => {
    test('.drag-draggable on move element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.moveElement.classList).toContain('drag-draggable');
    });

    test('Grab element has the initial events', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement.onmousedown).not.toBeNull();
      expect(result.grabElement.ontouchstart).not.toBeNull();
    });
  });
});

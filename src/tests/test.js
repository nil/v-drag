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
  const valueAxis = { value: { axis: 'x' } };
  const valueAxisHandle = { value: { axis: 'x', handle: 'id' } };
  const valueAxisArg = { value: { axis: 'x' }, arg: 'y' };

  describe('Axis', () => {
    // 001
    test('Get axis from object', () => {
      const result = dragSetup(el, valueAxisHandle);
      expect(result.axis).toBe('x');
    })

    // 002
    test('Get axis from argument', () => {
      const result = dragSetup(el, valueArg);
      expect(result.axis).toBe('x');
    })

    // 003
    test('Get axis from object, not argument', () => {
      const result = dragSetup(el, valueAxisArg);
      expect(result.axis).toBe('x');
    })

    // 004
    test('Get axis from object, not argument', () => {
      const result = dragSetup(el, argOther);
      expect(result.axis).toBe('all');
    })
  });

  describe('Handle', () => {
    // 005
    test('Get handle from object', () => {
      const result = dragSetup(el, valueAxisHandle);
      expect(result.handle).toBe(elId.id);
    })

    // 006
    test('Get handle from value', () => {
      const result = dragSetup(el, valueArg);
      expect(result.handle).toBe(elId.id);
    })

    // 007
    test('Same element when undefined handle', () => {
      const result = dragSetup(el, valueUndefined);
      expect(result.grabElement).toBe(result.moveElement);
    })

    // 008
    test('Different element when defined handle', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement).not.toBe(result.moveElement);
    })

    // 009
    test('.drag-handle on grab element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement.classList).toContain('drag-handle');
    })

    // 010
    test('.drag-uses-handle on move element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.moveElement.classList).toContain('drag-uses-handle');
    })
  })

  describe('Other', () => {
    // 011
    test('.drag-draggable on move element', () => {
      const result = dragSetup(el, valueArg);
      expect(result.moveElement.classList).toContain('drag-draggable');
    })

    // 012
    test('Grab element has the initial events', () => {
      const result = dragSetup(el, valueArg);
      expect(result.grabElement.onmousedown).not.toBeNull();
      expect(result.grabElement.ontouchstart).not.toBeNull();
    })
  });
});

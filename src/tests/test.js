/* eslint-disable */

import {
  dragSetup
} from './index';

const el = document.createElement('div');


/*
 * Set up dragging
 */
 
describe('Set up dragging', () => {

  test('Empty directive', () => {
    const result = dragSetup(el, {});

    expect(result.grabElement).toBe(result.moveElement);
    expect(result.axis).toBe('all');
  });

  test('Axis shortcut', () => {
    const result = dragSetup(el, { arg: 'x'});

    expect(result.axis).toBe('x');
  });

  test('Axis object', () => {
    const result = dragSetup(el, { value: { axis: 'y'} });

    expect(result.axis).toBe('y');
  });
});

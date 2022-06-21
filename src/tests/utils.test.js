import isValidAxisValue from '../utils/isValidAxisValue';
import returnPositionString from '../utils/returnPositionString';
import getSnappingValues from '../utils/getSnappingValues';

describe('Utils', () => {
  describe('getSnappingValues', () => {
    test('Declare value with number', () => {
      expect(getSnappingValues(10)).toStrictEqual({ x: 10, y: 10 });
    });
    test('Declare value with number 0', () => {
      expect(getSnappingValues(0)).toStrictEqual({ x: 1, y: 1 });
    });
    test('Declare value with string, without units', () => {
      expect(getSnappingValues('10')).toStrictEqual({ x: 10, y: 10 });
    });
    test('Declare value with string, with units', () => {
      expect(getSnappingValues('10px')).toStrictEqual({ x: 10, y: 10 });
    });
    test('Declare value with empty string', () => {
      expect(getSnappingValues('')).toStrictEqual({ x: 1, y: 1 });
    });
    test('Declare value with array of numbers of length 1', () => {
      expect(getSnappingValues([10])).toStrictEqual({ x: 10, y: 10 });
    });
    test('Declare value with array of numbers of length 2', () => {
      expect(getSnappingValues([10, 20])).toStrictEqual({ x: 10, y: 20 });
    });
    test('Declare value with array of numbers of length 3', () => {
      expect(getSnappingValues([10, 20, 30])).toStrictEqual({ x: 10, y: 20 });
    });
    test('Declare value with empty array', () => {
      expect(getSnappingValues([])).toStrictEqual({ x: 1, y: 1 });
    });
    test('Declare value with array of strings of length 1', () => {
      expect(getSnappingValues(['10'])).toStrictEqual({ x: 10, y: 10 });
    });
    test('Declare value with array of strings of length 2', () => {
      expect(getSnappingValues(['10', '20px'])).toStrictEqual({ x: 10, y: 20 });
    });
    test('Declare value with array of strings of length 3', () => {
      expect(getSnappingValues(['10px', '20', '30px'])).toStrictEqual({ x: 10, y: 20 });
    });
    test('Declare value with object', () => {
      expect(getSnappingValues({ x: 10, y: '20' })).toStrictEqual({ x: 10, y: 20 });
    });
    test('Declare value with object missing one value', () => {
      expect(getSnappingValues({ x: '10px' })).toStrictEqual({ x: 10, y: 1 });
    });
    test('Declare value with empty object', () => {
      expect(getSnappingValues({})).toStrictEqual({ x: 1, y: 1 });
    });
    test("Declare value with boolean 'true'", () => {
      expect(getSnappingValues(true)).toStrictEqual({ x: 1, y: 1 });
    });
    test("Declare value with boolean 'false'", () => {
      expect(getSnappingValues(false)).toStrictEqual({ x: 1, y: 1 });
    });
    test('Empty declaration', () => {
      expect(getSnappingValues()).toStrictEqual({ x: 1, y: 1 });
    });
  });

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
      const data = ['1, 2, 3, 4,'];
      expect(returnPositionString(data, 20, 30)).toBe('matrix(1, 2, 3, 4, 20, 30)');
    });
    test('Return string when matrix is not defined', () => {
      const data = false;
      expect(returnPositionString(data, 20, 30)).toBe('matrix(1, 0, 0, 1, 20, 30)');
    });
  });
});

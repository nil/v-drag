import defaultOptions from './defaultOptions';

/**
 * Get all keys, even the deep ones, in an object
 * @param obj
 * @returns {string[]}
 */
export function objectDeepKeys(obj) {
  return Object.keys(obj)
    .filter((key) => obj[key] instanceof Object)
    .map((key) => objectDeepKeys(obj[key]).map((k) => k))
    .reduce((x, y) => x.concat(y), Object.keys(obj));
}

/**
 * Check if input is an object
 * @param input
 * @returns {boolean}
 */
export function isObject(input) {
  return (input && typeof input === 'object' && !Array.isArray(input));
}

/**
 * Deep merge two objects, throws error if there is
 * a key that is not availabe in `defaultOptions`
 *
 * @param target
 * @param ...sources
 */
export default function deepMerge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (source[key] instanceof HTMLElement) {
        Object.assign(target, { [key]: source[key] });
      } else if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else if (objectDeepKeys(defaultOptions).includes(key)) {
        Object.assign(target, { [key]: source[key] });
      } else {
        throw new Error(`"${key}" is not a valid option`);
      }
    }
  }

  return deepMerge(target, ...sources);
}

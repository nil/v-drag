// Shorthand for muliple events with the same function
export default function (types, func, state = 'add') {
  types.forEach((type) => {
    document[`${state}EventListener`](type, func, false);
  });
}

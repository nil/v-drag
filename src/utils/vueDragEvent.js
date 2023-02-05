// Creates an event handler that can be used in Vue code
export default function (el, action) {
  el.dispatchEvent(new Event(`v-drag-${action}`));
}

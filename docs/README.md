---
home: true

cta:
  primary:
    text: Get started
    link: /installation/
  secondary:
    text: Try it live
    link: /playground/

about: Draggable elements are a common UX pattern, specially on touch screens. But as a developer, you might know how challenging it is to apply it with JavaScript. Vue.js doesn’t help in this case, either. So to simplify things, v-drag was written. Its purpose is to quickly integrate and customize draggable elements on projects using Vue.js.

features:
- title: Axis
  icon: axis
  details: Restrict the movement of the element so that it can only follow the direction of either vertical or horizontal axis.
  docs: /options/axis.md
  playground: /

- title: Handle
  icon: handle
  details: Make the element move only when one or more specific objects are dragged, whether they are inside or outside.
  docs: /options/handle.md
  playground: /

---

```bash
npm install v-drag --save
```

```js
import drag from 'v-drag';

Vue.use(drag);
```

```vue
<div v-drag>Drag me!</div>
```

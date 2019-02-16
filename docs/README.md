---
home: true

cta:
  primary:
    text: Get started
    link: /installation.html
  secondary:
    text: Playground
    link: /playground.html

about: Draggable elements are a common UX pattern, specially on touch screens. But as a developer, you might know how challenging it is to apply it with JavaScript. Vue.js doesn’t help in this case, either. So to simplify things, v-drag was written. Its purpose is to quickly integrate and customize draggable objects on projects using Vue.js.

start:
  text: Go to installation
  link: /installation.html

features:
- title: Axis
  icon: axis
  details: Limit the movement of the element so it can only follow the direction of one of the two axis.
  link: /

- title: Handles
  icon: handle
  details: Prevent the element from being moved until it is dragged from at least one particular element.
  link: /

- title: Classes
  icon: style
  details: Automatically add modifiable classes to indicate the class of element and the dragging state.
  link: /
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

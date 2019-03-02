---
home: true

cta:
  primary:
    text: Empezar
    link: /es/installation.html
  secondary:
    text: Probar
    link: /es/playground.html

about: Algún texto en español

start:
  text: Go to installation
  link: /es/installation.html

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

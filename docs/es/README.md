---
home: true

cta:
  primary:
    text: Empezar
    link: /es/installation/
  secondary:
    text: Probar
    link: /es/playground/

about: Los elementos arrastrables son un patrón UX común, especialmente en pantallas táctiles. Pero como desarrollador, puede que sepas lo difícil que es aplicarlo con JavaScript. Además, Vue.js no ayuda en este caso. Así que para simplificarlo, v-drag fue escrito. Su propósito es que se pueda rápidamente integrar y personalizar elementos arrastrables en proyectos que usen Vue.js.

features:
- title: Axis
  icon: axis
  details: Restringe el movimiento del elemento para que únicamente pueda seguir la dirección del eje vertical o del horizontal.
  docs: /options/axis.md
  playground: /

- title: Tirador
  icon: handle
  details: Haz que el elemento solo pueda moverse al arrastrar a uno o más elementos concretos, estén situados dentro o fuera.
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
<div v-drag>¡Arrástrame!</div>
```

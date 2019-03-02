# Instalación

## Requisitos

... ?

## Instalar

Para descargar v-drag en un proyecto de [Node](), puedes usar un gestor de paquetes. [npm](), incluido por defecto con Node, y [Yarn]() son las opciones más populares.

Abre Terminal y ejecuta el comando del gestor de paquetes que tu prefieras:

```sh
yarn add v-drag
```

```sh
npm install v-drag --save
```

Después importa v-drag en cualquier archivo en el que planeas usarlo. Puedes usar tanto `import` como `require`:

```js
import drag from 'v-drag';
```

```js
const drag = require('v-drag').default;
```

> Fíjate que el segundo código incluye `.default` al final.

Finalmente, en el mismo archivo JS que el código anterior, llama a la directiva:

```js
Vue.use(drag);
```

## Usar

A partir de este momento, ya puedes usar v-drag. Añade el atributo `v-drag` a los elementos que quieras que sean arrastrables:

```vue
<div v-drag>¡Arrástrame!</div>
```

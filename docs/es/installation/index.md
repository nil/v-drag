---
title: 'Instalación'
summary: 'Una guía paso por paso de como incluir v-drag en tu proyecto y como empezar a usarlo.'
---

## Requisitos

...

## Instalar

Hay dos maneras distintas de instalar v-drag en tu proyecto. Un [gestor de paquetes](#metodo-1-gestor-de-paquetes) es más óptimo si estás trabajando con Node, mientras que la [etiqueta &lt;script&gt;](#metodo-2-etiqueta-script) es mejor para proyectos basados en el navegador.

### Método 1: Gestor de paquetes

El método más fácil y rápido para descargar v-drag en un proyecto de Node es usando un gestor de paquetes. npm, incluido por defecto con Node, y Yarn son las opciones más populares. Abre Terminal y ejecuta el comando del gestor de paquetes que prefieras:

```sh
yarn add v-drag
```

```sh
install v-drag --save
```

Después importa v-drag en el archivo principal de tu proyecto, o cualquier otro archivo en el que planeas usarlo. Puedes usar tanto `import` como `require`, aunque el primero es más recomendable al ser parte de la especificación ES6:

```js
import vdrag from 'v-drag';
```

```js
const vdrag = require('v-drag');
```

Finalmente, en el mismo archivo JS que el código anterior, llama a la directiva:

```js
Vue.use(vdrag);
```

::: warning Warning: Vue no está definido
Dependiendo del archivo donde hayas importado v-drag, puede que tengas un error diciendo que “Vue is not defined”. En tal caso, importa Vue en el mismo archivo usando la línea `import Vue from 'vue'` o `const Vue = require('vue')`.
:::

### Método 2: etiqueta &lt;script&gt;

Otro método de instalación, más apto para proyectos basados en el navegador, es importar v-drag usando la etiqueta `script` de HTML. Descarga el código fuente directamente de GitHub:

<div class="download-button__container">
  <DownloadButton name="Descomprimido" link="dist/browser.js" />
  <DownloadButton name="Minificado" link="dist/browser.min.js" />
</div>

v-drag también está disponible en [unpkg](https://unpkg.com/v-drag):

```html
<script src="https://unpkg.com/v-drag"></script>
```

## Usage

Sin importar el método que hayas usado, ya has completado la instalación de v-drag. Aún así, no hay ningún elemento que por defecto sea arrastrable. Para permitir la interacción del arrastre, v-drag utiliza una directiva personalizada. Añade el atributo `v-drag` al elemento que quieres hacer arrastrable:

```vue
<div v-drag>¡Arrástrame!</div>
```

<DemoContainer id="installation-01">
  <div class="drag" v-drag>¡Arrástrame!</div>
</DemoContainer>

Como se puede apreciar en la demostración anterior, este código proporciona una interacción de arrastre básica al elemento. Mira [todas las opciones](/options) que están disponibles para personalizar su comportamiento.

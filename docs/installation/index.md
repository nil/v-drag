# Installation

## Requisites

...

## Install

To download v-drag into a [Node]() project, you can use a package manager. [npm](), included by default with Node, and [Yarn]() are the most popular options.

Open Terminal and run the command from the package manager you prefer:

```sh
yarn add v-drag
```

```sh
npm install v-drag --save
```

Then import v-drag into any file you are planning to use it. You can use either `import` or `require`:

```js
import drag from 'v-drag';
```

```js
const drag = require('v-drag').default;
```

> Notice the require code includes `.default` at the end.

Finally, on the same JS file as the code above, call the directive:

```js
Vue.use(drag);
```

## Usage

From this moment on, you can use v-drag. Add the `v-drag` attribute to the elements you want to be draggable:

```vue
<div v-drag>Drag me!</div>
```

# v-drag

The simplest way to integrate drag on Vue.js.

Draggable elements are a common UX pattern, specially on touch screens. But as a developer, you might know how challenging it is to apply it with JavaScript. Vue.js doesn’t help in this case, either. So to simplify things, v-drag was written. Its aim is to quickly integrate and customize draggable elements on projects using Vue.js.

[![Build Status](https://travis-ci.org/nil/v-drag.svg?branch=master)](https://travis-ci.org/nil/v-drag)
[![Version](https://img.shields.io/npm/v/v-drag.svg)](https://www.npmjs.com/package/v-drag)
[![License](https://img.shields.io/npm/l/v-drag.svg)](https://github.com/nil/v-drag/blob/master/LICENSE)

## Installation

```sh
npm install v-drag --save
```

v-drag’s source code is also available [uncompressed](https://raw.githubusercontent.com/nil/v-drag/master/src/index.js) and [minified](https://raw.githubusercontent.com/nil/v-drag/master/src/index.min.js).

## Usage

Import v-drag into any file you are planning to use it. You can use either import or require, although the first one is recommended as it’s part of the ES6 spec:

```js
import drag from "v-drag"
```

```js
const drag = require("v-drag");
```

Then call the v-drag plugin:

```js
Vue.use(drag);
```

No extra setup is necessary at this point. Add the `v-drag` attribute to any element to make it draggable:

```html
<div v-drag>Drag me!</div>
```

## Options

The default behavior for any element with the `v-drag` attribute is to be draggable in any direction and without a handle. However, this can be changed using any or multiple of these options:

### Axis

Constrains the element to move only in one direction: horizontal or vertical.

```html
<div v-drag:x>Horizontal</div>
```

This argument can’t be declared dynamically. So, if you want ot use the `data` object, computed values, props,… you have to use [an object](https://github.com/nil/v-drag#object).

**Values**

- `x`: horizontal movement
- `y`: vertical movement

### Handle

Informs that the element can only be dragged using another element, known as handle. It’s not necessary for the handle to be located inside the draggable element.

```html
<div v-drag="'element'">
  <div id="element">Handle</div>
</div>
```

**Values**

Handle’s name has to be a string. It can be declared inline, as in the example above (notice the two quotes), or using the `data` object, computed properties, methods, props,… Here’s an example using `data`:

```html
<div v-drag="sharedHandleId">Don’t drag me</div>
<div :id="sharedHandleId">Drag me</div>

…

data: {
  sharedHandleId: "handle"
}
```

## Object

If you want to dynamically declare the axis, or you don’t like the method to set both axis and handle, you can use an object:

```html
<div v-drag="{ handle: 'element', axis: 'y' }">
  <div id="element">Handle</div>
</div>
```

This can be declared inline, externally or a mixture of the two. There has to be at least one value and you don’t need to include all of them, only the ones you want.

**Values**

|  Value |  Type  |
|:------:|:------:|
| handle | string |
|  axis  | string |

## Event classes

v-drag uses CSS classes to add basic styling to the draggable elements. You can override one or multiple of the default classes when the plugin is called:

```js
Vue.use(drag, {
  eventClass: {
    down: "is-pressed",
    move: "is-moving"
  }
});
```

This are the default classes with its values:

| Name        | Default value      | Description                                  	|
|-------------|--------------------|----------------------------------------------	|
| `initial`   | `drag-draggable`   | The element is draggable                     	|
| `hasHandle` | `drag-uses-handle` | The element uses a handle                    	|
| `handle`    | `drag-handle`      | The element is the handle of another element 	|
| `down`      | `drag-down`        | The user has pressed the element             	|
| `move`      | `drag-move`        | The user has started to drag the element     	|

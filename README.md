# v-drag

The simplest way to integrate drag on Vue.js.

Draggable elements are a common UX pattern, specially on touch screens. But as a developer, you might know how challenging it is to apply it with JavaScript. So to simplify things, v-drag was written. Its aim is to quickly integrate and customize draggable elements on projects using Vue.js.

[![Build status](https://github.com/nil/v-drag/actions/workflows/build.yml/badge.svg)](https://github.com/nil/v-drag/actions/workflows/build.yml)
[![npm package](https://github.com/nil/v-drag/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/nil/v-drag/actions/workflows/npm-publish.yml)
[![Version](https://img.shields.io/npm/v/v-drag.svg)](https://www.npmjs.com/package/v-drag)
[![License](https://img.shields.io/npm/l/v-drag.svg)](https://github.com/nil/v-drag/blob/master/LICENSE)

## Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Options](#options)
    1. [Axis](#axis)
    2. [Snap](#snap)
    3. [Handle](#handle)
4. [Vue events](#vue-events)
5. [Global configuration](#global-configuration)
    1. [Event classes](#event-classes)
    2. [Remove transitions](#remove-transitions)

## Installation

```sh
npm install v-drag --save
```

v-drag’s source code is also available [uncompressed](https://raw.githubusercontent.com/nil/v-drag/master/src/index.js) and [minified](https://raw.githubusercontent.com/nil/v-drag/master/src/index.min.js).

## Usage

Import v-drag into any file you are planning to use it:

```js
import drag from "v-drag"
```

```js
const drag = require("v-drag");
```

Then call the v-drag plugin:

```js
Vue.use(drag, {
  // global configuration
});
```

No extra setup is necessary at this point. Add the `v-drag` attribute to any element to make it draggable:

```html
<div v-drag>Drag me!</div>
```

## Options

The default behavior for any element with the `v-drag` attribute is to be draggable in any direction and without a handle. However, this can be changed using an object or its equivalent shortcuts:

```html
<div v-drag="{ axis: 'x', handle: '#someElement' }">
  <div id="someElement">Handle</div>
</div>
```

Both the object and the values can be declared inline, as in the example above, or using the `data` object, computed properties, methods, props,…

### Axis

Constrains the element to move only in one direction: horizontal or vertical.

**Values**

- `all`: all directions `default`
- `x`: horizontal movement
- `y`: vertical movement

**Shortcut**

```html
<div v-drag:x>Horizontal</div>
```

### Snap
  
When dragging, the element will snap to the specified grid. You can use either a number or a string with units.

```html
<div v-drag="{snap: 100}">Drag me in 100px increments</div>
```

Using an array, different values can be declared for each axis:

```html
<div vdrag="{snap: [10, 50]}">
  Horizontal: 10px
  Vertical: 50px
</div>
```

### Handle

Informs that the element can only be dragged using another element, known as handle. It’s not necessary for the handle to be located inside the draggable element, and each element can have more than one handle.

**Values**

Handle’s name must be a selector (the same used to refer to the element in CSS) or a Ref.

**Shortcut**

```html
<div v-drag="'.someElement'">Don’t drag me</div>
<div class="someElement">Drag me</div>
```

**Ref**

To define handles using Refs, you must first set its value in `data` and replace it after the component is mounted:

```html
<template>
  <div v-drag="{handle}">
    Drag me using handle
    <div ref="drag-handle">Handle</div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      handle: undefined,
    }
  },

  mounted() {
    this.$data.handle = this.$refs.dragHandle
  }
};

</script>
```

## Vue events

These events are emitted when the user makes the corresponding action.

```html
<div v-drag @v-drag-end="someFunction()">
  Event on end
</div>
```

| Event                   | Description                                                                |
|-------------------------|----------------------------------------------------------------------------|
| `@v-drag-setup`         | The component has completed the initial setup                              |
| `@v-drag-start`         | The user has pressed the draggable element and its mouse or finger is down |
| `@v-drag-moving`        | The user is moving the mouse or finger                                     |
| `@v-drag-end`           | The user has released its mouse or finger                                  |
| `@v-drag-update`        | Changes in the configuration of the draggable options                      |
| `@v-drag-axis-update`   | The axis has been updated                                                  |
| `@v-drag-handle-update` | The handle has been updated                                                |

## Global configuration

### Event classes

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

### Remove transitions

By default, v-drag removes all transition animations to keep the dragging as smooth as possible. However, if you want to enable them, you can:

```js
Vue.use(drag, {
  removeTransition: false // default: `true`
});
```

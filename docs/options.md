# Options

Modifying the behavior of the draggable element is one of the bases of v-drag. Currently there are two possibilities: the axis of movement and the handle. This options are declared with an object as the `v-drag` attribute value:

```vue
v-drag="{ ... }"
```

> Since v-drag is based on Vue, the object can also be declared with reactive properties. The same happens with the values of the object.

Read [the shortcuts section]() to learn more about a faster, but less optimal, way to configure its behavior.

## Axis

Declaring an axis constrains the element to move only in one direction, either horizontal or vertical.

```vue
<div v-drag="{ axis: 'x' }">Horizontal</div>
```

### Values

The axis has only two possible values:

| Value|Description|
|------|------|
|`x`|Horizontal movement|
|`y`|Veritcal movement|

## Handle

This option informs that the element can only be dragged using another element, known as handle. Each draggable element can have more than one handles, which can be inside or outside the draggable element.

```vue
<div v-drag="{ handle: '#element' }">
  <div id="element">Handle</div>
</div>
```

### Values

The value must be a valid selector, meaning there must be at least one element with that selector (ID, class, attribute,…).

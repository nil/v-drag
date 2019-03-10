# Handle

This option informs that the element can only be dragged using another element, known as handle. Each draggable element can have more than one handles, which can be inside or outside the draggable element.

```vue
<div v-drag="{ handle: '#element' }">
  <div id="element">Handle</div>
</div>
```

## Values

The value must be a valid selector, meaning there must be at least one element with that selector (ID, class, attribute,…).

## Shortcut

...

---
title: 'Axis'
summary: 'Declaring an axis contains the element to move only in one direction, either horizontal or vertical.'
---

## Syntax

Use the standard option syntax to declare the axis and lock the element to move only in the value of the string you give:

```vue
<div v-drag="{ axis: 'x' }">Horizontal</div>
```

<DemoContainer id="axis-01">
  <DragPill axis="x" />
</DemoContainer>

## Values

The axis has only two possible values:

|Value|Description|Demo|
|------|------|------|
|`x`|Horizontal movement|<DragPill axis="x" />|
|`y`|Veritcal movement|<DragPill axis="y" />|

## Shortcut

...

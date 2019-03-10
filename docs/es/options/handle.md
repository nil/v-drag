# Tirador

Esta opción informa que el elemento sólo se puede arrastrar mediante otro elemento, conocido como tirador (handle en inglés). Cada elemento arrastrable puede tener más de un tirador, los cuales pueden estar dentro o fuera del elemento arrastrable.

```vue
<div v-drag="{ handle: '#elemento' }">
  <div id="elemento">Tirador</div>
</div>
```

## Valores

El valor debe ser un selector valido, es decir, debe haber como mínimo un elemento con este selector (ID, clase, atributo,…).

## Atajos

...

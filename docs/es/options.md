# Opciones

La modificación el comportamiento del elemento arrastrable es uno de los fundamentos de v-drag. Actualmente hay dos posibilidades: el eje de movimiento y el tirador. Estas opciones se declaran con objeto como valor del atributo `v-drag`:

```vue
v-drag="{ ... }"
```

> Como v-drag esta basado en Vue, el objeto también se puede declarar con propiedades reactivas. Lo mismo pasa con los valores del objeto.

Lee [la sección de atajos]() para saber más sobre una forma más rápida, pero menos óptima, de configurar el comportamiento.

## Eje

Declarar un eje limita al elemento a moverse sólo en una dirección, ya sea horizontal o vertical.


```vue
<div v-drag="{ axis: 'x' }">Horizontal</div>
```

### Valores

El eje tiene únicamente dos valores posibles:

| Valor |Descripción|
|------|------|
|`x`|Movimiento horizontal|
|`y`|Movimiento veritcal|

## Tirador

Esta opción informa que el elemento sólo se puede arrastrar mediante otro elemento, conocido como tirador (handle en inglés). Cada elemento arrastrable puede tener más de un tirador, los cuales pueden estar dentro o fuera del elemento arrastrable.

```vue
<div v-drag="{ handle: '#elemento' }">
  <div id="elemento">Tirador</div>
</div>
```

### Valores

El valor debe ser un selector valido, es decir, debe haber como mínimo un elemento con este selector (ID, clase, atributo,…).

<!-- eslint-disable max-len -->
<template>
  <div
    ref="element"
    v-drag="{ axis: dragDirection }"
    :style="{ left: `${position[0]}px`, top: `${position[1]}px` }"
    class="absolute flex w-[176px] h-[72px] rounded bg-sky-50/20 bg-blur border border-white shadow-md text-sky-600"
  >
    <IconDragX v-if="dragDirection === 'x'" class="m-auto" />
    <IconDragY v-else-if="dragDirection === 'y'" class="m-auto" />
    <IconDragAll v-else class="m-auto" />
  </div>
</template>

<script>

import IconDragAll from '@carbon/icons-vue/es/move/24';
import IconDragX from '@carbon/icons-vue/es/pan--horizontal/24';
import IconDragY from '@carbon/icons-vue/es/pan--vertical/24';

export default {
  name: 'HeaderLink',

  components: {
    IconDragAll,
    IconDragX,
    IconDragY,
  },

  props: {
    position: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    dragDirection() {
      const possibleValues = ['x', 'y', 'all'];

      return possibleValues[Math.floor(Math.random() * possibleValues.length)];
    },
  },
};

</script>

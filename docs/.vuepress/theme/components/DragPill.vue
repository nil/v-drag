<template>
  <div class="drag-pill" v-drag="{ axis: this.axis, handle: `#${this.handleId}` }">
    <IconHandDrag v-if="!this.handle" :axis="axis" />
    <div v-else :id="handleId">
      <IconHandDrag :axis="axis" />
    </div>
  </div>
</template>

<script>

import IconHandDrag from '@theme/components/icons/IconHandDrag.vue';

export default {
  components: {
    IconHandDrag
  },

  props: {
    axis: [String, Boolean],
    handle: Boolean
  },

  computed: {
    handleId() {
      return this.handle ? `handle-${Math.floor(Math.random() * 65535).toString(16)}` : false;
    }
  }
}

</script>

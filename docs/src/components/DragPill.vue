<template>
  <div class="drag-pill" v-drag="{ axis: this.axis, handle: `#${this.handleId}` }">
    <DragHand v-if="!this.handle" :axis="axis" />
    <div v-else :id="handleId">
      <DragHand :axis="axis" />
    </div>
  </div>
</template>

<script>

import DragHand from './DragHand.vue';

export default {
  name: 'DragPill',

  components: {
    DragHand
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
};

</script>

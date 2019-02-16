<template>
  <div class="pill" :class="{ 'axis-x': axisX, 'axis-y': axisY }"
    v-drag="{ axis: this.axis, handle: `#${handleId}` }">
      <DragHand v-if="handleFalse" :axis="axis" />
      <div :id="handleId" v-else>
        <DragHand :axis="axis" />
      </div>
    </div>
</template>

<script>

import DragHand from './DragHand.vue';

export default {
  components: {
    DragHand
  },

  props: {
    axis: String,
    handle: String
  },

  computed: {
    axisAll() {
      return this.aixs === undefined || this.axis === 'all';
    },
    axisX() {
      return this.axis === 'x'
    },
    axisY() {
      return this.axis === 'y'
    },
    handleTrue() {
      return this.handle === 'true';
    },
    handleFalse() {
      return this.handle !== 'true';
    },
    handleId() {
      const random = `handle-${Math.floor(Math.random() * 65535).toString(16)}`;

      return this.handleTrue ? random : false;
    }
  }
}

</script>

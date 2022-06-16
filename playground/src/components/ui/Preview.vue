<template>
  <div class="flex flex-1 h-screen bg-gray-400">
    <div v-drag="dragConfig" class="flex w-4xl max-w-[75%] h-2xl max-h-[75%] m-auto bg-white rounded-lg shadow-lg">
      <h2 class="m-auto text-l">
        drag me!
      </h2>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Preview',

  computed: {
    dragConfig() {
      return {
        axis: this.$store.state.axis,
      };
    },
  },
};

</script>

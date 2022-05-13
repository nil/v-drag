<template>
  <div v-drag class="flex grow justify-center items-center w-24 h-24 p-4 bg-white text-4xl rounded-md shadow-md">
    {{ icon }}
  </div>
</template>

<script>

export default {
  name: 'Pill',

  props: {
    icon: {
      type: String,
      default: '',
    },
  },

  computed: {
    unicodeValue() {
      return this.icon ? `&x${this.icon}` : '';
    },
  },
};

</script>

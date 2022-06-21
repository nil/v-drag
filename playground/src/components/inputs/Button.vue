<template>
  <button
    type="button"
    :class="[
      'h-m bg-white border border-slate-200 shadow',
      `${$store.state[property] === value ? activeStyles : 'hover:bg-slate-100'}`,
    ]"
    @click="$store.commit('updateValue', { property, value })"
  >
    {{ label }}
  </button>
</template>

<script>

export default {
  name: 'Button',

  props: {
    label: String,
    icon: String,
    property: String,
    value: String,
  },

  computed: {
    activeStyles() {
      return 'bg-lime-200 border-lime-400 text-green-900 fill-green-900 shadow-accent';
    },
  },
};

</script>

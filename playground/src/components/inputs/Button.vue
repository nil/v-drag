<template>
  <button
    type="button"
    :class="{'active': $store.state[property] === value}"
    @click="$store.commit('updateValue', { property, value })"
  >
    {{ label }}
  </button>
</template>

<script>

export default {
  name: 'Button',

  props: {
    label: {
      type: String,
      default: 'label',
      required: false,
    },
    icon: {
      type: String,
      default: 'icon',
      required: false,
    },
    property: {
      type: String,
      default: 'property',
    },
    value: {
      type: String,
      default: 'value',
    },
  },
};

</script>

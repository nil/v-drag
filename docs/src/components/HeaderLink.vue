<template>
  <a
    :href="href"
    target="_blank"
    class="group hover:text-emerald-400"
  >
    <slot />
    <span
      class="ml-2xs align-middle text-gray-300 group-hover:text-current transition"
    >{{ label }}</span>
  </a>
</template>

<script>

export default {
  name: 'HeaderLink',

  props: {
    href: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
};

</script>

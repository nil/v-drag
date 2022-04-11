<template>
  <a
    :href="href"
    target="_blank"
    class="group flex justify-center fw-full sm:min-w-[232px] py-xs px-s align-center bg-white text-sky-700 rounded-full shadow hover:text-slate-900 hover:shadow-lg hover:-translate-y-1"
  >
    <div class="inline-block text-sky-800 group-hover:text-slate-900">
      <slot />
    </div>

    <span class="mt-[2px] ml-xs leading-tight">
      {{ label }}<span v-if="small" class="ml-[4px] text-xs text-slate-500 group-hover:text-slate-900">{{ small }}</span>
    </span>
  </a>
</template>

<script>

export default {
  name: 'Button',

  props: {
    href: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    small: {
      type: String,
      default: '',
    },
  },
};

</script>

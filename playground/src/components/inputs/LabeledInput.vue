<template>
  <div class="grid grid-cols-12">
    <h1 class="col-span-full mb-2xs text-m font-bold">
      {{ label }}
    </h1>
    <slot />
  </div>
</template>

<script>

export default {
  name: 'LabeledInput',

  props: {
    label: String,
  },
};

</script>

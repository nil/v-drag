<template>
  <div class="grid col-span-full grid-cols-12">
    <Button
      v-for="(value, i) in values"
      :key="value"
      :label="value"
      :property="property"
      :value="value"
      :class="[
        'block px-[1px]',
        `col-span-${Math.ceil(12 / values.length)}`,
        { 'rounded-l': i === 0,
          'rounded-r': i === values.length - 1,
          'border-r-0 pl-0': noBorder(i, 'right'),
          'border-l-0 pr-0': noBorder(i, 'left'),
        }
      ]"
    />
  </div>
</template>

<script>

import Button from './Button.vue';

export default {
  name: 'SegmentedControl',

  components: {
    Button,
  },

  props: {
    property: String,
    values: Array,
  },

  methods: {
    // Returns whether the button should have a border on the left or right,
    // this is done to avoid repeating borders and to make the active button
    // always have a border on every side
    noBorder(i, side) {
      const { property, values } = this.$props;
      const activeIndex = values.indexOf(this.$store.state[property]);

      if (i === activeIndex) {
        return false;
      }

      if (side === 'left') {
        return i === activeIndex + 1;
      }

      // if side === 'right'
      return i !== values.length - 1;
    },
  },

};

/*
  Keeping this here as right now Tailwind
  doesn't recognise dynamically-generated classes

  col-span-1, col-span-2, col-span-3, col-span-4, col-span-5, col-span-6,
  col-span-7, col-span-8, col-span-9, col-span-10, col-span-11, col-span-12
*/

</script>

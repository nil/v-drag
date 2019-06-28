<template>
  <IconFeatureAxis v-if="icon === 'axis'" />
  <IconFeatureHandle v-else-if="icon === 'handle'" />
</template>

<script>

import IconFeatureAxis from '@theme/icons/IconFeatureAxis.vue';
import IconFeatureHandle from '@theme/icons/IconFeatureHandle.vue';

export default {
  components: {
    IconFeatureAxis,
    IconFeatureHandle
  },

  props: {
    icon: String
  }
};

</script>

<template>
  <IconFeatureAxis v-if="icon === 'axis'" />
  <IconFeatureHandle v-else-if="icon === 'handle'" />
</template>

<script>

import IconFeatureAxis from '@theme/components/icons/IconFeatureAxis.vue';
import IconFeatureHandle from '@theme/components/icons/IconFeatureHandle.vue';

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

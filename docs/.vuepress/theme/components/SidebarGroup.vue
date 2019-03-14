<template>
  <div class="sidebar--group">
    <p
      class="sidebar--heading"
      :class="[
        { open },
        `sidebar--level_${level}`
      ]"
      style="margin-bottom: 0"
    >
      <Link v-if="item.link" :item="{
        link: item.link,
        text: item.title
      }" />
      <span v-else>{{ item.title }}!!!</span>
    </p>

    <SidebarLinks :items="item.children" :level="level + 1" />
  </div>
</template>

<script>

import Link from '@theme/components/Link.vue';
import SidebarLinks from '@theme/components/SidebarLinks.vue';

import { isActive } from '../js/utils';

export default {
  components: {
    Link,
    SidebarLinks
  },

  props: {
    item: Object,
    level: Number
  },

  data() {
    return {
      open: true
    };
  },

  methods: {
    isActive
  }
};

</script>

<template>
  <section class="sidebar"
    :class="{ open: isSidebarOpen }">
    <div class="sidebar--mask" @click="$emit('toggle-sidebar')"></div>

    <aside class="sidebar--panel">
      <MenuPrimary :navbar="false" class="show--xs" />

      <div class="sidebar--links" v-if="items.length">
        <template v-for="item in items">
          <SidebarGroup v-if="item.type === 'group'" :item="item" :level="0" />
          <SidebarLinks v-else :items="[item]" :level="0" />
        </template>
      </div>
    </aside>
  </section>
</template>

<script>

import MenuPrimary from '@theme/components/MenuPrimary.vue';
import SidebarLinks from '@theme/components/SidebarLinks.vue';
import SidebarGroup from '@theme/components/SidebarGroup.vue';

export default {
  components: {
    SidebarLinks,
    SidebarGroup,
    MenuPrimary
  },

  props: {
    items: Array,
    state: Boolean
  },

  computed: {
    isSidebarOpen() {
      return this.state;
    }
  }
};

</script>

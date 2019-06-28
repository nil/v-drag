<template>
  <section class="sidebar">
    <div class="sidebar__mask"
      :class="{ 'sidebar__mask--active': isSidebarOpen }"
      @click="$emit('toggle-sidebar')">
    </div>

    <aside class="sidebar__panel"
      :class="{
        'sidebar__panel--open': isSidebarOpen,
        'sidebar__panel--hidden': !show
      }">

      <div class="sidebar__menu u-show--900" >
        <MenuPrimary :navbar="false" />
        <SidebarGroup :item="localePickerList" />
      </div>

      <slot name="top" />

      <div class="sidebar__links" v-if="items.length">
        <template v-for="item in items">
          <Link v-if="item.type === 'link'"
            class="sidebar__link sidebar__link--level-0"
            :item="item" />

          <SidebarGroup v-else :item="item" />
        </template>
      </div>

      <slot name="bottom" />
    </aside>
  </section>
</template>

<script>

import Link from '@theme/components/Link.vue';
import MenuPrimary from '@theme/components/MenuPrimary.vue';
import SidebarGroup from '@theme/components/SidebarGroup.vue';

import getLocaleList from '@theme/js/getLocaleList';

export default {
  components: {
    Link,
    SidebarGroup,
    MenuPrimary
  },

  props: {
    items: Array,
    state: Boolean,
    show: Boolean
  },

  computed: {
    isSidebarOpen() {
      return this.state;
    },

    localePickerList() {
      return {
        type: 'group',
        text: this.$themeLocaleConfig.localePickerLabel,
        children: getLocaleList.call(this)
      };
    }
  }
};

</script>

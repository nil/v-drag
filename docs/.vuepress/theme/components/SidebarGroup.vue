<template>
  <div class="sidebar__group"
  :class="{ 'sidebar__group--closed': !isGroupOpen }">
    <div class="sidebar__heading">
      <div class="sidebar__arrow" @click="toggleDropdown()">
        <IconSidebarArrow />
      </div>
      <Link class="sidebar__title sidebar__link"
        @click.native="updateSidebarGroup()"
        ref="sidebarGroupTitle"
        :item="item" />
    </div>
    <div class="sidebar__dropdown"
      ref="sidebarDropdown"
      :style="{ maxHeight: currentHeight }">
      <template v-for="link in item.children">
        <Link class="sidebar__link sidebar__link--level-1"
          @click.native="updateSidebarGroup()"
          :item="link"/>

        <div class="sidebar--headers"
          v-if="isPageActive(link)"
          :key="link.link">
          <Link class="sidebar__link sidebar__link--level-2"
            @click.native="updateSidebarGroup()"
            v-for="child in link.headers"
            :item="child" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>

import Link from '@theme/components/Link.vue';
import IconSidebarArrow from '@theme/components/icons/IconSidebarArrow';

export default {
  components: {
    Link,
    IconSidebarArrow
  },

  props: {
    item: Object
  },

  data() {
    return {
      isGroupOpen: true,
      dropdownHeight: null
    };
  },

  mounted() {
    this.setUpGroup();
    this.isGroupOpen = this.$refs.sidebarGroupTitle.$el.classList.contains('router-link-active');
  },

  computed: {
    currentHeight() {
      return this.isGroupOpen ? `${this.dropdownHeight}px` : '0';
    }
  },

  methods: {
    isPageActive(page) {
      return page.headers && this.$page.path === page.link;
    },

    setUpGroup() {
      this.isGroupOpen = true;
      this.dropdownHeight = this.$refs.sidebarDropdown.offsetHeight;
    },

    toggleDropdown() {
      this.isGroupOpen = !this.isGroupOpen;
    },

    updateSidebarGroup() {
      this.$refs.sidebarDropdown.style.removeProperty('max-height');
      this.setUpGroup();
      this.isGroupOpen = true;
    }
  }
};

</script>

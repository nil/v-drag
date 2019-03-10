<template>
  <div class="theme-container"
    :class="{ 'sidebar-open': isSidebarOpen }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <Sidebar
      :items="sidebarItems"
      :state="isSidebarOpen"
      @toggle-sidebar="toggleSidebar(false)"
    />

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <slot name="page-top" slot="top" />
      <slot name="page-bottom" slot="bottom" />
    </Page>
  </div>
</template>

<script>

import Vue from 'vue';

import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';

import Page from './Page.vue';
import Home from './Home.vue';

import drag from '../../../../dist/main';
import resolveSidebarItems from '../js/resolveSidebarItems';

import '@theme/css/main.pcss';

Vue.use(drag);

export default {
  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    shouldShowNavbar() {
      return this.$page.frontmatter.navbar !== false;
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    }
  }
};

</script>

<style>
body {
  margin-top: 100px;
}
</style>

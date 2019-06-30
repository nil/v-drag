<template>
  <div class="site"
    :class="{
      'has-sidebar': shouldShowSidebar,
      'no-sidebar': !shouldShowSidebar
    }"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd">

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <Sidebar
      :items="sidebarItems"
      :state="isSidebarOpen"
      :show="shouldShowSidebar"
      @toggle-sidebar="toggleSidebar(false)">
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else
      :sidebar="sidebarItems"
      :showNav="shouldShowSidebar">
      <slot name="page-top" slot="top" />
      <slot name="page-bottom" slot="bottom" />
    </Page>
  </div>
</template>

<script>

import Navbar from '@theme/components/Navbar.vue';
import Sidebar from '@theme/components/Sidebar.vue';

import Page from '@theme/layouts/Page.vue';
import Home from '@theme/layouts/Home.vue';

import resolveSidebarItems from '@theme/js/resolveSidebarItems';

import drag from '../../../../dist/main';

import '@theme/css/main.pcss';

// Vue.use(drag);

export default {
  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },

  directives: {
    drag
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
      return (
        !this.$frontmatter.home
        && this.$frontmatter.sidebar !== false
      );
    },

    sidebarItems() {
      return resolveSidebarItems.call(this);
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

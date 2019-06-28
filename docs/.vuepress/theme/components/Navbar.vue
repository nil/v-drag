<template>
  <header class="navbar">
    <button class="navbar__button u-show--900" @click="$emit('toggle-sidebar')">
      <IconSidebar />
    </button>

    <Link class="navbar__logo"
      :class="{ 'u-show--900': isPageHome }"
      :item="homeLink" />

    <div class="navbar__wrapper"
      :class="{ 'navbar--home': isPageHome, 'navbar--docs': !isPageHome }">
      <MenuPrimary :navbar="true" class="u-hide--900" />
      <MenuSecondary />
    </div>
  </header>
</template>

<script>

import Link from '@theme/components/Link.vue';
import MenuPrimary from '@theme/components/MenuPrimary.vue';
import MenuSecondary from '@theme/components/MenuSecondary.vue';

import IconSidebar from '@theme/icons/IconSidebar.vue';

export default {
  components: {
    Link,
    MenuPrimary,
    MenuSecondary,
    IconSidebar
  },

  data() {
    return {
      isSearchBoxOpen: false
    };
  },

  computed: {
    isPageHome() {
      return this.$localePath === this.$page.path;
    },

    homeLink() {
      return {
        text: this.$siteTitle,
        link: this.$localePath
      };
    }
  }
};

</script>

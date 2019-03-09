<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <button class="navbar--button" @click="$emit('toggle-sidebar')">
        <IconSidebar />
      </button>

      <Link class="navbar--logo" :item="homeLink" />

      <NavbarMenu :locales="false" class="hide--xs" />

      <SearchBox />

      <NavbarLinks />
    </div>
  </header>
</template>

<script>

import Link from '@theme/components/Link.vue';
import NavbarLinks from '@theme/components/NavbarLinks.vue';
import NavbarMenu from '@theme/components/NavbarMenu.vue';
import SearchBox from '@theme/components/SearchBox.vue';

import IconSidebar from '@theme/components/icons/IconSidebar.vue';

export default {
  components: {
    Link,
    NavbarLinks,
    NavbarMenu,
    SearchBox,
    IconSidebar
  },

  computed: {
    homeLink() {
      return {
        text: this.$siteTitle,
        link: this.$localePath
      }
    }
  }
}

</script>

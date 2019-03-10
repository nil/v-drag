<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <button class="navbar--button show--xs" @click="$emit('toggle-sidebar')">
        <IconSidebar />
      </button>

      <Link class="navbar--logo" :item="homeLink" />

      <MenuPrimary :navbar="true" class="hide--xs" />

      <SearchBox />

      <MenuSecondary />
    </div>
  </header>
</template>

<script>

import Link from '@theme/components/Link.vue';
import MenuPrimary from '@theme/components/MenuPrimary.vue';
import MenuSecondary from '@theme/components/MenuSecondary.vue';
import SearchBox from '@theme/components/SearchBox.vue';

import IconSidebar from '@theme/components/icons/IconSidebar.vue';

export default {
  components: {
    Link,
    MenuSecondary,
    MenuPrimary,
    SearchBox,
    IconSidebar
  },

  computed: {
    homeLink() {
      return {
        text: this.$siteTitle,
        link: this.$localePath
      };
    }
  }
};

</script>

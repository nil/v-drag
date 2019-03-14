<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <button class="navbar--button show--xs" @click="$emit('toggle-sidebar')">
        <IconSidebar />
      </button>

      <Link class="navbar--logo" :item="homeLink" />

      <MenuPrimary :navbar="true" class="hide--xs" />

      <SearchBox />

      <nav class="menu-secondary">
        <Link :item="releasesLink" class="menu-secondary--link hide--m" />
        <LocalePicker />
        <Link :item="repoLink" class="menu-secondary--link"><IconGithub /></Link>
      </nav>
    </div>
  </header>
</template>

<script>

import Link from '@theme/components/Link.vue';
import MenuPrimary from '@theme/components/MenuPrimary.vue';
import SearchBox from '@theme/components/SearchBox.vue';
import LocalePicker from '@theme/components/LocalePicker.vue';

import IconGithub from '@theme/components/icons/IconGithub.vue';
import IconSidebar from '@theme/components/icons/IconSidebar.vue';

import info from '../../../../package.json';

export default {
  components: {
    Link,
    MenuPrimary,
    SearchBox,
    LocalePicker,
    IconGithub,
    IconSidebar
  },

  computed: {
    homeLink() {
      return {
        text: this.$siteTitle,
        link: this.$localePath
      };
    },

    releasesLink() {
      return {
        text: `v${info.version}`,
        link: `${info.homepage}/releases`
      };
    },

    repoLink() {
      return {
        link: info.homepage
      };
    }
  }
};

</script>

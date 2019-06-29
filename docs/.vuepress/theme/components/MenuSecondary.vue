<template>
  <nav class="menu-secondary">
    <Link :item="releasesLink" class="menu-secondary__icon menu-secondary__version" />
    <SearchBox />
    <LocalePicker class="u-hide--700" />
    <Link :item="repoLink" class="menu-secondary__icon"><IconGithub /></Link>
  </nav>
</template>

<script>

import Link from '@theme/components/Link.vue';
import SearchBox from '@theme/components/SearchBox.vue';
import LocalePicker from '@theme/components/LocalePicker.vue';

import IconGithub from '@theme/icons/IconGithub.vue';

import pkg from '../../../../package.json';

export default {
  components: {
    Link,
    SearchBox,
    LocalePicker,
    IconGithub
  },

  computed: {
    releasesLink() {
      return {
        text: `v${pkg.version}`,
        link: `${pkg.homepage}/releases`
      };
    },

    repoLink() {
      return {
        link: pkg.homepage
      };
    }
  }
};

</script>

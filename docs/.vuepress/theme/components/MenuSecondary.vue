<template>
  <nav class="menu-secondary">
    <Link :item="releasesLink" class="menu-secondary--link hide--m" />
    <LocalePicker class="hide--xs" />
    <Link :item="repoLink" class="menu-secondary--link"><IconGithub /></Link>
  </nav>
</template>

<script>

import Link from '@theme/components/Link.vue';
import LocalePicker from '@theme/components/LocalePicker.vue';

import info from '../../../../package.json';
import IconGithub from './icons/IconGithub.vue';

export default {
  components: {
    Link,
    LocalePicker,
    IconGithub
  },

  computed: {
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

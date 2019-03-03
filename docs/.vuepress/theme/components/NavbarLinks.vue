<template>
  <nav class="navbar--links">
    <Link :item="releasesLink" class="navbar--link" />
    <LocalePicker class="can-hide" />
    <Link :item="repoLink" class="navbar--link"><IconGithub /></Link>
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
      }
    },

    repoLink() {
      return {
        link: info.homepage
      }
    }
  }
}

</script>

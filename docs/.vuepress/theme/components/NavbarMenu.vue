<template>
  <nav class="navbar--navigation" v-if="navLinks.length">
    <template v-for="item in navLinks">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <Link v-else :item="item" />
    </template>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import Link from '@theme/components/Link.vue'

import getLocaleList from '@theme/js/getLocaleList';

export default {
  components: {
    Link,
    DropdownLink
  },

  props: {
    locales: Boolean
  },

  computed: {
    navItems () {
      const userNav = this.$themeLocaleConfig.nav || [];

      if (this.locales) {
        return [...userNav, {
          text: this.$themeLocaleConfig.localePickerLabel,
          items: getLocaleList.call(this)
        }];
      }

      return userNav;
    },

    navLinks () {
      return (this.navItems || []).map(item => {
        item.type = (!item.type && item.items && item.items.length) ? 'links' : 'link';
        return item;
      })
    }
  }
}

</script>

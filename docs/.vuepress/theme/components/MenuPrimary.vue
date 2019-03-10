<template>
  <nav v-if="navLinks.length"
    :class="{
      'menu-primary--navbar': navbar,
      'menu-primary--sidebar': !navbar
    }">
    <template v-for="item in navLinks">
      <Dropdown v-if="item.type === 'links'" :item="item" />
      <Link v-else :item="item" class="menu-primary--link" />
    </template>
  </nav>
</template>

<script>
import Dropdown from '@theme/components/Dropdown.vue';
import Link from '@theme/components/Link.vue';

import getLocaleList from '@theme/js/getLocaleList';

export default {
  components: {
    Link,
    Dropdown
  },

  props: {
    navbar: Boolean
  },

  computed: {
    navItems() {
      const userNav = this.$themeLocaleConfig.nav || [];

      if (!this.navbar) {
        return [...userNav, {
          text: this.$themeLocaleConfig.localePickerLabel,
          items: getLocaleList.call(this)
        }];
      }

      return userNav;
    },

    navLinks() {
      return (this.navItems || []).map((item) => {
        item.type = (!item.type && item.items && item.items.length) ? 'links' : 'link';
        return item;
      });
    }
  }
};

</script>

<template>
  <nav v-if="navLinks.length"
    :class="{
      'menu-primary--navbar': navbar,
      'menu-primary--sidebar': !navbar
    }">
    <template>
      <Link v-for="item in navLinks"
       :item="item"
       :class="[
        'menu-primary__link', {
          'menu-primary__link--navbar': navbar,
          'sidebar__link--level-0': !navbar,
          'sidebar__link': !navbar
        }
      ]" />
    </template>
  </nav>
</template>

<script>
import Link from '@theme/components/Link.vue';

export default {
  components: {
    Link
  },

  props: {
    navbar: Boolean
  },

  computed: {
    navLinks() {
      return (this.$themeLocaleConfig.nav || []).map((item) => {
        item.type = 'link';
        return item;
      });
    }
  }
};

</script>

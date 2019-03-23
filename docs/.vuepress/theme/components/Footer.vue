<template>
  <footer class="footer">
    <span class="footer--copyright">
      &copy; {{ new Date().getFullYear() }} Nil Vila.
    </span>
    <span class="footer--license">
      {{ $themeLocaleConfig.footerLicenseText }} <Link :item="licenseLink" />.
    </span>
    <IconPersonalLogo class="footer--logo" />
  </footer>
</template>

<script>

import Link from '@theme/components/Link.vue';
import IconPersonalLogo from '@theme/components/icons/IconPersonalLogo.vue';

export default {
  components: {
    Link,
    IconPersonalLogo
  },

  props: {
    items: Array
  },

  computed: {
    licenseLink() {
      return {
        text: this.$themeLocaleConfig.footerLicenseName,
        link: this.$themeLocaleConfig.footerLicenseLink
      };
    }
  }
};

</script>

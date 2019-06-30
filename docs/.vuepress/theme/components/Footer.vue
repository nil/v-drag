<template>
  <footer class="footer"
    :class="{ 'footer--page': page }">
    <span class="footer__copyright">
      &copy; {{ new Date().getFullYear() }} Nil Vila.
    </span>
    <span class="footer__license">
      {{ $themeLocaleConfig.footerLicenseText }} <Link :item="licenseLink" />.
    </span>
    <IconPersonalLogo class="footer__logo" />
  </footer>
</template>

<script>

import Link from '@theme/components/Link.vue';

import IconPersonalLogo from '@theme/icons/IconPersonalLogo.vue';

export default {
  components: {
    Link,
    IconPersonalLogo
  },

  props: {
    items: Array,
    page: Boolean
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

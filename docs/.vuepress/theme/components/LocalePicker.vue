<template>
  <div class="nav-links">
    <IconLocale />
    <div class="nav-item">
      <DropdownLink :item="localeList" />
    </div>
  </div>
</template>

<script>

import DropdownLink from '@theme/components/DropdownLink.vue'
import IconLocale from './icons/IconLocale.vue';

export default {
  name: 'LocalePicker',

  components: {
    DropdownLink,
    IconLocale
  },

  computed: {
    localeList() {
      const { locales } = this.$site
      const currentLink = this.$page.path
      const routes = this.$router.options.routes
      const themeLocales = this.$site.themeConfig.locales || {}
      const languageDropdown = {
        text: this.$themeLocaleConfig.selectText || 'Languages',
        items: Object.keys(locales).map(path => {
          const locale = locales[path]
          const localeName = this.$site.locales[path].name;
          let link
          // Stay on the current page
          if (locale.lang === this.$lang) {
            link = currentLink
          } else {
            // Try to stay on the same page
            link = currentLink.replace(this.$localeConfig.path, path)
            // fallback to homepage
            if (!routes.some(route => route.path === link)) {
              link = path
            }
          }
          return {
            text: localeName,
            link }
        })
      }

      console.log(languageDropdown);

      return languageDropdown;
      // return { text: 'Locale', type: 'links', items: [
      //   { text: 'Español', link: '/es/', type: 'link'},
      //   { text: 'English', link: '/', type: 'link'},
      //   { text: 'Français', link: '/fr/', type: 'link'}
      // ]}
    }
  }

}
</script>

<style>
svg.icon-locale {
  width: 24px;
  fill: red;
}
</style>

<template>
  <div class="locale-picker">
    <button class="locale-picker--button"
      @click="openDropdown(false)"
      @mouseenter="openDropdown(500)"
      :disabled="isDropdownOpen"
      ref="localePickerButton">
      <IconLocale />
    </button>

    <div class="locale-picker--dropdown"
      :class="{ active: isDropdownOpen }"
      @mouseleave="closeDropdown(300)"
      ref="localePickerDropdown">
      <Link v-for="locale in localeList" :item="locale" />
    </div>
  </div>
</template>

<script>

import DropdownLink from '@theme/components/DropdownLink.vue'
import Link from '@theme/components/Link.vue'
import IconLocale from './icons/IconLocale.vue';

export default {
  name: 'LocalePicker',

  components: {
    DropdownLink,
    Link,
    IconLocale
  },

  data() {
    return {
      isDropdownOpen: false
    }
  },

  computed: {
    localeList() {
      const { locales } = this.$site;
      const currentLink = this.$page.path;
      const routes = this.$router.options.routes;

      // List of locales and links
      return Object.keys(locales).map(path => {
        const localeInfo = locales[path];
        const localeName = this.$site.locales[path].name;
        let localeLink;

        // Stay on the same page
        if (localeInfo.lang === this.$lang) {
          localeLink = currentLink;
        } else {
          // Change the language of the page
          localeLink = currentLink.replace(this.$localeConfig.path, path);

          // Fallback to homepage
          if (!routes.some(route => route.path === localeLink)) {
            localeLink = path;
          }
        }

        // Create object with text an link
        return {
          text: localeName,
          link: localeLink
        }
      });
    }
  },

  methods: {
    openDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = true;
      }, time);

      this.$refs.localePickerButton.addEventListener('mouseleave', function () {
        clearTimeout(timer);
      });
    },

    closeDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = false;
      }, time);

      this.$refs.localePickerDropdown.addEventListener('mouseenter', function () {
        clearTimeout(timer);
      });
    }
  }
}

</script>

<style>
svg.icon-locale {
  width: 24px;
  fill: red;
}
.router-link-active { color: red; }
</style>

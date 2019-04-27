<template>
  <div class="locale-picker"
    :class="{
      'locale-picker--navbar': navbar,
      'locale-picker--sidebar': !navbar
    }"
    @mouseleave="closeDropdown(300)">

    <template v-if="navbar">
      <button class="locale-picker__button menu-secondary__icon"
        @mouseenter="openDropdown(200)"
        @click="openDropdown(0)"
        :class="{ 'menu-secondary__icon--active': isDropdownOpen }"
        :disabled="isDropdownOpen"
        ref="localePickerButton">
        <IconLocale />
      </button>

      <div class="locale-picker__dropdown"
        :class="{ 'locale-picker__dropdown--active': isDropdownOpen }"
        ref="localePickerDropdown">
        <Link class="locale-picker__link"
          v-for="locale in localeList"
          :item="locale"
          :key="locale.text"
        />
      </div>
    </template>

    <SidebarGroup v-else :item="localeListSidebar" />
  </div>
</template>

<script>

import getLocaleList from '../js/getLocaleList';

import Link from './Link.vue';
import SidebarGroup from './SidebarGroup.vue';
import IconLocale from './icons/IconLocale.vue';

export default {
  name: 'LocalePicker',

  components: {
    Link,
    SidebarGroup,
    IconLocale
  },

  props: {
    navbar: Boolean
  },

  data() {
    return {
      isDropdownOpen: false
    };
  },

  computed: {
    localeList() {
      return getLocaleList.call(this);
    },

    localeListSidebar() {
      const list = this.localeList;

      return {
        text: this.$themeLocaleConfig.localePickerLabel,
        type: 'group',
        children: list
      };
    }
  },

  methods: {
    openDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = true;
      }, time);

      this.$refs.localePickerButton.addEventListener('mouseleave', () => {
        clearTimeout(timer);
      });
    },

    closeDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = false;
      }, time);

      this.$refs.localePickerDropdown.addEventListener('mouseenter', () => {
        clearTimeout(timer);
      });
    }
  }
};

</script>

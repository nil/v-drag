<template>
  <div class="locale-picker"
    @mouseleave="closeDropdown(300)">
    <button class="locale-picker--button menu-secondary--icon"
      @mouseenter="openDropdown(200)"
      :class="{ active: isDropdownOpen }"
      :disabled="isDropdownOpen"
      ref="localePickerButton">
      <IconLocale />
    </button>

    <div class="locale-picker--dropdown"
      :class="{ active: isDropdownOpen }"
      ref="localePickerDropdown">
      <Link class="locale-picker--link"
        v-for="locale in localeList"
        :item="locale"
        :key="locale.text"
      />
    </div>
  </div>
</template>

<script>

import getLocaleList from '../js/getLocaleList';

import Link from './Link.vue';
import IconLocale from './icons/IconLocale.vue';

export default {
  name: 'LocalePicker',

  components: {
    Link,
    IconLocale
  },

  data() {
    return {
      isDropdownOpen: false
    };
  },

  computed: {
    localeList() {
      return getLocaleList.call(this);
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

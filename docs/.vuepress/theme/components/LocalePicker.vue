<template>
  <div class="locale-picker"
    @mouseleave="closeDropdown(300)">
    <button class="locale-picker--button"
      @mouseenter="openDropdown(200)"
      :class="{ active: isDropdownOpen }"
      :disabled="isDropdownOpen"
      ref="localePickerButton">
      <IconLocale />
    </button>

    <div class="locale-picker--dropdown"
      :class="{ active: isDropdownOpen }"
      ref="localePickerDropdown">
      <Link v-for="locale in localeList" :item="locale" />
    </div>
  </div>
</template>

<script>

import DropdownLink from '@theme/components/DropdownLink.vue'
import Link from '@theme/components/Link.vue'
import IconLocale from './icons/IconLocale.vue';

import getLocaleList from '@theme/js/getLocaleList';

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
      return getLocaleList.call(this);
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

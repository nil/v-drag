<template>
  <div class="lang-dropdown">
    <div class="lang-dropdown--button"
      @click="openDropdown(false)"
      @mouseenter="openDropdown(200)"
      :disabled="isDropdownOpen"
      ref="button">
      <svg xmlns="http://www.w3.org/2000/svg" class="lang-dropdown--icon icon icon__language" viewBox="0 0 24 24">
        <path d="M17.5 10l.923-.385h-1.846L17.5 10zm-6 0l.753.659.143-.164.062-.208L11.5 10zM8 14l.625.78.07-.055.058-.066L8 14zm-2.5 2l.316.949.17-.057.139-.111L5.5 16zM9 14l-.78.625.111.14.155.092L9 14zM5 9H4v.35l.22.275L5 9zm9 9.5h7v-2h-7v2zm9.423 3.115l-5-12-1.846.77 5 12 1.846-.77zm-6.846-12l-5 12 1.846.77 5-12-1.846-.77zM7.5 2v2h2V2h-2zM1 6h15V4H1v2zm11.042-1.287l-1.5 5 1.916.574 1.5-5-1.916-.574zM10.747 9.34l-3.5 4 1.506 1.318 3.5-4-1.506-1.318zM7.375 13.22l-2.5 2 1.25 1.562 2.5-2-1.25-1.562zm-2.191 1.832l-3 1 .632 1.898 3-1-.632-1.898zm3.301-.194l5 3 1.03-1.715-5-3-1.03 1.716zM4 7v2h2V7H4zm.22 2.625l4 5 1.56-1.25-4-5-1.56 1.25z" />
      </svg>
      <span class="lang-dropdown--language">{{ currentLang }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="lang-dropdown--carret" viewBox="0 0 12 8">
        <path d="M.47 1.53L1.53.47 6 4.94 10.47.47l1.06 1.06L6 7.06.47 1.53z" />
      </svg>
    </div>

    <div class="lang-dropdown--list"
      :class="{ active: isDropdownOpen }"
      @mouseleave="closeDropdown(300)"
      ref="list">
      <a v-for="lang in langList"
        :href="lang.path"
        :class="'lang-dropdown--item' + currentLangClass(lang)" >
        {{ lang.name }}
      </a>
    </div>
  </div>
</template>

<script>

import Icon from '../components/Icon';

export default {
  data() {
    return {
      isDropdownOpen: false
    }
  },

  computed: {
    currentLang() {
      return this.$localeConfig.name;
    },

    langList() {
      return this.$site.locales;
    }
  },

  methods: {
    openDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = true;
      }, time);

      this.$refs.button.addEventListener('mouseleave', function () {
        clearTimeout(timer);
      });
    },

    closeDropdown(time) {
      const timer = setTimeout(() => {
        this.isDropdownOpen = false;
      }, time);

      this.$refs.list.addEventListener('mouseenter', function () {
        clearTimeout(timer);
      });
    },

    currentLangClass(lang) {
      return this.currentLang == lang.name ? ' lang-dropdown--item__active' : '';
    },
  }
}

</script>

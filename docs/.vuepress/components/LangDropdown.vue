<template>
  <div class="lang-dropdown">
    <div class="lang-dropdown--button navbar--link"
      @click="toggleDropdown(false)"
      :disabled="isDropdownOpen">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5 10l.923-.385h-1.846L17.5 10zm-6 0l.753.659.143-.164.062-.208L11.5 10zM8 14l.625.78.07-.055.058-.066L8 14zm-2.5 2l.316.949.17-.057.139-.111L5.5 16zM9 14l-.78.625.111.14.155.092L9 14zM5 9H4v.35l.22.275L5 9zm9 9.5h7v-2h-7v2zm9.423 3.115l-5-12-1.846.77 5 12 1.846-.77zm-6.846-12l-5 12 1.846.77 5-12-1.846-.77zM7.5 2v2h2V2h-2zM1 6h15V4H1v2zm11.042-1.287l-1.5 5 1.916.574 1.5-5-1.916-.574zM10.747 9.34l-3.5 4 1.506 1.318 3.5-4-1.506-1.318zM7.375 13.22l-2.5 2 1.25 1.562 2.5-2-1.25-1.562zm-2.191 1.832l-3 1 .632 1.898 3-1-.632-1.898zm3.301-.194l5 3 1.03-1.715-5-3-1.03 1.716zM4 7v2h2V7H4zm.22 2.625l4 5 1.56-1.25-4-5-1.56 1.25z" />
      </svg>
    </div>
    <div class="lang-dropdown--list"
      :class="{ active: isDropdownOpen }"
      @mouseleave="toggleDropdown(300)">
      <span class="lang-dropdown--current" >{{ currentLang }}</span>
      <a v-for="lang in langList" class="lang-dropdown--item" :href="lang.path">
        {{ lang.name }}
      </a>
    </div>
  </div>
</template>

<script>

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
      const all = this.$site.locales;

      delete all[this.$localeConfig.path];

      return all;
    }
  },

  methods: {
    toggleDropdown(time) {
      setTimeout(() => {
        this.isDropdownOpen = !this.isDropdownOpen;
      }, time);
    }
  }
}

</script>

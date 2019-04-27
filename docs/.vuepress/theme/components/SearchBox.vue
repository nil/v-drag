<template>
  <div class="search-box">
    <div class="menu-secondary__icon" @click="updateSearchFocus(true)">
      <IconSearchButton />
    </div>

    <div class="search-box__container"
      :class="{ 'search-box__container--focused': isFieldFocused }">
      <div class="search-box__input">
        <label for="input-search"
          class="search-box__label">
          <IconSearchField />
        </label>

        <input class="search-box__field"
          :value="query"
          :focus="isFieldFocused"
          aria-label="Search"
          autocomplete="off"
          spellcheck="false"
          id="input-search"
          ref="searchBoxInput"
          @input="updateSearchQuery($event)"
          @blur="updateSearchFocus(false)"
          @keyup.up="updateFocusIndex($event)"
          @keyup.down="updateFocusIndex($event)"
          @keyup.enter="goToResult(focusIndex)">

        <button class="search-box__cancel"
          @click="cancelSearch()">
          <IconCancel />
        </button>
      </div>

      <ul class="search-box__suggestions"
        v-if="showSuggestions"
        @mouseleave="unfocusAllSuggestions">
        <li class="search-box__item"
          v-for="(item, index) in suggestionResults"
          :key="index"
          :class="{ 'search-box__item--focused': index === focusIndex }"
          @mousedown="goToResult(index)"
          @mouseenter="focusSuggestion(index)">
          <a class="search-box__link"
            :href="item.path"
            @click.prevent>
            <span class="search-box__title">{{ item.title || item.path }}</span>
            <span v-if="item.header" class="search-box__header">
              &#x203A; {{ item.header.title }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import IconCancel from '@theme/components/icons/IconCancel.vue';
import IconSearchButton from '@theme/components/icons/IconSearchButton.vue';
import IconSearchField from '@theme/components/icons/IconSearchField';

export default {
  components: {
    IconCancel,
    IconSearchButton,
    IconSearchField
  },

  data() {
    return {
      query: '',
      isSearchBoxOpen: false,
      isFieldFocused: false,
      focusIndex: 0
    };
  },

  computed: {
    showSuggestions() {
      return (
        this.isFieldFocused
        && this.suggestionResults
        && this.suggestionResults.length
      );
    },

    suggestionResults() {
      const query = this.query.trim().toLowerCase();

      if (!query) {
        return null;
      }

      const results = [];
      const maxSuggestions = 6;
      const pagesList = this.$site.pages;
      const localePath = this.$localePath;

      const matches = item => item.title && item.title.toLowerCase().indexOf(query) > -1;

      for (const page of pagesList) {
        if (results.length >= maxSuggestions) { break; }

        // Filter out results that do not match current locale
        if (this.getPageLocalePath(page) !== localePath) {
          continue;
        }

        // First check name of page
        if (matches(page)) {
          results.push(page);

        // Then check headers inside page
        } else if (page.headers) {
          for (const header of page.headers) {
            if (results.length >= maxSuggestions) { break; }

            if (matches(header)) {
              results.push(Object.assign({}, page, {
                path: `${page.path}#${header.slug}`,
                header
              }));
            }
          }
        }
      }

      return results;
    }
  },

  methods: {
    updateSearchQuery(e) {
      this.query = e.target.value;
    },

    updateSearchFocus(state) {
      this.isFieldFocused = state;

      if (state) {
        this.$refs.searchBoxInput.focus();
      } else {
        setTimeout(() => { this.query = ''; }, 300);
      }
    },

    updateFocusIndex(e) {
      const sign = e.key === 'ArrowUp' ? -1 : 1;

      if (e.key === 'ArrowUp' && this.focusIndex <= 0) {
        this.focusIndex = this.suggestionResults.length - 1;
      } else if (e.key === 'ArrowDown' && this.focusIndex >= this.suggestionResults.length - 1) {
        this.focusIndex = 0;
      } else {
        this.focusIndex = this.focusIndex + sign;
      }
    },

    getPageLocalePath(page) {
      for (const localePath in this.$site.locales || {}) {
        if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
          return localePath;
        }
      }

      return '/';
    },

    goToResult(i) {
      this.updateSearchFocus(false);
      this.$router.push(this.suggestionResults[i].path);
      this.query = '';
      this.focusIndex = 0;
    },

    focusSuggestion(i) {
      this.focusIndex = i;
    },

    unfocusAllSuggestions() {
      this.focusIndex = -1;
    },

    cancelSearch() {
      this.unfocusAllSuggestions();
      this.updateSearchFocus(false);
    }
  }
};

</script>

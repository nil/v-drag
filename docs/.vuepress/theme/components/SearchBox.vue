<template>
  <div class="search-box">
    <button class="search-box--button show--m"
      @click="updateSearchFocus(true)">
      <IconSearch />
    </button>

    <div class="search-box--container"
    :class="{ 'focused': isFieldFocused, 'active': showSuggestions }">
      <div class="search-box--input">
        <label for="input-search"
          class="search-box--label">
          <IconSearch />
        </label>

        <input class="search-box--field"
          :value="query"
          aria-label="Search"
          autocomplete="off"
          spellcheck="false"
          id="input-search"
          ref="searchBoxInput"
          @input="updateSearchQuery($event)"
          @focus="updateSearchFocus(true)"
          @blur="updateSearchFocus(false)"
          @keyup.up="updateFocusIndex($event)"
          @keyup.down="updateFocusIndex($event)"
          @keyup.enter="goToResult(focusIndex)">
      </div>

      <ul class="search-box--suggestions"
        v-if="showSuggestions"
        @mouseleave="unfocusAllSuggestions">
        <li class="search-box--item"
          v-for="(item, index) in suggestionResults"
          :class="{ 'focused': index === focusIndex }"
          @mousedown="goToResult(index)"
          @mouseenter="focusSuggestion(index)">
          <a class="search-box--link"
            :href="item.path"
            @click.prevent>
            <span class="search-box--title">{{ item.title || item.path }}</span>
            <span v-if="item.header" class="search-box--header">&#x203A; {{ item.header.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import IconSearch from '@theme/components/icons/IconSearch';

export default {
  components: {
    IconSearch
  },

  data () {
    return {
      query: '',
      isFieldFocused: false,
      focusIndex: 0
    }
  },

  computed: {
    showSuggestions () {
      return (
        this.isFieldFocused &&
        this.suggestionResults &&
        this.suggestionResults.length
      )
    },

    suggestionResults () {
      const query = this.query.trim().toLowerCase();

      if (!query) {
        return;
      }

      const results = [];
      const maxSuggestions = 6;
      const pagesList = this.$site.pages;
      const localePath = this.$localePath;

      const matches = item => {
        return item.title && item.title.toLowerCase().indexOf(query) > -1;
      };

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
                header: header
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

      if (state === true) {
        this.$refs.searchBoxInput.focus();
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
      this.$router.push(this.suggestionResults[i].path);
      this.query = '';
      this.focusIndex = 0;
    },

    focusSuggestion(i) {
      this.focusIndex = i;
    },

    unfocusAllSuggestions() {
      this.focusIndex = -1;
    }
  }
}
</script>

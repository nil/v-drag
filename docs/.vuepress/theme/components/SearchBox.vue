<template>
  <div class="search-box">
    <input class="search-box--field"
      :class="{ 'focused': isFieldFocused }"
      :value="query"
      aria-label="Search"
      autocomplete="off"
      spellcheck="false"
      @input="updateSearchQuery($event)"
      @focus="updateSearchFocus(true)"
      @blur="updateSearchFocus(false)"
      @keyup.up="updateFocusIndex($event)"
      @keyup.down="updateFocusIndex($event)"
      @keyup.enter="goToResult(focusIndex)">

    <ul class="search-box--suggestions"
      v-if="showSuggestions"
      @mouseleave="unfocusAllSuggestions">
      <li class="search-box--item"
        v-for="(item, index) in suggestionResults"
        :class="{ 'focused': index === focusIndex }"
        @mousedown="goToResult(index)"
        @mouseenter="focusSuggestion(index)">
        <a :href="item.path" @click.prevent>
          <span class="search-box--title">{{ item.title || item.path }}</span>
          <span v-if="item.header" class="search-box--header">&gt; {{ item.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
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
      this.query = e.target.value
    },

    updateSearchFocus(state) {
      this.isFieldFocused = state;
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
      this.focusIndex = i
    },

    unfocusAllSuggestions() {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">

.search-box
  display inline-block
  position relative
  margin-right 1rem
  input
    cursor text
    width 10rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all .2s ease
    background #fff
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
  .search-box--suggestions
    background #fff
    width 20rem
    position absolute
    top 1.5rem
    border 1px solid darken($borderColor, 10%)
    border-radius 6px
    padding 0.4rem
    list-style-type none
    &.align-right
      right 0
  .search-box--item
    line-height 1.4
    padding 0.4rem 0.6rem
    border-radius 4px
    cursor pointer
    a
      white-space normal
      color lighten($textColor, 35%)
      .page-title
        font-weight 600
      .header
        font-size 0.9em
        margin-left 0.25em
    &.focused
      background-color #f3f4f5
      a
        color $accentColor

@media (max-width: $MQNarrow)
  .search-box
    input
      cursor pointer
      width 0
      border-color transparent
      position relative
      &:focus
        cursor text
        left 0
        width 10rem

@media (max-width: $MQNarrow) and (min-width: $MQMobile)
  .search-box
    .suggestions
      left 0

@media (max-width: $MQMobile)
  .search-box
    margin-right 0
    input
      left 1rem
    .suggestions
      right 0

@media (max-width: $MQMobileNarrow)
  .search-box
    .suggestions
      width calc(100vw - 4rem)
    input:focus
      width 8rem
</style>

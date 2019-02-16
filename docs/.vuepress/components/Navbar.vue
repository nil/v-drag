<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <div class="navbar--button" @click="$emit('toggle-sidebar')">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18h16M4 12h16M4 6h16" />
        </svg>
      </div>

      <router-link :to="$localePath" class="navbar--logo">{{ $siteTitle }}</router-link>

      <div class="navbar--navigation">
        <router-link v-for="item in mainLinks" :to="item.link">{{ item.text }}</router-link>
      </div>

      <div class="links" :style="{ 'max-width': linksWrapMaxWidth + 'px' }">
        <!-- <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
        <SearchBox v-else-if="$site.themeConfig.search !== false"/>
        <NavLinks class="can-hide"/> -->
      </div>
    </div>
  </header>
</template>

<script>
// import SidebarButton from './SidebarButton.vue'
// import AlgoliaSearchBox from '@AlgoliaSearchBox'
// import SearchBox from './SearchBox.vue'
// import NavLinks from './NavLinks.vue'

import store from '../store.js';

export default {
  // components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  computed: {
    mainLinks() {
      return store.state.navbar.main;
    },

    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}

</script>

<template>
  <header class="navbar"
    :class="{ 'navbar--home': isPageHome, 'navbar--docs': !isPageHome }">
    <button class="navbar--button show--xs" @click="$emit('toggle-sidebar')">
      <IconSidebar />
    </button>

    <Link class="navbar--logo menu-primary--link"  v-if="!isPageHome" :item="homeLink" />

    <div class="navbar--wrapper">
      <MenuPrimary :navbar="true" class="hide--xs" />



      <nav class="menu-secondary">
        <Link :item="releasesLink" class="menu-secondary--icon hide--m" />
        <SearchBox :state="isSearchBoxOpen" @end-focus="toggleSearchBox(false)"/>
        <div class="menu-secondary--icon" @click="toggleSearchBox(true)">
          <IconSearchButton />
        </div>
        <LocalePicker />
        <Link :item="repoLink" class="menu-secondary--icon"><IconGithub /></Link>
      </nav>
    </div>
  </header>
</template>

<script>

import Link from '@theme/components/Link.vue';
import MenuPrimary from '@theme/components/MenuPrimary.vue';
import SearchBox from '@theme/components/SearchBox.vue';
import LocalePicker from '@theme/components/LocalePicker.vue';

import IconGithub from '@theme/components/icons/IconGithub.vue';
import IconSearchButton from '@theme/components/icons/IconSearchButton.vue';
import IconSidebar from '@theme/components/icons/IconSidebar.vue';

import info from '../../../../package.json';

export default {
  components: {
    Link,
    MenuPrimary,
    SearchBox,
    LocalePicker,
    IconGithub,
    IconSearchButton,
    IconSidebar
  },

  data() {
    return {
      isSearchBoxOpen: false
    };
  },

  computed: {
    isPageHome() {
      return this.$localePath === this.$page.path;
    },

    homeLink() {
      return {
        text: this.$siteTitle,
        link: this.$localePath
      };
    },

    releasesLink() {
      return {
        text: `v${info.version}`,
        link: `${info.homepage}/releases`
      };
    },

    repoLink() {
      return {
        link: info.homepage
      };
    }
  },

  methods: {
    toggleSearchBox(to) {
      this.isSearchBoxOpen = to;
    }
  }
};

</script>

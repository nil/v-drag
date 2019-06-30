<template>
  <main class="page">
    <section class="page__wrapper">
      <div class="page__intro" v-if="$page.frontmatter.title && $page.frontmatter.summary">
        <h1 class="page__title">{{ $page.frontmatter.title }}</h1>
        <p class="page__summary">{{ $page.frontmatter.summary }}</p>
      </div>

      <slot name="top" />

      <Content />

      <div class="page-nav"
        v-if="showNav && (navPages.prev || navPages.next)">
        <Link class="page-nav__button page-nav__button--prev"
          v-if="navPages.prev"
          :item="navLink('prev')">
          <div class="page-nav__indication">
            <span class="u-hide--600">{{ $themeLocaleConfig.prevPageLabel }}</span>
            <span class="u-show--600">&#8592;</span>
          </div>
          <h2 class="page-nav__heading">{{ navPages.prev.text }}</h2>
        </Link>

        <Link class="page-nav__button page-nav__button--next"
          v-if="navPages.next"
          :item="navLink('next')">
          <div class="page-nav__indication">
            <span class="u-hide--600">{{ $themeLocaleConfig.nextPageLabel }}</span>
            <span class="u-show--600">&#8594;</span>
          </div>
          <h2 class="page-nav__heading">{{ navPages.next.text }}</h2>
        </Link>
      </div>

      <div class="page__meta" v-if="showNav">
        <Link class="page__edit" :item="editLink" />
        <div class="page__update" v-if="$page.lastUpdated">
          <span class="page__label">{{ $themeLocaleConfig.lastUpdatedLabel }}:</span>
          <span class="page__time">{{ lastUpdatedDate }}</span>
        </div>
       </div>

      <slot name="bottom" />
    </section>

    <Footer :page="true && showNav" />
  </main>
</template>

<script>

import Link from '@theme/components/Link.vue';
import Footer from '@theme/components/Footer.vue';

import formatDate from '@theme/js/formatDate';
import getPageNavigation from '@theme/js/getPageNavigation';

export default {
  props: {
    sidebar: Array,
    showNav: Boolean
  },

  components: {
    Link,
    Footer
  },

  computed: {
    navPages() {
      return getPageNavigation(this.$page, this.sidebar);
    },

    editLink() {
      const repo = 'https://github.com/nil/v-drag/blob/docs-v1/docs';
      const path = this.$page.regularPath;
      const replacedPath = path.replace(/\/$/, '/index.md').replace('.html', '.md');

      return {
        link: repo + replacedPath,
        text: this.$themeLocaleConfig.editPageLabel
      };
    },

    lastUpdatedDate() {
      return formatDate(this.$page.lastUpdated, this.$lang);
    }
  },

  methods: {
    navLink(page) {
      return {
        link: this.navPages[page].link
      };
    }
  }
};

</script>

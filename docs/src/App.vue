<template>
  <div id="app">
    <section class="hero">
      <div class="large-wrapper">
        <div class="hero-repo">
          <Logo v-drag class="hero-logo" />
          <span class="hero-version">{{ packageVersion }}</span>
        </div>
        <h1 class="hero-tagline">The simplest way to integrate drag on Vue.js</h1>
        <div class="hero-links">
          <a v-for="link in heroLinks" :key="link.text" class="hero-link" :href="link.link">
            <Icon :name="link.icon" aria-hidden="true" />
            <span class="hero-link-text">{{ link.text }}</span>
          </a>
        </div>
        <HeroHand />
      </div>
    </section>

    <section class="intro">

    </section>
    <MarkdownParser />
  </div>
</template>

<script>

import HeroHand from './components/HeroHand.vue'
import Icon from './components/Icon.vue'
import Logo from './components/Logo.vue'
import MarkdownParser from './components/MarkdownParser.vue'

import packageData from '../../package.json';

export default {
  name: 'App',

  components: {
    HeroHand,
    Icon,
    Logo,
    MarkdownParser
  },

  data() {
    return {
      heroLinks: [
        { text: 'GitHub', link: packageData.homepage, icon: 'github' },
        { text: 'Contribute', link: '#contribute', icon: 'contribute' },
        { text: 'Issues', link: packageData.bugs.url, icon: 'issue' }
      ]
    }
  },

  computed: {
    packageVersion() {
      return `v${packageData.version}`;
    }
  }
}

</script>

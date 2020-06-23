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

    <section class="intro grid large-wrapper">
      <div class="intro-content">
        <p class="intro-about">
          Draggable elements are a common UX pattern, specially on touch screens. But as a developer, you might know how challenging it is to apply it with JavaScript. Vue.js doesn’t help in this case, either. So to simplify things, v-drag was written. Its purpose is to quickly integrate and customize draggable elements on projects using Vue.js.
        </p>

        <div class="intro-heading">
          <h1>Quick start</h1>
          <a href="#docs" class="u-hide--600">Full docs below</a>
        </div>

        <MarkdownParser :text="introText" />
      </div>

      <DragPill />
      <DragPill axis="x" />
      <DragPill axis="y" :handle="true" />
    </section>

    <MarkdownParser :text="docsText" :toc="true" />
  </div>
</template>

<script>

import DragPill from './components/DragPill.vue'
import HeroHand from './components/HeroHand.vue'
import Icon from './components/Icon.vue'
import Logo from './components/Logo.vue'
import MarkdownParser from './components/MarkdownParser.vue'

import docsText from '!raw-loader!../README.md';
import introText from '!raw-loader!../QUICKSTART.md';
import packageData from '../../package.json';

export default {
  name: 'App',

  components: {
    DragPill,
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
      ],
      docsText: docsText,
      introText: introText
    }
  },

  computed: {
    packageVersion() {
      return `v${packageData.version}`;
    }
  }
}

</script>

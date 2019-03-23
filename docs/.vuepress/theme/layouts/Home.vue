<template>
  <main class="home" aria-labelledby="main-title">
    <section class="hero">
      <div class="home--wrapper">
        <div class="hero--logo">
          <IconLogo v-drag:x />
        </div>

        <h1 class="hero--tagline">{{ this.$description }}</h1>

        <div class="hero--cta">
          <Link v-for="(obj, type) in data.cta"
            class="cta-button"
            :class="`cta-button_${type}`"
            :item="obj"
            :key="obj.link" />
        </div>

        <IconHandHero class="hero--hand" />
      </div>
    </section>

    <section class="intro grid home--wrapper">
      <div class="intro--content">
        <p class="intro--about">{{ data.about }}</p>

        <div class="intro--heading">
          <h2>{{ this.$themeLocaleConfig.quickStartHeading }}</h2>
          <Link :item="quickStartLink" class="hide--s" />
        </div>

        <Content />
      </div>

      <DragPill />
      <DragPill axis="x" />
      <DragPill axis="y" :handle="true" class="hide--m" />
    </section>

    <section class="features grid home--wrapper">
      <h2 class="features--heading">{{ $themeLocaleConfig.featuresLabel }}</h2>

      <div class="features--item"
        v-for="(feature, index) in data.features"
        :key="index">
        <div class="features--title">
          <FeatureIcon :icon="feature.icon" />
          <h3>{{ feature.title }}</h3>
        </div>
        <p class="features--description">{{ feature.details }}</p>
        <div class="features--links">
          <Link :item="{
            text: `${$themeLocaleConfig.learnMoreLabel} ›`,
            link: feature.docs
          }" />
          <Link :item="{
            text: `${$themeLocaleConfig.testPlaygroundLabel} ›`,
            link: feature.playground
          }" class="hide--m" />
        </div>
      </div>
    </section>

    <section class="ankle">
      <Link v-for="(obj, type) in data.cta"
        class="cta-button"
        :class="`cta-button_${type}`"
        :item="obj"
        :key="obj.link" />
    </section>

    <Footer />
  </main>
</template>

<script>

import DragPill from '@theme/components/DragPill.vue';
import FeatureIcon from '@theme/components/FeatureIcon.vue';
import Footer from '@theme/components/Footer.vue';
import Link from '@theme/components/Link.vue';

import IconHandHero from '@theme/components/icons/IconHandHero.vue';
import IconLogo from '@theme/components/icons/IconLogo.vue';

export default {
  components: {
    DragPill,
    FeatureIcon,
    Footer,
    Link,
    IconHandHero,
    IconLogo
  },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    quickStartLink() {
      return {
        text: `${this.$themeLocaleConfig.quickStartLink} ›`,
        link: 'installation/'
      };
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    }
  }
};

</script>

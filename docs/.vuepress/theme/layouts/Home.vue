<template>
  <main class="home" aria-labelledby="main-title">
    <section class="hero">
      <div class="home__wrapper">
        <div class="hero__logo">
          <IconLogo v-drag:x />
        </div>

        <h1 class="hero__tagline">{{ this.$description }}</h1>

        <div class="hero__cta">
          <Link v-for="(obj, type) in data.cta"
            class="cta-button"
            :class="`cta-button--${type}`"
            :item="obj"
            :key="obj.link" />
        </div>

        <IconHandHero class="hero__hand" />
      </div>
    </section>

    <section class="intro grid home__wrapper">
      <div class="intro__content">
        <p class="intro__about">{{ data.about }}</p>

        <div class="intro__heading">
          <h2>{{ this.$themeLocaleConfig.quickStartHeading }}</h2>
          <Link :item="quickStartLink" class="u-hide--600" />
        </div>

        <Content />
      </div>

      <DragPill />
      <DragPill axis="x" />
      <DragPill axis="y" :handle="true" />
    </section>

    <section class="features grid home__wrapper">
      <h2 class="features__heading">{{ $themeLocaleConfig.featuresLabel }}</h2>

      <div class="features__item"
        v-for="(feature, index) in data.features"
        :key="index">
        <div class="features__title">
          <FeatureIcon :icon="feature.icon" />
          <h3>{{ feature.title }}</h3>
        </div>
        <p class="features__description">{{ feature.details }}</p>
        <div class="features__links">
          <Link :item="{
            text: `${$themeLocaleConfig.learnMoreLabel} ›`,
            link: feature.docs
          }" />
          <Link :item="{
            text: `${$themeLocaleConfig.testPlaygroundLabel} ›`,
            link: feature.playground
          }" class="u-hide--900" />
        </div>
      </div>
    </section>

    <section class="ankle">
      <Link v-for="(obj, type) in data.cta"
        class="cta-button"
        :class="`cta-button--${type}`"
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

import IconHandHero from '@theme/icons/IconHandHero.vue';
import IconLogo from '@theme/icons/IconLogo.vue';

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

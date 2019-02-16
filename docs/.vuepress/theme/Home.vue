<template>
  <div class="home">

    <section class="hero">
      <div class="home--wrapper">
        <div class="hero--logo" v-drag:x></div>

        <h1 class="hero--tagline">{{ this.$description }}</h1>

        <div class="hero--cta">
          <CtaButton v-for="(obj, type) in data.cta" :type="type" :data="obj" />
        </div>

        <svg class="hero--hand" viewBox="0 0 416 542" xmlns="http://www.w3.org/2000/svg">
          <path d="M160.61 32.33L185.1 10.1l31.93 4.81 39.51 91.62 4.6 1.15 2.64-4.27-25.53-59.2 14.41-18.27 31.51 1.08 50.5 111.17 15.7 85.64-28.55 73.07L416 477.64 276.85 542l-84.59-184.45-91.16-20.7-76.41-58.8L0 230.26l48-80.6 30.39 61.19-11.42 21.44 34.53 25.1 9.86 19.09 4.76.46 2.3-3.97-84.37-169.13 24.7-23.42 34.06 2.05 48.76 110.8 4.84.88 2.37-4.05L77.98 29.2 106.7 0l33.98 5.05 58.72 140.6 5.11 1.44 2.16-4.47L160.6 32.33z" />
        </svg>

      </div>
    </section>

    <section class="intro grid home--wrapper">

      <div class="intro--content">
        <p class="intro--about">{{ data.about }}</p>

        <div class="intro--heading">
          <h2>Quick start</h2>
          <router-link class="intro--link" :to="data.start.link" :exact="exact"> {{ quickStartLink }}</router-link>
        </div>

        <Content />
      </div>

      <DragPill />
      <DragPill axis="x" />
      <DragPill handle="true" axis="y" />
    </section>

    <section class="features grid home--wrapper">
      <h2 class="features--heading">Features</h2>

      <div class="features--item"
        v-for="(feature, index) in data.features"
        :key="index">
        <div class="features--title">
          <FeatureIcon class="features--icon" :name="feature.icon" />
          <h3>{{ feature.title }}</h3>
        </div>
        <p>{{ feature.details }}</p>
      </div>
    </section>

    <section class="ankle">
      <div class="home--wrapper">
        <CtaButton v-for="(obj, type) in data.cta" :type="type" :data="obj" />
      </div>
    </section>
  </div>
</template>

<script>

import CtaButton from '../components/CtaButton.vue';
import DragPill from '../components/DragPill.vue';
import FeatureIcon from '../components/FeatureIcon.vue';

export default {
  components: {
    CtaButton,
    DragPill,
    FeatureIcon
  },

  computed: {
    data() {
      return this.$page.frontmatter
    },

    exact() {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
      }
      return this.link === '/'
    },

    quickStartLink() {
      return `${this.data.start.text} ›`;
    }
  }
}

</script>

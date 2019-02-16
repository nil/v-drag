<template>
  <router-link
    class="cta-button"
    :class="'cta-button--' + type"
    :to="data.link"
    :exact="exact">
    {{ data.text }}
  </router-link>
</template>

<script>

export default {
  props: {
    type: String,
    data: Object
  },

  computed: {
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
      }
      return this.link === '/'
    }
  }
}

</script>

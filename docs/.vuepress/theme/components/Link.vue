<template>
  <a v-if="isExternalLink"
    :href="item.link"
    target="_blank"
    rel="noopener noreferrer">
    <template v-if="item && item.text">{{ item.text }}</template>
    <template v-else><slot /></template>
  </a>

  <router-link v-else
    :to="item.link"
    :exact="exact">
    <template v-if="item.text">{{ item.text }}</template>
    <template v-else><slot /></template>
  </router-link>
</template>

<script>

export default {
  props: {
    item: {
      required: true,
      type: Object
    }
  },

  mounted( ){
    if (!this.item.link) {
      console.log(this.item);

    }

  },

  computed: {
    exact () {
      if (this.$site.locales) {
        return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link);
      }
      return this.link === '/'
    },

    isExternalLink() {
      return /^(https?:)/.test(this.item.link);
    }
  }
}

</script>

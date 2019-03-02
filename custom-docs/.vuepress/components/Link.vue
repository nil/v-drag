<template>
  <router-link :to="link">{{ text }}</router-link>
</template>

<script>

export default {
  props: {
    link: String,
    text: String
  },

  computed: {
  }
}

</script>

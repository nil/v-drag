<template>
  <router-link
    class="cta-button"
    :class="'cta-button--' + type"
    :to="data.link">
    {{ data.text }}
  </router-link>
</template>

<script>

export default {
  props: {
    type: String,
    data: Object
  }
}

</script>

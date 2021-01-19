<template>
  <a :href="this.link"
    :class="'button button__' + this.color">
    <slot />
  </a>
</template>

<script>

export default {
  props: {
    link: String,
    color: String
  }
}

</script>

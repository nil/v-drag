<template>
  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <template v-if="name === 'axis'">
      <path class="feature-icon feature-icon--secondary" d="M11.5 25.5L16 30M16 30L20.5 25.5M16 30V2M16 2L11.5 6.5M16 2L20.5 6.5" />
      <path class="feature-icon feature-icon--primary" d="M6.5 11.5L2 16M2 16L6.5 20.5M2 16L30 16M30 16L25.5 11.5M30 16L25.5 20.5" />
    </template>
    <template v-else-if="name === 'handle'">
      <rect class="feature-icon feature-icon--secondary" x="3" y="3" width="26" height="26" />
      <path class="feature-icon feature-icon--primary" d="M11 3H29V15H11V3Z" />
    </template>
    <template v-else-if="name === 'style'">
      <path class="feature-icon feature-icon--primary" d="M23 21.5L26 18L29 21.5L30 24.5L28.5 27.5L26 28L23.5 27.5L22 24.5L23 21.5Z" />
      <path class="feature-icon feature-icon--secondary" d="M14 5.41421L23.5858 15L12 26.5858L2.41421 17L14 5.41421Z" />
      <path class="feature-icon feature-icon--secondary" d="M13 6.5L9.5 4.5L5.5 5L3.5 8.5L4 15" />
      <path class="feature-icon feature-icon--primary" d="M12 26.5858L2.41421 17L4.8334 14.5808L20.9549 17.6308L12 26.5858Z" />
    </template>
  </svg>
</template>

<script>

export default {
  props: {
    name: String
  }
}

</script>

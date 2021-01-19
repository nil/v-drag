<template>
  <div class="theme-container">
    <Navbar />
    <Content/>
  </div>
</template>

<script>

import Navbar from '../components/Navbar.vue';

import '../styles/main.pcss';

export default {
  components: {
    Navbar
  }
}

</script>

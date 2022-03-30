<template>
  <div class="bg-gray-900 text-white">
    <!-- HEADER ----------------->
    <LayoutHeader />

    <!-- QUICK START ----------------->
    <main class="border-b-8 border-emerald-400 py-xl">
      <div class="wrapper">
        <p>
          Quick start
        </p>
      </div>
    </main>
  </div>
</template>

<script>

import LayoutHeader from './layout/Header.vue';

import './assets/styles/global.css';

export default {
  name: 'App',

  components: {
    LayoutHeader,
  },
};

</script>

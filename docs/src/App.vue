<template>
  <div class="bg-slate-100 text-slate-900 overflow-x-hidden min-h-[100vh]">
    <!-- HEADER ----------------->
    <LayoutHeader />

    <!-- QUICK START ----------------->
    <!-- <main class="relative border-y-8 border-emerald-400 bg-gray-900 py-xl z-50">
      <div class="wrapper">
        <p>
          Quick start
        </p>
      </div>
    </main> -->
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

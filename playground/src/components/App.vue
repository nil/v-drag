<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Preview from './ui/Preview.vue';

import '../styles/global.css';
import ConfigBar from './ui/ConfigBar.vue';
</script>

<template>
  <div class="flex h-full font-sans text-s text-gray-900">
    <ConfigBar />
    <Preview
      msg="Hello Vue 3 + Vite"
    />
  </div>
</template>

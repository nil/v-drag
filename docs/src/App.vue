<template>
  <div class="bg-gray-900 text-white">
    <!-- HEADER ----------------->
    <header class="bg-[#0D242E] border-b-8 border-emerald-400 py-xl">
      <div class="wrapper">
        <div class="mb-m">
          <Logo class="inline-block w-xl fill-emerald-400 mr-xs" />
          <span class="align-bottom text-emerald-600">v{{ currentVersion }}</span>
        </div>
        <h1 class="text-4xl font-display mb-l">
          The simplest way to<br>integrate drag on Vue.js
        </h1>

        <div class="inline-flex gap-x-m">
          <HeaderLink :href="ghLink" label="GitHub">
            <IconGithub class="inline-block " />
          </HeaderLink>
          <HeaderLink :href="contributorsLink" label="Contributors">
            <IconAvatar class="inline-block " />
          </HeaderLink>
          <HeaderLink :href="issuesLink" label="Issues">
            <IconWarning class="inline-block " />
          </HeaderLink>
        </div>
      </div>
    </header>

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

import IconGithub from '@carbon/icons-vue/es/logo--github/24';
import IconAvatar from '@carbon/icons-vue/es/user--avatar/24';
import IconWarning from '@carbon/icons-vue/es/warning/24';
import HeaderLink from './components/HeaderLink.vue';
import Logo from './assets/images/logo.vue';

import info from '../../package.json';

import './assets/styles/global.css';

export default {
  name: 'App',

  components: {
    IconGithub,
    IconAvatar,
    IconWarning,
    Logo,
    HeaderLink,
  },

  computed: {
    currentVersion() {
      return info.version;
    },
    ghLink() {
      return info.bugs.url.replace('/issues', '');
    },
    contributorsLink() {
      return `${info.bugs.url.replace('/issues', '')}/graphs/contributors`;
    },
    issuesLink() {
      return info.bugs.url;
    },
  },
};

</script>

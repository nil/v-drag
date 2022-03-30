<template>
  <header ref="container" class="relative bg-[#0D242E] py-xl">
    <div class="wrapper overflow-hidden">
      <div class="mb-m">
        <Logo class="inline-block w-xl fill-emerald-400 mr-xs" />
        <span class="align-bottom text-emerald-600">v{{ currentVersion }}</span>
      </div>
      <h1 ref="tagline" class="inline-block text-4xl font-display mb-l">
        The simplest way to<br class="hidden md:inline-block"> integrate drag on Vue.js
      </h1>

      <div class="flex gap-x-m">
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

      <HeaderDragPill
        v-for="i in 50"
        :key="i"
        :position="getPillPosition()"
      />
    </div>
  </header>
</template>

<script>

import IconGithub from '@carbon/icons-vue/es/logo--github/24';
import IconAvatar from '@carbon/icons-vue/es/user--avatar/24';
import IconWarning from '@carbon/icons-vue/es/warning/24';
import HeaderDragPill from '../components/HeaderDragPill.vue';
import HeaderLink from '../components/HeaderLink.vue';

import Logo from '../assets/images/logo.vue';
import info from '../../../package.json';

export default {
  name: 'LayoutHeader',

  components: {
    IconGithub,
    IconAvatar,
    IconWarning,
    Logo,
    HeaderDragPill,
    HeaderLink,
  },

  data() {
    return {
      container: undefined,
      tagline: undefined,
    };
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

  mounted() {
    this.$data.container = this.$refs.container.getBoundingClientRect();
    this.$data.tagline = this.$refs.tagline.getBoundingClientRect();

    // TODO: get the positon of these elements from the 0,0 of the page, not the user's viewport
  },

  methods: {
    getPillPosition() {
      if (this.$data.container) {
        const minX = this.$data.tagline.right + this.$data.tagline.left;
        const maxX = document.documentElement.clientWidth - 40;
        const minY = -100;
        const maxY = this.$data.container.bottom;

        return [
          Math.floor(Math.random() * (maxX - minX + 1)) + minX,
          Math.floor(Math.random() * (maxY - minY + 1)) + minY,
        ];
      }

      return [0, 0];
    },
  },
};

</script>

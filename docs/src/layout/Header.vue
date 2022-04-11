<template>
  <header ref="container" class="relative bg-gradient-to-b from-sky-200 to-sky-50  border-b-2 border-sky-400">
    <div class="relative hero wrapper text-center z-10 ">
      <div class="w-[192px] mx-auto mb-l bg-white rounded-b-[16px] shadow">
        <Logo class="inline-block mx-m mt-l mb-s fill-sky-800" />
      </div>
      <h1 ref="tagline" class="inline-block text-4xl font-bold mb-m">
        The simplest way to<br class="hidden md:inline-block"> integrate drag on Vue.js
      </h1>

      <div class="flex flex-col md:flex-row justify-center gap-xs">
        <Button
          :href="ghLink"
          label="GitHub"
          :small="`v${currentVersion}`"
        >
          <IconGithub />
        </Button>
        <Button :href="contributorsLink" label="Contributors">
          <IconAvatar />
        </Button>
      </div>

      <div ref="quickstart" class="relative mt-xl mb-[-50%] p-xl bg-red-200 z-10">
        quick start
      </div>

      <HeaderDragPill
        v-for="i in 80"
        :key="i"
        ref="pills"
        :position="getPillPosition()"
      />
    </div>
  </header>
</template>

<script>

import IconGithub from '@carbon/icons-vue/es/logo--github/24';
import IconAvatar from '@carbon/icons-vue/es/user--avatar/24';
import HeaderDragPill from '../components/HeaderDragPill.vue';
import Button from '../components/Button.vue';

import Logo from '../assets/images/logo.vue';
import info from '../../../package.json';

export default {
  name: 'LayoutHeader',

  components: {
    IconGithub,
    IconAvatar,
    Logo,
    HeaderDragPill,
    Button,
  },

  data() {
    return {
      container: undefined,
      tagline: undefined,
      info: undefined,
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
    // Overlap the "Quick Start" with the bottom of the hero
    this.$refs.quickstart.style.marginBottom = `-${this.$refs.quickstart.offsetHeight / 2 - 2}px`;

    // Get size from container and tagline elements
    // TODO: get the positon of these elements from the 0,0 of the page, not the user's viewport
    this.$data.container = this.$refs.container.getBoundingClientRect();
    this.$data.tagline = this.$refs.tagline.getBoundingClientRect();
  },

  methods: {
    getPillPosition() {
      if (this.$data.container) {
        let minX;
        let maxX;

        if (Math.random() > 0.5) {
          // Left side
          minX = -150;
          maxX = this.$data.tagline.left - 176 - this.$data.tagline.left * 0.5;
        } else {
          // Right side
          minX = this.$data.tagline.right - 200 + this.$data.tagline.right * 0.3;
          maxX = this.$data.container.width;
        }

        const minY = -100;
        const maxY = this.$data.container.height - 80;

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

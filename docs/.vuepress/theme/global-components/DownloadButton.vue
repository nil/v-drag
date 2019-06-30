<template>
  <Link class="download-button"
    :item="{ link: fileUrl }">
    <span class="download-button__name">{{ name }}</span>
    <span class="download-button__size u-hide--600">{{ fileSizeKb }}</span> <!-- eslint-disable-line -->
  </Link>
</template>

<script>

import Link from '@theme/components/Link.vue';

export default {
  components: {
    Link
  },

  data() {
    return {
      fileSize: 0
    };
  },

  props: {
    name: {
      required: true,
      type: String
    },
    link: {
      required: true,
      type: String
    }
  },

  beforeMount() {
    fetch(this.fileUrl)
      .then(resp => resp.text())
      .then((data) => {
        this.fileSize = data.length;
      });
  },

  computed: {
    fileUrl() {
      return `https://raw.githubusercontent.com/nil/v-drag/master/${this.link}`;
    },

    fileSizeKb() {
      const size = (this.fileSize / 1024).toFixed(2);

      return `${size} KB`;
    }
  }
};

</script>

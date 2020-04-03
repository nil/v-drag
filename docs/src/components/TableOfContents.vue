<template>
  <aside class="toc">
    <div class="toc-entries" >
      <template v-for="entry of filteredMap">
        <div class="toc-abstract-entry" aria-hidden="true" :key="entry.id"></div>
        <a :key="entry.attrs[0][1]"
          :href="`#${entry.attrs[0][1]}`"
          :class="`toc-entry toc-entry--${entry.tag}`">
          {{ entry.text }}
        </a>
      </template>
    </div>
  </aside>
</template>

<script>

export default {
  name: 'TableOfContents',

  props: {
    map: Array
  },

  computed: {
    text() {
      // console.log(this.map);
      return 'hey'
    },

    filteredMap() {
      return this.map.filter((entry) => {
        const isHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(entry.tag);
        const isOpening = entry.type === 'heading_open';

        return isHeading && isOpening;
      });
    }
  },

}

</script>

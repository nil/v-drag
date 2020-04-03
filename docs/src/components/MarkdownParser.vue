<template>
  <main>
    <TableOfContents :map="mappedDocsText" />
    <div class="wrapper" v-html="parsedDocsText"></div>
  </main>
</template>

<script>

import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

import TableOfContents from './TableOfContents';
import docsText from '!raw-loader!../../README.md';

const md = new markdownIt().use(markdownItAnchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkSymbol: '#',
  permalinkAttrs: () => ({ 'aria-hidden': true }),
  callback: (token, slug) => {
    token.text = slug.title
    token.id = (Math.random()*0xFFFF<<0).toString(16);
  }
});

export default {
  name: 'MarkdownParser',

  components: {
    TableOfContents
  },

  computed: {
    parsedDocsText() {
      return md.render(docsText);
    },
    mappedDocsText() {
      return md.parse(docsText, {});
    }
  }
}

</script>

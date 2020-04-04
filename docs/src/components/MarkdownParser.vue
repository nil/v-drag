<template>
  <main>
    <TableOfContents v-if="toc" :map="mappedText" />
    <div class="wrapper" v-html="parsedText"></div>
  </main>
</template>

<script>

import hljs from 'highlightjs';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

import TableOfContents from './TableOfContents';

const md = new markdownIt({
  highlight: function (str, lang) {
    if (lang === 'vue') {
      lang = 'html';
    }

    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value;
    }

    return '';
  }
});

md.use(markdownItAnchor, {
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

  props: {
    text: String,
    toc: Boolean
  },

  computed: {
    parsedText() {
      return md.render(this.text);
    },
    mappedText() {
      return md.parse(this.text, {});
    }
  }
}

</script>

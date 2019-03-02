<template>
  <span>{{ path }}</span>
</template>

<script>

export default {
  props: {
    path: String
  },

  mounted() {
    let request = new XMLHttpRequest()
    request.open('GET', this.path, true);

    console.log(request.status);


    let domParser = new DOMParser()
    let result = domParser.parseFromString(request.responseText, 'text/xml')
    let inlinedSVG = result.getElementsByTagName('svg')[0]
    // request.onload = function () {
    //   console.log(request.status);
    // }
  },

  computed: {
    url() {
      return
    }
    // exact () {
    //   if (this.$site.locales) {
    //     return Object.keys(this.$site.locales).some(rootLink => rootLink === this.link)
    //   }
    //   return this.link === '/'
    // }
  }
}

</script>

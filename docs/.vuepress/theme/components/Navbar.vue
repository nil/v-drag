<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

      <router-link class="navbar--logo" :to="$localePath">{{ $siteTitle }}</router-link>

      <NavLinks />

      <SearchBox />

      <div class="navbar--links">
        <Link :item="releasesLink" class="navbar--link" />
        <LocalePicker class="can-hide" />
        <Link :item="repoLink" class="navbar--link"><IconGithub /></Link>
      </div>
    </div>
  </header>
</template>

<script>

import SearchBox from '@theme/components/SearchBox.vue';
import SidebarButton from '@theme/components/SidebarButton.vue';
import NavLinks from '@theme/components/NavLinks.vue';
import Link from '@theme/components/Link.vue';
import LocalePicker from '@theme/components/LocalePicker.vue';

import info from '../../../../package.json';
import IconGithub from './icons/IconGithub.vue';

export default {
  components: {
    SidebarButton,
    NavLinks,
    Link,
    SearchBox,
    LocalePicker,
    IconGithub
  },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    releasesLink() {
      return {
        text: `v${info.version}`,
        link: `${info.homepage}/releases`
      }
    },

    repoLink() {
      return {
        link: info.homepage
      }
    }
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

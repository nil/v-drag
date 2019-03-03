<template>
  <header class="navbar">
    <div class="navbar--wrapper">
      <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')"/>

      <router-link class="navbar--logo" :to="$localePath">{{ $siteTitle }}</router-link>

      <NavbarMenu :locales="false" />

      <SearchBox />

      <NavbarLinks />
    </div>
  </header>
</template>

<script>

import NavbarLinks from '@theme/components/NavbarLinks.vue';
import NavbarMenu from '@theme/components/NavbarMenu.vue';
import SearchBox from '@theme/components/SearchBox.vue';
import SidebarButton from '@theme/components/SidebarButton.vue';

export default {
  components: {
    NavbarLinks,
    NavbarMenu,
    SearchBox,
    SidebarButton
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
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>
